const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Убирает дублирующиеся слэши в URL
const normalizeUrl = (url) => url.replace(/([^:]\/)\/+/g, '$1');

const saveResource = async (url, saveDir) => {
  const fileName = path.basename(url.split('?')[0]); // Убираем параметры из имени файла
  const filePath = path.join(saveDir, fileName);

  if (!fs.existsSync(filePath)) {
    try {
      console.log(`Скачивание ресурса: ${url}`);
      const response = await axios.get(normalizeUrl(url), { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      console.log(`Ресурс сохранен: ${filePath}`);
    } catch (error) {
      console.error(`Ошибка при скачивании ресурса ${url}: ${error.message}`);
    }
  } else {
    console.log(`Ресурс уже существует: ${filePath}`);
  }

  return `./${fileName}`; // Возвращаем относительный путь для HTML
};

const saveHtmlWithResources = async (page, saveDir, baseUrl) => {
  const htmlPath = path.join(saveDir, 'index.html');
  let content = await page.content();

  // Обновляем src/href для локального использования
  content = content.replace(/(src|href)="(.*?)"/g, (match, attr, url) => {
    if (url.startsWith('http') || url.startsWith('/')) {
      const resourceUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;
      const localPath = saveResource(resourceUrl, saveDir);
      return `${attr}="${localPath}"`;
    }
    return match;
  });

  fs.writeFileSync(htmlPath, content);
  console.log(`HTML сохранен: ${htmlPath}`);
};

const copyCanvasGame = async (baseUrl, saveDir) => {
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', async (request) => {
    const url = request.url();
    const resourceType = request.resourceType();

    if (['stylesheet', 'script', 'image', 'font', 'xhr'].includes(resourceType)) {
      try {
        const resourceSaveDir = path.join(saveDir, resourceType);
        if (!fs.existsSync(resourceSaveDir)) fs.mkdirSync(resourceSaveDir, { recursive: true });

        await saveResource(url, resourceSaveDir);
        request.continue();
      } catch (error) {
        console.error(`Ошибка при обработке запроса ${url}: ${error.message}`);
        request.abort();
      }
    } else {
      request.continue();
    }
  });

  try {
    console.log(`Загрузка страницы: ${baseUrl}`);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });

    // Сохраняем HTML и связанные ресурсы
    await saveHtmlWithResources(page, saveDir, baseUrl);

    // Сохранение Canvas
    const canvasData = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return null;
      return canvas.toDataURL('image/png');
    });

    if (canvasData) {
      const canvasPath = path.join(saveDir, 'canvas.png');
      const base64Data = canvasData.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(canvasPath, base64Data, 'base64');
      console.log(`Canvas сохранен: ${canvasPath}`);
    }
  } catch (error) {
    console.error(`Ошибка при копировании игры: ${error.message}`);
  } finally {
    await browser.close();
  }
};

(async () => {
  const baseUrl = 'https://static.kanobu.ru/bash_arena'; // Замените на URL игры
  const saveDir = path.join(__dirname, 'bash_arena');

  try {
    await copyCanvasGame(baseUrl, saveDir);
  } catch (error) {
    console.error(`Общая ошибка: ${error.message}`);
  }
})();
