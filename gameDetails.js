const games = [
  {
    id: 1,
    title: { ru: "Смута", en: "Distemper"},
    cover: "/images/games/smuta.webp",
    description: {
      ru:
      `
        Вместе с князем Милославским игрок сможет погрузиться в атмосферу того беспокойного времени, посетить не только Москву, но и Ярославль с Нижним Новгородом. Стать непосредственным участником событий, которые ознаменовали начало Нового времени. Великих перемен, которые определили государственное и политическое устройство России.
        Главный герой этого приключения, боярин Юрий Милославский, принимает личное участие и в сборе Нижегородского ополчения, и в Битве за Москву, и в других, не менее важных, исторических событиях Смутного времени. Милославский шаг за шагом исправляет ошибки своего прошлого, а в результате — способствует прекращению Смуты и объединению Московской Руси.
      `,
      en:
      `
        Together with Prince Miloslavsky, the player will be able to immerse himself in the atmosphere of that turbulent time, visit not only Moscow, but also Yaroslavl and Nizhny Novgorod. Become a direct participant in the events that marked the beginning of the New Time. Great changes that determined the state and political structure of Russia. The main character of this adventure, boyar Yuri Miloslavsky, takes personal part in the gathering of the Nizhny Novgorod militia, and in the Battle of Moscow, and in other, no less important, historical events of the Time of Troubles. Miloslavsky step by step corrects the mistakes of his past, and as a result, contributes to the end of the Time of Troubles and the unification of Muscovite Rus.
      `,
    },
    releaseDate: {
      ru: `4 апреля 2024`,
      en: `4 april 2024`,
    },
    publisher: "Cyberia Nova",
    genre: {
      ru: `Экшен, Ролевая`,
      en: `Action, Role`,
    },
    platforms: {
      ru: `ПК`,
      en: `PC`,
    },
    marketplaces: `<a target="__blank" href="https://vkplay.ru/play/game/smuta/">VK Play</a>`,
  },
  {
    id: 2,
    title: "Atomic Heart",
    cover: "/images/games/atomic-heart.jpg",
    description:
    `
      Добро пожаловать в дивный мир совершенства и технологий, где люди живут бок о бок с верными помощниками-роботами!
      <br><br>Так бы они и жили дальше, пойди всё по плану. Но до запуска новейшей системы управления роботами остаётся всего несколько дней, и что-то идёт не так... Что это — трагическая случайность или зловещий заговор?
    `,
    releaseDate: "21 февраля 2023",
    publisher:
    `
      <a target="__blank" href="https://stopgame.ru/company/58279">Focus Entertainment</a>
      <a href="https://stopgame.ru/company/59421" target="__blank">Astrum Entertainment</a>
      <a href="https://stopgame.ru/company/65381" target="__blank">4Divinity</a>
    `,
    genre: "Экшен",
    platforms: "ПК, PS4, PS5, XONE, XBOXSX",
    marketplaces: `<a target="__blank" href="https://store.steampowered.com/app/668580">Steam</a>`,
  },
  {
    id: 3,
    title: "Русы против Ящеров",
    cover: "/images/games/rus_vs.jpg",
    description:
    `
      Великие подвиги Древних Русов в войне с ящерами. Погрузитесь в мир Гипербореи и одолейте полчища Ящеров и других иродов, покусившихся на святые места Предков. Выберите достойного героя и отправляйтесь спасать мир от зелёной чумы.
    `,
    releaseDate: "27 сентября 2023",
    publisher:
    `
      <a target="__blank" href="https://stopgame.ru/company/61498">Agafonoff</a>
      <a href="https://stopgame.ru/company/62458" target="__blank">Smola Game Studio</a>
    `,
    genre: "Экшен",
    platforms: "ПК",
    marketplaces: `<a target="__blank" href="https://store.steampowered.com/app/2532550">Steam</a>`,
  },
  {
    id: 4,
    title: "Vladik Brutal",
    cover: "/images/games/vladik-brutal.jpg",
    description:
    `
      Сражайтесь под натиском мутированных людей, одержимых солдат и еще более мрачных боссов. Пытайтесь выжить и выяснить, что делать дальше в этой жизни, попутно разрывая на куски своих врагов.
    `,
    releaseDate: "9 августа 2024",
    publisher:
    `
      <a target="__blank" href="https://stopgame.ru/company/40949">Narko Games</a>
    `,
    genre: "Экшен",
    platforms: "ПК",
    marketplaces: `<a target="__blank" href="https://store.steampowered.com/app/1316680">Steam</a>`,
  },
  {
    id: 5,
    title: "MiSide",
    cover: "/images/games/miside.jpg",
    description:
    `
      Представим, что у вас есть игра, в которой вы ухаживаете за персонажем. Но могли бы вы себе представить, что однажды сами попадете в эту игру?
    `,
    releaseDate: "11 декабря 2024",
    publisher:
    `
      <a target="__blank" href="https://stopgame.ru/company/62480">Aihasto</a>
    `,
    genre: "Приключения, Ролевая, Симулятор",
    platforms: "ПК",
    marketplaces: `<a target="__blank" href="https://store.steampowered.com/app/2527500">Steam</a>`,
  },
];

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id')); // Получаем значение id

    // Дефолтный язык
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'ru';

  // Загружаем языковой файл
  function loadLanguage(lang) {
      fetch(`/lang/${lang}.json`)
          .then(response => response.json())
          .then(translations => {
              updatePageContent(translations, lang);
              localStorage.setItem('selectedLanguage', lang);
          })
          .catch(error => console.error("Ошибка загрузки языка:", error));
  }

  // Обновляем контент страницы
  function updatePageContent(translations, lang) {
      const currentGame = games.find(game => game.id === gameId);

      if (currentGame) {
          // Обновляем заголовок
          document.querySelector('.game-title').textContent = currentGame.title[lang];

          // Обновляем обложку
          document.querySelector('.game-cover').src = currentGame.cover;

          // Обновляем описание
          document.querySelector('.game-description').innerHTML = currentGame.description[lang];

          // Обновляем детали игры
          document.querySelector('.game-details').innerHTML = `
              <p><b>${translations.releaseDate}:</b> ${currentGame.releaseDate[lang]}</p>
              <p><b>${translations.platforms}:</b> ${currentGame.platforms[lang]}</p>
              <p><b>${translations.publisher}:</b> ${currentGame.publisher}</p>
              <p><b>${translations.marketplaces}:</b> ${currentGame.marketplaces}</p>
              <p><b>${translations.genre}:</b> ${currentGame.genre[lang]}</p>
          `;
      } else {
          // Если игра не найдена
          document.querySelector('.game-title').textContent = translations.gameNotFound;
          document.querySelector('.game-description').innerHTML = translations.descriptionNotFound;
          document.querySelector('.game-cover').src = "/images/news_images/error.png";
      }
  }

  // Обработчик смены языка
  document.querySelectorAll('.circle').forEach(circle => {
      circle.addEventListener('click', function () {
          const selectedLang = this.getAttribute('data-lang');
          loadLanguage(selectedLang);
      });
  });

  // Загружаем начальный язык
  loadLanguage(currentLanguage);
});