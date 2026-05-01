(function () {
    'use strict';

    if (window.my_mod_active) return;
    window.my_mod_active = true;

    function startMod() {
        var target = $('.menu__item[data-action="tv"]');
        
        if (target.length > 0 && !target.data('modded')) {
            target.find('.menu__text').text('МОЙ САЙТ');
            target.css('color', '#ffeb3b');

            target.on('hover:enter click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                var url = 'https://chaturbate.lat/'; 

                // 1. Создаем внутренний компонент Лампы
                Lampa.Component.add('my_site_component', function (object, exam) {
                    var network = new Lampa.Reguest(); // Используем встроенный сетевой модуль
                    var scroll = new Lampa.Scroll({mask:true,over:true});
                    var html = $('<div class="directory"></div>');
                    
                    this.create = function () {
                        // Создаем iframe вручную внутри контейнера Лампы
                        var iframe = $('<iframe src="' + object.url + '" style="width: 100%; height: 100%; border: none; background: #000;"></iframe>');
                        html.append(iframe);
                        return html;
                    };

                    this.render = function () {
                        return this.create();
                    };

                    this.pause = function () {};
                    this.active = function () {};
                    this.destroy = function () {};
                });

                // 2. Вызываем этот компонент. Теперь Лампа считает это СВОЕЙ страницей.
                Lampa.Activity.push({
                    url: url,
                    title: 'Рецепт',
                    component: 'my_site_component',
                    page: 1
                });
                
                return false;
            });

            target.data('modded', true);
        }
    }

    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu__item[data-action="tv"]').length) {
            startMod();
        }
    }, 1000);
})();
