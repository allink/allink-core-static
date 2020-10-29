/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Swiper by iDangero.us

API:

http://idangero.us/swiper/api/

Custom Events:

swiper:initialized

===

Optional data-attributes for the .swiper-container:

data-duration-per-slide="6000"

Note: Duration in milliseconds

---

data-autoplay="false"

Note: Not set (default) is "true"

---

data-transition-duration-desktop="4000"
data-transition-duration-mobile="500"

Note: Duration in milliseconds

---

data-transition-effect-mobile="fade"
data-transition-effect-desktop="fade"

Note: Only "fade" or "slide" are valid values. Anything else will break the slider.

---

data-randomize-slide-order

Does exactly what it says..

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


import Swiper, { Autoplay, Navigation, Pagination, Keyboard } from 'swiper';
Swiper.use([Autoplay, Navigation, Pagination, Keyboard]);

export function initiSwiperInstances(options) {

    // initialize options
    options = options || {};
    let viewport_width = $(window).width();

    // available options with default values
    if (!options.transitionDurationBetweenSlides_mobile) {
        options.transitionDurationBetweenSlides_mobile = 500;
    }
    if (!options.transitionDurationBetweenSlides) {
        options.transitionDurationBetweenSlides = 800;
    }
    if (!options.durationPerSlide) {
        options.durationPerSlide = 4000;
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

    // set default transition duration
    let transitionDurationBetweenSlides = options.transitionDurationBetweenSlides_mobile;
    if (viewport_width > 1024) {
        transitionDurationBetweenSlides = options.transitionDurationBetweenSlides;
    }

    // loop through instances (that have NOT been initialized yet)
    $('.swiper-default:not(.swiper-initialized)').each(function(i) {

        // init
        const $swiper_instance = $(this);

        // determine number of slides
        let number_of_slides = $swiper_instance.find('.swiper-slide').length;

        // no point in initializing swiper if there is only one slide
        if(number_of_slides < 2) {
            $swiper_instance.addClass('swiper-disabled');
            $swiper_instance.parent().addClass('swiper-disabled');
            return true;
        }
        // swiper counter dom node
        let $counter = $swiper_instance.parent().find('.swiper-counter');
        if ($counter) {
            $counter.addClass('swiper-counter--active');
        }

        // swiper content container dom node
        const $swiperContentsContainer = $swiper_instance.parent().siblings('.swiper-content-container');

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Instance settings

        */

        // local variable for loop. options.loop is a global setting for all swiper instances
        let loop = options.loop;

        // duration per slide
        let durationPerSlide = parseInt($swiper_instance.attr('data-duration-per-slide'));
        // fallback: get option value
        if (typeof durationPerSlide !== 'undefined') {
            durationPerSlide = options.durationPerSlide;
        }

        // autoplay disabled?
        if ($swiper_instance.data('autoplay') === false) {
            options.autoplay = false;
        } else {
            options.autoplay = { delay: options.durationPerSlide };
        }

        // randomize slides?
        let randomizeSlideOrder = $swiper_instance.attr('data-randomize-slide-order');
        if (typeof randomizeSlideOrder !== 'undefined') {
            let $parent = $swiper_instance.find('.swiper-wrapper');
            let $slides = $parent.children();
            while ($slides.length) {
                $parent.append($slides.splice(Math.floor(Math.random() * $slides.length), 1)[0]);
            }
        }

        // transition between slides: desktop
        let finalTransitionDurationBetweenSlides;
        let instanceTransitionDurationBetweenSlides;
        if (viewport_width > 1024) {
            instanceTransitionDurationBetweenSlides = parseInt($swiper_instance.attr('data-transition-duration-desktop'));
        }
        // transition between slides: mobile
        else {
            instanceTransitionDurationBetweenSlides = parseInt($swiper_instance.attr('data-transition-duration-mobile'));
        }
        if (isNaN(instanceTransitionDurationBetweenSlides) === false) {
            finalTransitionDurationBetweenSlides = instanceTransitionDurationBetweenSlides;
        } else {
            finalTransitionDurationBetweenSlides = transitionDurationBetweenSlides;
        }

        // set effect: mobile
        let finalEffect;
        let effect = 'slide';
        let instanceEffect = $swiper_instance.attr('data-transition-effect-mobile');
        // set effect: desktop
        if (viewport_width > 1024) {
            instanceEffect = $swiper_instance.attr('data-transition-effect-desktop');
        }
        if (typeof instanceEffect !== 'undefined') {
            finalEffect = instanceEffect;
        } else {
            finalEffect = effect;
        }


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Create instance

        */

        const mySwiper = new Swiper($swiper_instance[0], {
            // global settings
            init: false,
            effect: finalEffect,
            speed: finalTransitionDurationBetweenSlides, // Number: Duration of transition between slides (in ms)
            autoplay: options.autoplay, // Boolean or Number: Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
            slidesPerView: options.slidesPerView,
            spaceBetween: 2,
            loop: loop, // important: Set to 'false' when scrollbar is enabled
            initialSlide: options.initialSlide,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: $swiper_instance.parent().find('.swiper-button-next')[0],
                prevEl: $swiper_instance.parent().find('.swiper-button-prev')[0],
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        });

        mySwiper.on('init', function(swiper) {
            // leave a flag when an instance has been initialized in order to prevent re-initialization
            $swiper_instance.addClass('swiper-initialized');
            // trigger custom event
            $(window).trigger('initSoftpageTrigger', [swiper, $swiper_instance]);
            $(window).trigger('swiper:initialized', [swiper, $swiper_instance]);

            if ($counter) {
                $counter.children('.swiper-counter__total').html(number_of_slides);
                $counter.children('.swiper-counter__current').html(swiper.realIndex + 1);
            }

            // if loop is false, stop autoplay
            if (!loop) {
                swiper.autoplay.stop();
            }
        });

        mySwiper.on('slideChange', function(swiper) {
            // if counter dom node exists in template
            if ($counter) {
                $counter.children('.swiper-counter__current').html(swiper.realIndex + 1);
            }
            if ($swiperContentsContainer) {
                updateSwiperContentsContainer(swiper, $swiperContentsContainer);
            }
        });

        mySwiper.init();

        // enter fullscreen mode
        $swiper_instance.parent().find('[data-trigger-swiper-fullscreen]').on('click', function(e) {

            // init
            e.preventDefault();
            let $swiper_fullscreen_container = $('.swiper-fullscreen-container');
            let $swiper_fullscreen = $('.swiper-fullscreen');

            // prevent scrolling while lightbox is opened
            $('html').addClass('scrolling-disabled');

            // stop autoplay of default swiper
            mySwiper.autoplay.stop();

            // clone container, remove all inline styles of old swiper instance

            $swiper_fullscreen_container
                .children('.swiper-fullscreen').html($swiper_instance.clone())
                .children('.swiper-default').removeClass('swiper-initialized')
                .find('*').removeAttr('style')
                .find('.swiper-slide-duplicate').remove();

            // set new options
            let fullscreen_options = options;
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
            let isEscape = false;
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

function updateSwiperContentsContainer(swiper, $swiperContentsContainer) {
    const activeIndex = swiper.realIndex + 1; // django loop index starts at 1
    const $sliderContents = $swiperContentsContainer.children('.swiper-content');
    const $activeContent = $swiperContentsContainer.children(`.swiper-content-${activeIndex}`);
    $sliderContents.removeClass('swiper-content--visible');
    $activeContent.addClass('swiper-content--visible');
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
    let window_width = $(window).width();
    let window_height = $(window).height();
    // TBD: option to leave some space for captions or spacings
    let available_height = window_height-100;
    // determine swiper dimensions
    let swiper_width = $gallery.width();
    let swiper_height = $gallery.height();
    // the gallery doesn't fit into the window, let's reset the dimensions
    if (swiper_height > available_height) {
        let adjusted_swiper_height = available_height;
        let adjusted_swiper_width = (available_height*swiper_width)/swiper_height;
        $inner.width(adjusted_swiper_width);
        $inner.height(adjusted_swiper_height);
        $inner.addClass('dimensions-set');
    } else {
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
    let $container = $('.swiper-fullscreen-container');
    let $inner = $container.find('.swiper-fullscreen');
    let $gallery = $container.find('.swiper-container');

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
    } else {
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
        let $swiper_fullscreen_container = $('.swiper-fullscreen-container');
        let $swiper_fullscreen = $swiper_fullscreen_container.find('.swiper-fullscreen');
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
    let width_has_changed = true;
    initSwiperFullscreenDimensions(width_has_changed);
});
