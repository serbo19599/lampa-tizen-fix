(function () {
    'use strict';

    // 1. Создаем компонент (экран) нашего будущего плагина
    Lampa.Component.add('my_recipe_list', function (object, exam) {
        var _this = this;
        var scroll = new Lampa.Scroll({mask:true, over:true});
        var files = new Lampa.Files(object);
        var html = $('<div></div>');
        
        this.create = function () {
            // Здесь мы создаем список. Пока это одна тестовая карточка.
            // Именно так работают профессиональные плагины.
            var card = Lampa.Template.get('card', {
                title: 'Рецепт: Курица по-домашнему',
                release_date: 'RussianFood'
            });

            card.addClass('card--full');
            
            // Навешиваем действие на кнопку ОК
            card.on('hover:enter', function () {
                Lampa.Noty.show('Загружаем видео...');
                // Здесь будет запуск плеера
                _this.playVideo();
            });

            html.append(scroll.render());
            scroll.append(card);
            
            return html;
        };

        this.playVideo = function() {
            // Родной плеер Лампы. Он никогда не вылетает в браузер!
            Lampa.Player.play({
                url: 'https://vjs.zencdn.net/v/oceans.mp4', // Тестовое видео
                title: 'Видео рецепт'
            });
            Lampa.Player.playlist([
                {
                    url: 'https://vjs.zencdn.net/v/oceans.mp4',
                    title: 'Видео рецепт'
                }
            ]);
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

    // 2. Добавляем кнопку в меню
    function addMenuItem() {
        var menu_item = $('<li class="menu__item selector" data-action="my_recipes">' +
            '<div class="menu__ico"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
            '<div class="menu__text">РЕЦЕПТЫ</div>' +
        '</li>');

        menu_item.on('hover:enter', function () {
            Lampa.Activity.push({
                title: 'Мои Рецепты',
                component: 'my_recipe_list',
                page: 1
            });
        });

        $('.menu .menu__list').append(menu_item);
    }

    // Запуск
    var timer = setInterval(function() {
        if (typeof $ !== 'undefined' && $('.menu .menu__list').length) {
            clearInterval(timer);
            addMenuItem();
        }
    }, 1000);

})();
