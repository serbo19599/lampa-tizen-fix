(function () {
    'use strict';
    if (window.my_plugin_loaded) return;
    window.my_plugin_loaded = true;

    function addMenu() {
        var item = $('<li class="menu__item selector"><div class="menu__text">РЕЦЕПТЫ</div></li>');
        item.on('hover:enter', function () {
            Lampa.Noty.show('Плагин работает!');
        });
        $('.menu .menu__list').append(item);
    }

    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(timer);
            addMenu();
        }
    }, 1000);
})();
