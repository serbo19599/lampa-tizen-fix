(function () {
    'use strict';

    if (window.my_mod_active) return;
    window.my_mod_active = true;

    function startMod() {
        var target = $('.menu__item[data-action="tv"]');
        
        if (target.length > 0 && !target.data('modded')) {
            target.find('.menu__text').text('МОИ РЕЦЕПТЫ');
            target.css('color', '#ffeb3b');

            target.on('hover:enter click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Ссылка на ваш сайт
                var url = 'https://serbo19599.github.io/lampa-tizen-fix/'; 
                
                // ВМЕСТО перехода в браузер, открываем как Activity внутри Лампы
                Lampa.Activity.push({
                    url: url,
                    title: 'Рецепты',
                    component: 'web_view', // Это заставляет Лампу открыть сайт внутри себя
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
