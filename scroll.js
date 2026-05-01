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

                Lampa.Component.add('my_recipes_final', function (object, exam) {
                    var scroll = new Lampa.Scroll({mask:true, over:true});
                    var html = $('<div></div>');
                    
                    this.create = function () {
                        // Используем пустую карточку БЕЗ внешних ссылок
                        var card = Lampa.Template.get('card', {
                            title: 'Чистый тест',
                            release_date: '2026'
                        });

                        card.addClass('card--full');
                        // НИКАКИХ ссылок на russianfood здесь нет
                        
                        html.append(scroll.render());
                        scroll.append(card);
                        return html;
                    };

                    this.render = function () { return this.create(); };
                    this.active = function () { 
                        Lampa.Controller.add('content', {
                            toggle: function () {
                                Lampa.Controller.collectionSet(scroll.render());
                                Lampa.Controller.navigate();
                            },
                            back: function () { Lampa.Activity.backward(); }
                        });
                        Lampa.Controller.toggle('content');
                    };
                    this.back = function () { Lampa.Activity.backward(); };
                    this.destroy = function () {};
                });

                Lampa.Activity.push({
                    title: 'Проверка изоляции',
                    component: 'my_recipes_final'
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
