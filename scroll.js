(function () {
    'use strict';

    if (window.my_mod_active) return;
    window.my_mod_active = true;

    // 1. Создаем пустой компонент, который Лампа примет как "свой"
    Lampa.Component.add('my_site_component', function (object, exam) {
        var html = $('<div class="video-quality"></div>'); // Используем стандартный класс Лампы
        
        this.create = function () {
            // Простое перенаправление внутри контейнера приложения
            window.location.href = 'https://serbo19599.github.io/lampa-tizen-fix/';
            return html;
        };

        this.render = function () { return html; };
        this.active = function () { };
        this.back = function () { Lampa.Activity.backward(); };
    });

    function startMod() {
        var target = $('.menu__item[data-action="tv"]');
        
        if (target.length > 0 && !target.data('modded')) {
            target.find('.menu__text').text('РЕЦЕПТЫ');
            target.css('color', '#ffeb3b');

            target.on('hover:enter click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Вызываем компонент штатным способом
                Lampa.Activity.push({
                    title: 'Рецепты',
                    component: 'my_site_component',
                    page: 1
                });
                
                return false;
            });

            target.data('modded', true);
        }
    }

    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(timer);
            startMod();
        }
    }, 1000);
})();
