/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Simple Smooth Scroll

Inspired by: https://codepen.io/pawelgrzybek/pen/ZeomJB

*/


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Requirements:

The script requires the following markup right after the `.site-header-buffer` in `base.html`:

<div class="smooth-scroll-header-compact-mode-size"></div>

It is used to calculate the offset and the correct extra spacing.

*/


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Basic usage: Link

<a href="#id-of-target-element" data-smooth-scroll>Smooth Scroll Link</a>

Custom duration (only numbers accepted, otherwise the script fails):

<a href="#id-of-target-element" data-smooth-scroll data-scroll-duration="300">Smooth Scroll Link</a>

Custom easing function (only predefined easing function will work, otherwise the script will fail):

<a href="#id-of-target-element" data-smooth-scroll data-scroll-easing="linear">Smooth Scroll Link</a>

Specific offsets:

<a href="#id-of-target-element" data-smooth-scroll data-offset-xs="50" data-offset-md="100">Smooth Scroll Link</a>

Dynamic offset

<a href="#id-of-target-element" data-smooth-scroll data-respect-compact-header-height>Smooth Scroll Link</a>

*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Basic Usage: On page load

Should the header height be respected, add the following attribute to the smooth scroll header placeholder `base.html`:

<div class="smooth-scroll-header-compact-mode-size" data-respect-compact-header-height></div>

*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

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

*/

/**
 *
 * @param {(number|HTMLElement)} destination - Destination to scroll to (DOM element or number)
 * @param {number} duration - Duration of scrolling animation
 * @param {string} easing - Timing function name (Allowed values: 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint')
 * @param {function} callback - Optional callback invoked after animation
 */

