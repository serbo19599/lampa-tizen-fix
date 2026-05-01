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
                
                var url = 'https://www.russianfood.com/recipes/recipe.php?rid=119475'; 

                // Создаем функцию компонента прямо в вызове
                var component = function(object, exam) {
                    this.create = function() {
                        // Создаем контейнер и принудительно вставляем iframe
                        var html = $('<div class="directory" style="background: #000;"><iframe src="' + object.url + '" style="width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0;"></iframe></div>');
                        
                        // Добавляем обработку кнопки "Назад" (чтобы не выходить из Лампы)
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

                // Регистрируем и сразу вызываем
                Lampa.Activity.push({
                    url: url,
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
