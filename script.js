let text = "Игровой сайт /// Выполнил — Полин Богдан /// ";
let position = 0;

function scrollStatusText() {
    document.title = text.substring(position) + text.substring(0, position);
    position = (position + 1) % text.length;
    setTimeout(scrollStatusText, 200);
}

scrollStatusText();

function loadLanguage(lang) {
    fetch(`/lang/${lang}.json`)
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

function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    loadLanguage(lang);
    document.documentElement.lang = lang;

    // Изменяем логотип или другие элементы
    switch (lang) {
        case 'ru':
            document.querySelector(".header-logo").src = "/images/logo-ru.png";
            break;
        case 'en':
            document.querySelector(".header-logo").src = "/images/logo-en.png";
            break;
    }

    // Обновляем активный круг
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('active');
        if (circle.getAttribute('data-lang') === lang) {
            circle.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
    setLanguage(savedLanguage); // Устанавливаем язык

    const circles = document.querySelectorAll('.circle');

    // Добавляем обработчики переключения языка
    circles.forEach(circle => {
        circle.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
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