function scrollIt(destination, compact_header_offset, content_section_spacing, offset_xs, offset_md, duration , easing, callback) {

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

    // offset:
    // manual offset first
    const window_width = window.outerWidth;
    var offset = 0;
    if (window_width < 768 && offset_xs) {
        offset = offset_xs;
    }
    if (window_width >= 768 && offset_md) {
        offset = offset_md;
    }
    // dynamic offset is stronger than manual offset
    if( compact_header_offset > 0 ) {
        offset = compact_header_offset;
    }

    // in case the content sectino has a margin-top (which means it doesn't have a padding-top), subtract our content section spacing to leave some room
    const destinationPadding = parseInt($(destination).css('padding-top'), 10);
    // leave a little bit of room for destination without padding or margin
    if (destinationPadding === 0) {
        offset = offset + content_section_spacing;
    }

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

    const destinationOffset = (typeof destination === 'number' ? destination : Math.round(getOffsetTop(destination))) - offset;
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
        if (Math.round(window.pageYOffset) === destinationOffsetToScroll) {
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

function getOffsetTop(el) {
    // inspiration: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    let rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return (rect.top + scrollTop);
}

function handleSmoothScroll(url, $trigger) {
    // clean hash
    var hash = (url.indexOf('#') > -1 && url.indexOf('#/') === -1) ? url.substring(url.indexOf('#')) : ''; // workaround for hash-based routing (i.e. vue-router)
    // target not found? adios!
    var $target = $(hash);
    if ($target.length === 0) {
        console.warn('allink-core-static: Smooth scroll target with selector "' + url + '"" could not be found in the DOM.');
        return false;
    }
    // defaults
    var compact_header_offset = 0;
    var offset_xs = 0;
    var offset_md = 0;
    var scroll_duration = 300;
    var scroll_easing = 'easeInOutQuad';

    var $compact_header_sizer = $('.smooth-scroll-header-compact-mode-size');
    if ($compact_header_sizer.length > 0) {
        var respect_compact_header_height = $compact_header_sizer.attr('data-respect-compact-header-height');
        if (typeof respect_compact_header_height !== 'undefined') {
            compact_header_offset = $compact_header_sizer.outerHeight();
        }
        var content_section_spacing = $compact_header_sizer.width();
    }else {
        console.warn('allink-core-static: The ".smooth-scroll-header-compact-mode-size" element is missing in the DOM.');
    }

    // case 1: trigger
    if (typeof $trigger !== 'undefined') {
        // optional: offset (priority 2): manually set offset for XS breakpoint
        var offset_xs_from_attribute = $trigger.attr('data-offset-xs');
        if (offset_xs_from_attribute) {
            offset_xs = parseInt(offset_xs_from_attribute);
        }
        // optional: offset (priority 2): manually set offset for MD breakpoint
        var offset_md_from_attribute = $trigger.attr('data-offset-md');
        if (offset_md_from_attribute) {
            offset_md = parseInt(offset_md_from_attribute);
        }
        // optional: individual scroll duration
        var scroll_duration_from_attribute = $trigger.attr('data-scroll-duration');
        if (scroll_duration_from_attribute) {
            scroll_duration = parseInt(scroll_duration_from_attribute);
        }
        // optional: individual easing function
        var scroll_easing_from_attribute = $trigger.attr('data-scroll-easing');
        if (scroll_easing_from_attribute) {
            scroll_easing = scroll_easing_from_attribute;
        }
    }
    // trigger custom event
    $(window).trigger('smooth-scroll:before');
    // scroll!
    scrollIt(
        $target.get(0),
        compact_header_offset,
        content_section_spacing,
        offset_xs,
        offset_md,
        scroll_duration,
        scroll_easing,
        function(){
            $(window).trigger('smooth-scroll:after');
        }
    );
}

function initSmoothScroll() {
    // init
    var $scroll_links = $('[data-smooth-scroll]');
    if ($scroll_links.length > 0) {
        $scroll_links.each(function(){
            // init
            var $trigger = $(this);
            var initialized_attr = 'data-trigger-initialized';
            // only initialize visible elements
            if ($trigger.is(":visible") === false) {
                return true;
            }
            // check for initialized trigger
            var trigger_initialized = $trigger.attr(initialized_attr);
            // NOT initialized yet
            if (typeof trigger_initialized === 'undefined') {
                $trigger.on('click',function(e){
                    // init
                    var $trigger = $(this);
                    // anazlyse url
                    let current_page_url = window.location.href;
                    let trigger_href = $trigger.attr('href');
                    let trigger_hash = trigger_href.substring(trigger_href.indexOf('#'));
                    let trigger_page_url = trigger_href.replace(trigger_hash,'');
                    // only continue if we're on the same page
                    if (current_page_url.indexOf(trigger_page_url) >= 0) {
                        // init target
                        e.preventDefault();
                        var url = $trigger.attr('href');
                        // in case the trigger is within a modal, close modal
                        if ($trigger.parents('.tingle-modal')) {
                            $(window).trigger('closeSoftpage');
                            $(window).trigger('closeFormModal');
                            $(window).trigger('closeDefaultModal');
                        }
                        // let me handle that
                        handleSmoothScroll(url, $trigger);
                    }
                });
                // mark as initialized
                $trigger.attr(initialized_attr,'');
            }
        });
    }
}

function smoothScrollOnPageLoad() {
    let url = window.location.hash;
    // no hash, no scroll
    if (url.length > 0) {
        setTimeout(function(){
            handleSmoothScroll(url);
        },1000);
    }
}

$(function(){
    // on page load
    initSmoothScroll();
    smoothScrollOnPageLoad();

    // after certain events
    $(window).on('initSmoothScroll softpage:opened default-modal:opened', function() {
        initSmoothScroll();
    });

    // after certain events
    $(window).on('smoothScrollOnPageLoad', function() {
        smoothScrollOnPageLoad();
    });

    // re-init after cms page refresh
    if (window.CMS) {
        CMS.$(window).on('cms-content-refresh', () => {
            initSmoothScroll();
        });
    }
});
