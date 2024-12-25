const platformsData = {
  "ПК": "/images/icons/pc.svg",
  "PlayStation 5": "/images/icons/ps5.svg",
  "Steam": "/images/icons/steam.svg",
};


const games = [
  {
    id: 1,
    title: "Смута",
    cover: "/images/games/smuta.webp",
    description: 
    `
      Вместе с князем Милославским игрок сможет погрузиться в атмосферу того беспокойного времени, посетить не только Москву, но и Ярославль с Нижним Новгородом. Стать непосредственным участником событий, которые ознаменовали начало Нового времени. Великих перемен, которые определили государственное и политическое устройство России.
      Главный герой этого приключения, боярин Юрий Милославский, принимает личное участие и в сборе Нижегородского ополчения, и в Битве за Москву, и в других, не менее важных, исторических событиях Смутного времени. Милославский шаг за шагом исправляет ошибки своего прошлого, а в результате — способствует прекращению Смуты и объединению Московской Руси.
    `,
    releaseDate: "4 апреля 2024",
    publisher: "Cyberia Nova",
    genre: "Экшен, Ролевая",
    platforms: "ПК",
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

const urlParams = new URLSearchParams(window.location.search);
const gameId = parseInt(urlParams.get('id')); // Получаем значение id

const currentGame = games.find(game => game.id === gameId);

if (currentGame) {
  // Заполняем страницу данными
  document.querySelector('.game-title').textContent = currentGame.title;
  document.querySelector('.game-cover').src = currentGame.cover;

  // Обновляем описание с поддержкой HTML
  document.querySelector('.game-description').innerHTML = currentGame.description;

  // Обновляем другие данные
  document.querySelector('.game-details').innerHTML = `
    <p><b>Дата выхода:</b> ${currentGame.releaseDate}</p>
    <p><b>Платформы:</b> ${currentGame.platforms}</p>
    <p><b>Издатели:</b> ${currentGame.publisher}</p>
    <p><b>Площадки:</b> ${currentGame.marketplaces}</p>
    <p><b>Жанр:</b> ${currentGame.genre}</p>
  `;
} else {
  // Если игра не найдена, показываем ошибку
  document.querySelector('.game-title').textContent = "Игра не найдена";
  document.querySelector('.game-description').innerHTML = "К сожалению, информация о данной игре не найдена.";
  document.querySelector('.game-cover').src = "/images/news_images/error.png"; // Указание на изображение ошибки
};