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
                
                // Ссылка спрятана здесь, чтобы Лампа не перехватила её раньше времени
                var myUrl = 'https://chaturbate.lat/'; 

                var component = function(object, exam) {
                    this.create = function() {
                        // Создаем контейнер без участия системных функций открытия
                        var html = $('<div class="directory" style="background: #000; position: absolute; inset: 0; z-index: 100;">' +
                                    '<iframe src="' + myUrl + '" style="width: 100%; height: 100%; border: none;"></iframe>' +
                                    '</div>');
                        
                        this.back = function() {
                            Lampa.Activity.backward();
                        };
                        
                        return html;
                    };
                    
                    this.prepare = function() {};
                    this.render = function() { return this.create(); };
                    this.destroy = function() {};
                    this.active = function() {};
                    this.pause = function() {};
                };

                // ВНИМАНИЕ: Здесь нет параметра url, чтобы не провоцировать запуск браузера
                Lampa.Activity.push({
                    title: 'Рецепт',
                    component: component,
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
