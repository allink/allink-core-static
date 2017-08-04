/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Swiper by iDangero.us

API:

http://idangero.us/swiper/api/

Custom Events:

swiper:initialized

===

Optional data-attributes for the .swiper-container:

data-duration-per-slide="6000"
Note: Duration in miliseconds

data-autoplay="false"
Note: Not set (default) is "true"

===

To enable the fullscreen mode of Swiper
add the following markup at the end in the body tag in the base template:

<div class="swiper-fullscreen-container">
    <a href="#" class="swiper-button-fullscreen-close" data-softpage-disabled data-close-swiper-fullscreen>
        <i class="sr-only" lang="en">
            {% trans "Close" %}
        </i>
    </a>
    <div class="swiper-fullscreen"></div>
</div>

The associated styles need to be added in the project's _swiper.scss file.

*/

import Swiper from 'swiper';

export function initiSwiperInstances(options) {

    // initialize options
    var options = options || {};

    // available options with default values
    if (!options.transitionDurationBetweenSlides) {
        options.transitionDurationBetweenSlides = 1000;
    }
    if (!options.durationPerSlide) {
        options.durationPerSlide = 4000;
    }
    if (!options.effect) {
        options.effect = 'fade';
    }
    if (!options.slidesPerView) {
        options.slidesPerView = 'auto';
    }
    if (typeof options.loop === 'undefined') {
        options.loop = true;
    }
    if (!options.initialSlide) {
        options.initialSlide = 0;
    }
    if (!options.fullscreen_active_class_delay) {
        options.fullscreen_active_class_delay = 300;
    }

    // loop through instances (that have NOT been initialized yet)
    $('.swiper-default:not(.swiper-initialized)').each(function(i) {

        // init
        var $swiper_instance = $(this);

        // determine number of slides
        var number_of_slides = $swiper_instance.find('.swiper-slide').length;

        // no point in initializing swiper if there is only one slide
        if(number_of_slides < 2) {
            $swiper_instance.addClass('swiper-disabled');
            return true;
        }
        // swiper counter dom node
        var $counter = $swiper_instance.parent().find('.swiper-counter');
        if ($counter) {
            $counter.addClass('swiper-counter--active');
        }

        // local variable for loop. options.loop is a global setting for all swiper instances
        let loop = options.loop;
        // disable loop when attribute data-autoplay on .swiper-default element is present
        if ($swiper_instance.attr('data-autoplay') === "false") {
            loop = false;
        }

        // try to get value from instance container
        var durationPerSlide = parseInt($swiper_instance.attr('data-duration-per-slide'));
        // fallback: get option value
        if (isNaN(durationPerSlide)) {
            durationPerSlide = options.durationPerSlide;
        }

        // create instance
        const mySwiper = new Swiper ($swiper_instance, {
            // global settings
            onInit: function(swiper){
                // leave a flag when an instance has been initialized in order to prevent re-initialization
                $swiper_instance.addClass('swiper-initialized');
                // trigger custom event
                $(window).trigger('initSoftpageTrigger');
                $(window).trigger('swiper:initialized');

                if ($counter) {
                    $counter.children('.swiper-counter__total').html(number_of_slides);
                    $counter.children('.swiper-counter__current').html(swiper.realIndex + 1);
                }

                // if loop is false, stop autoplay
                if (!loop) {
                    swiper.stopAutoplay();
                }
            },
            onSlideChangeStart: function(swiper) {
                $(window).trigger('swiper:onSlideChangeStart');
                // if counter dom node exists in template
                if ($counter) {
                    $counter.children('.swiper-counter__current').html(swiper.realIndex + 1);
                }
            },
            onSlideChangeEnd: function(swiper) {
                $(window).trigger('swiper:onSlideChangeEnd');
            },
            effect: options.effect,
            speed: options.transitionDurationBetweenSlides, // Number: Duration of transition between slides (in ms)
            autoplay: durationPerSlide, // Number: Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
            slidesPerView: options.slidesPerView,
            spaceBetween: 30,
            direction: 'horizontal',
            loop: loop, // important: Set to 'false' when scrollbar is enabled
            grabCursor: true,
            initialSlide: options.initialSlide,

            // If we need pagination
            pagination: '.swiper-pagination',
            paginationElement: 'span',
            paginationClickable: true,

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });

        // enter fullscreen mode
        $swiper_instance.parent().find('[data-trigger-swiper-fullscreen]').on('click', function(e) {

            // init
            e.preventDefault();
            var $swiper_fullscreen_container = $('.swiper-fullscreen-container');
            var $swiper_fullscreen = $('.swiper-fullscreen');

            // prevent scrolling while lightbox is opened
            $('html').addClass('scrolling-disabled');

            // stop autoplay of default swiper
            mySwiper.stopAutoplay();

            // clone container, remove all inline styles of old swiper instance

            $swiper_fullscreen_container
                .children('.swiper-fullscreen').html($swiper_instance.clone())
                .children('.swiper-default').removeClass('swiper-initialized')
                .find('*').removeAttr('style')
                .find('.swiper-slide-duplicate').remove();

            // set new options
            var fullscreen_options = options;
            fullscreen_options.initialSlide = mySwiper.realIndex;
            fullscreen_options.loop = false;

            setTimeout(function() {
                // init dimensions
                initSwiperFullscreenDimensions();
                // init close click
                initSwiperFullscreenClose($swiper_fullscreen_container,$swiper_fullscreen);
                // hide softpage if open
                if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
                    // do nothing
                } else {
                    $(window).trigger('showSiteOverlay');
                }
                // instanciate swiper
                initiSwiperInstances(fullscreen_options);
                // make gallery visible
                $('html').addClass('swiper-fullscreen-visible');
                // add some delay
                setTimeout(function(){
                    $swiper_fullscreen_container.addClass('active');
                },options.fullscreen_active_class_delay);
            }, 10);
        });

        $('[data-close-swiper-fullscreen]').on('click', function(e) {
            e.preventDefault();
            closeSwiperFullscreen();
        });

        // Close when hitting ESC
        $(document).keydown(function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key == "Escape";
            } else {
                isEscape = evt.keyCode == 27;
            }
            if (isEscape) {
                // only call if the swiper is actually visible
                if ($('html').hasClass('swiper-fullscreen-visible')) {
                    closeSwiperFullscreen();
                }
            }
        });

    });

}

