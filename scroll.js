(function () {
    'use strict';

    // Чтобы не было дубликатов при перезагрузке
    if (window.my_recipe_plugin_loaded) return;
    window.my_recipe_plugin_loaded = true;

    // 1. Создаем внутренний экран (компонент)
    Lampa.Component.add('my_recipe_component', function (object, exam) {
        var _this = this;
        var scroll = new Lampa.Scroll({mask:true, over:true});
        var html = $('<div></div>');
        
        this.create = function () {
            var card = Lampa.Template.get('card', {
                title: 'Проверка плагина',
                release_date: 'Работает внутри'
            });

            card.addClass('card--full');
            card.on('hover:enter', function () {
                Lampa.Noty.show('Поздравляю! Мы внутри Лампы!');
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
                back: function () { Lampa.Activity.backward(); }
            });
            Lampa.Controller.toggle('content');
        };
        this.back = function () { Lampa.Activity.backward(); };
        this.destroy = function () {};
    });

    // 2. Добавляем новую кнопку в меню
    function addRecipeMenu() {
        var menu_item = $('<li class="menu__item selector" data-action="recipes_section">' +
            '<div class="menu__ico"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
            '<div class="menu__text">РЕЦЕПТЫ</div>' +
        '</li>');

        menu_item.on('hover:enter', function () {
            Lampa.Activity.push({
                title: 'Каталог рецептов',
                component: 'my_recipe_component'
            });
        });

        // Вставляем кнопку в начало списка меню
        $('.menu .menu__list').prepend(menu_item);
    }

    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(timer);
            addRecipeMenu();
        }
    }, 1000);

})();
