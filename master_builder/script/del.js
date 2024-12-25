document.addEventListener('DOMContentLoaded', () => {
    const interval = setInterval(() => {
        // Проверяем наличие footer и контейнера
        const footerElement = document.querySelector('.game-footer');
        const gameContainer = document.getElementById('game-container');

        let taskCompleted = true; // Флаг завершения всех задач

        if (footerElement) {
            footerElement.remove();
            console.log('game-footer удалён');
        } else {
            taskCompleted = false; // Если footer ещё есть, задачи не завершены
        }

        if (gameContainer) {
            // Устанавливаем стиль
            gameContainer.style.bottom = '0';
            console.log('Попытка установить bottom: 0 для game-container');

            // Проверяем, применился ли стиль
            const computedStyle = getComputedStyle(gameContainer);
            if (computedStyle.bottom === '0px') {
                console.log('Стиль bottom: 0 успешно применён для game-container');
            } else {
                console.warn('Стиль bottom: 0 не применился, добавляем !important');
                gameContainer.style.setProperty('bottom', '0', 'important');
            }
        } else {
            taskCompleted = false; // Если контейнера ещё нет, задачи не завершены
        }

        // Если все задачи выполнены, останавливаем интервал
        if (taskCompleted) {
            clearInterval(interval);
            console.log('Все задачи выполнены. Интервал остановлен.');
        }
    }, 100); // Проверяем каждые 100 мс
});
