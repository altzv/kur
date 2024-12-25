let text = "Игровой сайт /// Выполнил — Полин Богдан /// ";
let position = 0;

function scrollStatusText() {
    document.title = text.substring(position) + text.substring(0, position);
    position = (position + 1) % text.length;
    setTimeout(scrollStatusText, 200);
}

scrollStatusText();

function loadLanguage(lang) {
    fetch(`./lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // Обновляем текстовые элементы на странице
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
        })
        .catch(error => console.error('Error loading language file:', error));
}

loadLanguage('ru');


// Обработчик переключения языка
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    circle.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        loadLanguage(lang);
    });
});

circles.forEach(circle => {
    circle.addEventListener('click', function() {
        // Удаляем класс 'active' у всех кругов
        circles.forEach(c => c.classList.remove('active'));
        // Добавляем класс 'active' к выбранному кругу
        this.classList.add('active');

        // Получаем выбранный язык
        const selectedLang = this.getAttribute('data-lang');

        // Логика переключения языков (можно добавить больше условий)
        switch (selectedLang) {
            case 'ru':
                document.documentElement.lang = 'ru';
                break;
            case 'en':
                document.documentElement.lang = 'en';
                break;
        }
    });
});

// Переменная для хранения текущего языка (по умолчанию русский)
let currentLanguage = 'ru';

// Функция для обновления языка
function setLanguage(lang) {
currentLanguage = lang;
}

document.addEventListener('DOMContentLoaded', function() {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang); // Устанавливаем выбранный язык
        });
    });
});

new Swiper('.image-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false
  }
});