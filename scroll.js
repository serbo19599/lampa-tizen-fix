(function () {
    'use strict';
    if (window.my_recipe_plugin_loaded) return;
    window.my_recipe_plugin_loaded = true;

    // Создаем экран плагина
    Lampa.Component.add('my_recipe_list', function (object, exam) {
        var scroll = new Lampa.Scroll({mask:true, over:true});
        var html = $('<div></div>');
        this.create = function () {
            var card = Lampa.Template.get('card', {title: 'Рецепт готов!', release_date: 'Тест'});
            card.addClass('card--full');
            card.on('hover:enter', function () { Lampa.Noty.show('Работает!'); });
            html.append(scroll.render());
            scroll.append(card);
            return html;
        };
        this.render = function () { return this.create(); };
        this.active = function () { 
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.navigate(); },
                back: function () { Lampa.Activity.backward(); }
            });
            Lampa.Controller.toggle('content');
        };
        this.back = function () { Lampa.Activity.backward(); };
    });

    // Добавляем кнопку в меню
    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(timer);
            var item = $('<li class="menu__item selector"><div class="menu__text">РЕЦЕПТЫ</div></li>');
            item.on('hover:enter', function () {
                Lampa.Activity.push({title: 'Рецепты', component: 'my_recipe_list'});
            });
            $('.menu .menu__list').append(item);
        }
    }, 1000);
})();

