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
                
                // Вместо window.location.href используем внутренний вызов Лампы
                Lampa.Component.add('my_site', function (object, exam) {
                    var html = $('<div class="full-screen"><iframe src="https://serbo19599.github.io/lampa-tizen-fix/" style="width:100%;height:100%;border:none;"></iframe></div>');
                    this.create = function () { return html; };
                    this.render = function () { return html; };
                    this.active = function () {
                        Lampa.Controller.add('content', {
                            toggle: function () { Lampa.Controller.collectionSet(html); Lampa.Controller.navigate(); },
                            back: function () { Lampa.Activity.backward(); }
                        });
                        Lampa.Controller.toggle('content');
                    };
                    this.back = function () { Lampa.Activity.backward(); };
                });

                Lampa.Activity.push({
                    title: 'Рецепты',
                    component: 'my_site'
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
