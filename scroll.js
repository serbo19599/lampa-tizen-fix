(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {
            window.addEventListener('keydown', function (event) {
                var frame = document.querySelector('iframe') || document.querySelector('.web-view__iframe');
                if (frame) {
                    var scrollStep = 200;
                    var target = frame.contentWindow;

                    switch (event.keyCode) {
                        case 38: // Up
                        case 29460:
                            target.scrollBy(0, -scrollStep);
                            break;
                        case 40: // Down
                        case 29461:
                            target.scrollBy(0, scrollStep);
                            break;
                        case 37: // Left
                        case 4:
                            target.scrollBy(-scrollStep, 0);
                            break;
                        case 39: // Right
                        case 5:
                            target.scrollBy(scrollStep, 0);
                            break;
                    }
                }
            }, true);
        }
    });
})();

