(function () {
    'use strict';

    Lampa.Platform.tv(); // Принудительно инициализируем ТВ-интерфейс

    function startPlugin() {
        // Создаем пункт меню
        var item = $('<li class="menu__item selector" data-action="recipes">' +
            '<div class="menu__ico">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:1.5rem"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' +
            '</div>' +
            '<div class="menu__text">РЕЦЕПТЫ</div>' +
            '</li>');

        // Обработка клика
        item.on('hover:enter', function () {
            Lampa.Noty.show('Раздел Рецептов в разработке');
        });

        // Добавляем в список меню
        $('.menu .menu__list').append(item);
    }

    // Ждем загрузки интерфейса Лампы
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
