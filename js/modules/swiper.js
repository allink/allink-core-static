/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Swiper by iDangero.us

API:

http://idangero.us/swiper/api/

Custom Events:

swiper:initialized

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
        var $counter = $('.swiper-counter');
        if ($counter) {
            $counter.addClass('active');
        }

        // default
        var mySwiper = new Swiper ($swiper_instance, {
            // global settings
            onInit: function(swiper){
                // leave a flag when an instance has been initialized in order to prevent re-initialization
                $swiper_instance.addClass('swiper-initialized');
                // trigger custom event
                $(window).trigger('initSoftpageTrigger');
                $(window).trigger('swiper:initialized');

                if ($counter) {
                    $counter.children('.total').html(number_of_slides);
                    $counter.children('.current').html(swiper.realIndex + 1);
                }

                // if loop is false, stop autoplay
                if (!options.loop) {
                    swiper.stopAutoplay();
                }
            },
            onSlideChangeStart: function(swiper) {
                // if counter dom node exists in template
                if ($counter) {
                    $counter.children('.current').html(swiper.realIndex + 1);
                }
            },
            effect: options.effect,
            speed: options.transitionDurationBetweenSlides, // Number: Duration of transition between slides (in ms)
            autoplay: options.durationPerSlide, // Number: Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
            slidesPerView: options.slidesPerView,
            spaceBetween: 30,
            direction: 'horizontal',
            loop: options.loop, // important: Set to 'false' when scrollbar is enabled
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
        $swiper_instance.find('[data-trigger-swiper-fullscreen]').on('click', function(e) {
            e.preventDefault();

            // stop autoplay of default swiper
            mySwiper.stopAutoplay();

            // clone container, remove all inline styles of old swiper instance
            var $swiper_fullscreen_container = $('.swiper-fullscreen-container');
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
                initiSwiperInstances(fullscreen_options);
                // hide softpage if open
                if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
                    // do nothing
                } else {
                    $(window).trigger('showSiteOverlay');
                }
                // make gallery visible
                $swiper_fullscreen_container.addClass('active');
                $('body').addClass('swiper-fullscreen-visible');
            }, 10);
        });

        $('[data-close-swiper-fullscreen]').on('click', function(e) {
            e.preventDefault();
            closeSwiperFullscreen();
        });

        // Close Subnave when hitting ESC
        $(document).keydown(function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key == "Escape";
            } else {
                isEscape = evt.keyCode == 27;
            }
            if (isEscape) {
                closeSwiperFullscreen();
            }
        });

    });

}

function closeSwiperFullscreen() {
    if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
        $('body').removeClass('swiper-fullscreen-visible');
    } else {
        $('body').removeClass('swiper-fullscreen-visible');
        $(window).trigger('hideSiteOverlay');
    }
    var $swiper_fullscreen_container = $('.swiper-fullscreen-container');
    $swiper_fullscreen_container.removeClass('active');
    $swiper_fullscreen_container.children('.swiper-fullscreen').empty();
}
