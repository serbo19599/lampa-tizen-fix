(function () {
    'use strict';

    if (window.my_mod_active) return;
    window.my_mod_active = true;

    function startMod() {
        var target = $('.menu__item[data-action="tv"]');
        
        if (target.length > 0 && !target.data('modded')) {
            target.find('.menu__text').text('РЕЦЕПТЫ');
            target.css('color', '#ffeb3b');

            target.on('hover:enter click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // ВАША ССЫЛКА
                var url = 'https://serbo19599.github.io/lampa-tizen-fix/'; 
                
                // КОМАНДА ОТКРЫТИЯ ВНУТРИ ЛАМПЫ
                Lampa.Activity.push({
                    url: url,
                    title: 'Рецепты',
                    component: 'web_view',
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
