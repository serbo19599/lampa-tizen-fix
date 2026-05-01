(function () {
    'use strict';

    Lampa.Component.add('my_recipes', function (object, exam) {
        var scroll = new Lampa.Scroll({mask: true, over: true});
        var html = $('<div class="category-full"></div>');

        this.create = function () {
            var card = Lampa.Template.get('card', {
                title: 'Мои Рецепты',
                release_date: 'Раздел готов к наполнению'
            });
            card.addClass('card--full');
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
    });

    function addMenu() {
        var menu_item = $('<li class="menu__item selector"><div class="menu__text">РЕЦЕПТЫ</div></li>');
        menu_item.on('hover:enter', function () {
            Lampa.Activity.push({
                title: 'Рецепты',
                component: 'my_recipes'
            });
        });
        $('.menu .menu__list').append(menu_item);
    }

    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(timer);
            addMenu();
        }
    }, 1000);
})();