function initSwiperFullscreenClose($swiper_fullscreen_container,$swiper_fullscreen) {

    // close fullscreen gallery when clicking anywhere on the container
    $swiper_fullscreen_container.on('click',function(e){
        closeSwiperFullscreen();
    });

    // prevent closing the gallery when clicking inside the gallery itself
    $swiper_fullscreen.on('click',function(e){
        e.stopPropagation();
    });

}

function setSwiperFullscreenDimensions($inner,$gallery) {
    // determine browser window dimensions
    var window_width = $(window).width();
    var window_height = $(window).height();
    // TBD: option to leave some space for captions or spacings
    var available_height = window_height-100;
    // determine swiper dimensions
    var swiper_width = $gallery.width();
    var swiper_height = $gallery.height();
    // the gallery doesn't fit into the window, let's reset the dimensions
    if (swiper_height > available_height) {
        var adjusted_swiper_height = available_height;
        var adjusted_swiper_width = (available_height*swiper_width)/swiper_height;
        $inner.width(adjusted_swiper_width);
        $inner.height(adjusted_swiper_height);
        $inner.addClass('dimensions-set');
    }else {
        // reset dimensions
        $inner.css({
            'width':'',
            'height':'',
        });
        $inner.removeClass('dimensions-set');
    }
}

function initSwiperFullscreenDimensions(width_has_changed=false) {

    // init
    var $container = $('.swiper-fullscreen-container');
    var $inner = $container.find('.swiper-fullscreen');
    var $gallery = $container.find('.swiper-container');

    if (width_has_changed) {
        // reset dimensions
        $inner.css({
            'width':'',
            'height':'',
        });
        // remove initialized flag
        $gallery.removeClass('swiper-initialized');
        setTimeout(function(){
            setSwiperFullscreenDimensions($inner,$gallery);
            setTimeout(function(){
                initiSwiperInstances();
            },10);
        },50);
    }else {
        setSwiperFullscreenDimensions($inner,$gallery);
    }
}

function closeSwiperFullscreen() {
    setTimeout(function(){
        // if we opened a fullscreen gallery from within softpage, keep the site overlay visible
        if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
            // nada
        }
        // otherwise, hide it!
        else {
            $(window).trigger('hideSiteOverlay');
        }
        $('html').removeClass('swiper-fullscreen-visible');
        // init
        var $swiper_fullscreen_container = $('.swiper-fullscreen-container');
        var $swiper_fullscreen = $swiper_fullscreen_container.find('.swiper-fullscreen');
        // remove active state
        $swiper_fullscreen_container.removeClass('active');
        // remove content
        $swiper_fullscreen.empty();
        // reset dimensions
        $swiper_fullscreen.css({
            'width':'',
            'height':'',
        });
        // enable scrolling again
        $('html').removeClass('scrolling-disabled');
    },10);
}

$(window).on('viewportWidthHasChanged',function(){
    var width_has_changed = true;
    initSwiperFullscreenDimensions(width_has_changed);
});
