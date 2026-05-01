(function () {
    'use strict';

    // 1. Создаем компонент страницы (чтобы не вылетало в браузер)
    Lampa.Component.add('my_recipes_page', function (object, exam) {
        var html = $('<div class="full-screen"><iframe src="https://serbo19599.github.io/lampa-tizen-fix/" style="width: 100%; height: 100%; border: none;"></iframe></div>');
        
        this.create = function () {
            return html;
        };

        this.render = function () {
            return html;
        };

        this.active = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(html);
                    Lampa.Controller.navigate();
                },
                back: function () {
                    Lampa.Activity.backward();
                }
            });
            Lampa.Controller.toggle('content');
        };

        this.back = function () {
            Lampa.Activity.backward();
        };
    });

    // 2. Добавляем кнопку в меню
    function addMenuItem() {
        var item = $('<li class="menu__item selector"><div class="menu__text">РЕЦЕПТЫ</div></li>');
        
        item.on('hover:enter', function () {
            // Вызываем созданный выше компонент, а не просто ссылку
            Lampa.Activity.push({
                url: '',
                title: 'Рецепты',
                component: 'my_recipes_page',
                page: 1
            });
        });

        $('.menu .menu__list').append(item);
    }

    // Ждем загрузки
    var wait = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(wait);
            addMenuItem();
        }
    }, 1000);
})();
