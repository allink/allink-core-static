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
        var $parent = $gallery.parent();
        var height = $gallery.parent().outerHeight();
        var difference = $gallery.outerHeight() - $parent.outerHeight();
        var scrollTop = getScrollTop($window.scrollTop(), $parent.offset().top);
        var scrollProgress = scrollTop / ($window.height() + height);

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
    // no selector, no honey
    if (options.selector) {
        $(options.selector).parallax(options);
    }else {
        console.warn('parallax() requires CSS selector.')
    }
}

$(function(){

    // custom events
    $(window).on('initParallax', function(options) {
        initParallax(options);
    });

});
