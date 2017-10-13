/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Simple Smooth Scroll

Inspired by: https://codepen.io/pawelgrzybek/pen/ZeomJB

Basic usage:

<a href="#id-of-target-element" data-smooth-scroll>Smooth Scroll Link</a>

Custom duration (only numbers accepted, otherwise the script fails):

<a href="#id-of-target-element" data-smooth-scroll data-scroll-duration="300">Smooth Scroll Link</a>

Custom easing function (only predefined easing function will work, otherwise the script will fail):

<a href="#id-of-target-element" data-smooth-scroll data-scroll-easing="linear">Smooth Scroll Link</a>

*/

// Browser support:

// Chrome >= 24
// Firefox >= 23
// IE >= 10
// Opera >= 15
// Safari >= 8 (on previous versions it breaks on 'now' in window.performance)
// Android 4.4
// Firefox >= 23
// IE Mobile >= 10
// Opera Mobile >= 15
// Safari iOS >= 9
// Chrome for Android >= 35

/**
 *
 * @param {(number|HTMLElement)} destination - Destination to scroll to (DOM element or number)
 * @param {number} duration - Duration of scrolling animation
 * @param {string} easing - Timing function name (Allowed values: 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint')
 * @param {function} callback - Optional callback invoked after animation
 */
function scrollIt(destination, duration = 200, easing = 'linear', callback) {

    // Predefine list of available timing functions
    // If you need more, tween js is full of great examples
    // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
    const easings = {
        linear(t) {
            return t;
        },
        easeInQuad(t) {
            return t * t;
        },
        easeOutQuad(t) {
            return t * (2 - t);
        },
        easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
            return t * t * t;
        },
        easeOutCubic(t) {
            return (--t) * t * t + 1;
        },
        easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
            return t * t * t * t;
        },
        easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        },
        easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        },
        easeInQuint(t) {
            return t * t * t * t * t;
        },
        easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
        },
        easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        }
    };

    // Store initial position of a window and time
    // If performance is not available in your browser
    // It will fallback to new Date().getTime() - thanks IE < 10
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    // const startTime = typeof(window.performance['now']) == 'function' ? performance.now() : new Date().getTime();


    // Take height of window and document to sesolve max scrollable value
    // Prevent requestAnimationFrame() from scrolling below maximum scollable value
    // Resolve destination type (node or number)
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);


    // If requestAnimationFrame is not supported
    // Move window to destination position and trigger callback function
    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }


    // function resolves position of a window and moves to exact amount of pixels
    // Resolved by calculating delta and timing function choosen by user
    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easings[easing](time);
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        // Stop requesting animation when window reached its destination
        // And run a callback function
        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }

        // If window still needs to scroll to reach destination
        // Request another scroll invokation
        requestAnimationFrame(scroll);
    }


    // Invoke scroll and sequential requestAnimationFrame
    scroll();
}

function initSmoothScroll() {
    // init
    var $scroll_links = $('[data-smooth-scroll]');
    if ($scroll_links.length > 0) {
        $scroll_links.each(function(){
            var $trigger = $(this);
            var initialized_attr = 'data-trigger-initialized';
            // check for initialized trigger
            var trigger_initialized = $trigger.attr(initialized_attr);
            // NOT initialized yet
            if (typeof trigger_initialized === 'undefined') {
                $trigger.on('click',function(e){
                    // init target
                    e.preventDefault();
                    var $trigger = $(this);
                    var anchor = $trigger.attr('href');
                    var $target = $(anchor);
                    // target not found? adios!
                    if ($target.length === 0) {
                        console.warn('Smooth scroll target with selector "' + anchor + '"" could not be found in the DOM')
                        return false;
                    }
                    // optional: individual scroll duration
                    var scroll_duration = 300;
                    var scroll_duration_from_attribute = $trigger.attr('data-scroll-duration');
                    if (scroll_duration_from_attribute) {
                        scroll_duration = parseInt(scroll_duration_from_attribute);
                    }
                    // optional: individual easing function
                    var scroll_easing = 'easeInOutQuad';
                    var scroll_easing_from_attribute = $trigger.attr('data-scroll-easing');
                    if (scroll_easing_from_attribute) {
                        scroll_easing = scroll_easing_from_attribute;
                    }
                    // trigger custom event
                    $(window).trigger('smooth-scroll:before');
                    // scroll!
                    scrollIt(
                        $target.get(0),
                        scroll_duration,
                        scroll_easing,
                        function(){
                            $(window).trigger('smooth-scroll:after');
                        }
                    );
                });
                // mark as initialized
                $trigger.attr(initialized_attr,'');
            }
        });
    }
}

$(function(){
    // on page load
    initSmoothScroll();
    // after certain events
    $(window).on('initSmoothScroll',function(){
        initSmoothScroll();
    });
});
