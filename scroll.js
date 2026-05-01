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

                // Создаем компонент КАТАЛОГА (как в кинотеатрах)
                Lampa.Component.add('my_recipes', function (object, exam) {
                    var _this = this;
                    var scroll = new Lampa.Scroll({mask:true, over:true});
                    var items = [];
                    var html = $('<div></div>');
                    
                    this.create = function () {
                        // Создаем тестовую плитку рецепта
                        var card = Lampa.Template.get('card', {
                            title: 'Тестовый рецепт',
                            release_date: '2026'
                        });

                        card.addClass('card--full');
                        card.find('.card__img').attr('src', 'https://www.russianfood.com/recipes/pic/prev/p119475.jpg');
                        
                        card.on('hover:enter', function () {
                            Lampa.Noty.show('Нажали ОК на рецепте!');
                        });

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
                            back: function () {
                                Lampa.Activity.backward();
                            }
                        });
                        Lampa.Controller.toggle('content');
                    };
                    this.back = function () { Lampa.Activity.backward(); };
                    this.pause = function () {};
                    this.stop = function () {};
                    this.destroy = function () {};
                });

                // Запускаем как внутреннюю активность
                Lampa.Activity.push({
                    title: 'Каталог рецептов',
                    component: 'my_recipes',
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
