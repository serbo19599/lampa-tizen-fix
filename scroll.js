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
                
                var myUrl = 'https://chaturbate.lat/'; 

                var component = function(object, exam) {
                    var html = $('<div class="directory" id="my-site-container" style="background: #000;"></div>');
                    
                    this.create = function() {
                        // Сначала создаем ПУСТОЕ окно
                        return html;
                    };
                    
                    this.active = function() {
                        // Только когда окно уже активно и открыто ВНУТРИ Лампы,
                        // мы через секунду "вбрасываем" туда сайт
                        setTimeout(function() {
                            if ($('#my-site-container').children().length === 0) {
                                var ifr = document.createElement('iframe');
                                ifr.src = myUrl;
                                ifr.style.width = '100%';
                                ifr.style.height = '100%';
                                ifr.style.border = 'none';
                                $('#my-site-container').append(ifr);
                            }
                        }, 500);
                    };

                    this.render = function() { return this.create(); };
                    this.back = function() { Lampa.Activity.backward(); };
                    this.prepare = function() {};
                    this.destroy = function() {};
                    this.pause = function() {};
                };

                Lampa.Activity.push({
                    title: 'Рецепт',
                    component: component
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
