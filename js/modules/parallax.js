/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Parallax

*/

$.fn.parallax = function(options) {
    var $window = $(window);
    var options = options || {};
    var $this = $(this);
    var timer;

    var getScrollTop = options.getScrollTop || function(scrollTop, parentTop) {
        return scrollTop - parentTop + $window.height();
    };

    var positionParallaxImage = function($gallery) {
        var parallax_image_height = $gallery.outerHeight();
        var $parent = $gallery.parent();
        var parent_height = $parent.outerHeight();
        var difference = parallax_image_height - parent_height;
        var scrollTop = getScrollTop($window.scrollTop(), $parent.offset().top);
        var scrollProgress = scrollTop / ($window.height() + parent_height);

        if(options.updateCallback) {
            options.updateCallback($gallery, difference, scrollProgress);
        }

        if(options.reversed) {
            $gallery.css('transform', 'translate3d(0, -' + difference * scrollProgress + 'px, 0)')
            .css('-webkit-transform', 'translate3d(0, -' + difference * scrollProgress + 'px, 0)');
        }
        else {
            $gallery.css('transform', 'translate3d(0, ' + (difference * scrollProgress - difference) + 'px, 0)')
            .css('-webkit-transform', 'translate3d(0, ' + (difference * scrollProgress - difference) + 'px, 0)');
        }
    };

    var loopCall = function() {
        $this.each(function(key, value) {
            positionParallaxImage($(value));
        });
    };

    $window.scroll(function() {
        loopCall();
    });

    $window.resize(function() {
        loopCall();
    });

    loopCall();
    setTimeout(function() {
        loopCall();
    }, 10);
};

export function initParallax(options) {
    // init
    var options = options || {};
    // available options and default values
    if (!options.selector) {
        options.selector = '.parallax-enabled .content-section__bg-image-outer > picture';
    }
    // no selector, no honey
    if (options.selector) {
        $(options.selector).parallax(options);
    }else {
        console.warn('parallax() requires CSS selector.')
    }
}
