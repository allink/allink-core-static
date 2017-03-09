/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Swiper by iDangero.us

API:

http://idangero.us/swiper/api/

Custom Events:

swiper:initialized

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
    if (!options.loop) {
        options.loop = true;
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
        // default
        var mySwiper = new Swiper ($swiper_instance, {
            // global settings
            onInit: function(){
                // leave a flag when an instance has been initialized in order to prevent re-initialization
                $swiper_instance.addClass('swiper-initialized');
                // trigger custom event
                $(window).trigger('initSoftpageTrigger');
                $(window).trigger('swiper:initialized');
            },
            effect: options.effect,
            speed: options.transitionDurationBetweenSlides, // Number: Duration of transition between slides (in ms)
            autoplay: options.durationPerSlide, // Number: Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
            slidesPerView: options.slidesPerView,
            spaceBetween: 30,
            direction: 'horizontal',
            loop: options.loop, // important: Set to 'false' when scrollbar is enabled
            grabCursor: true,

            // If we need pagination
            pagination: '.swiper-pagination',
            paginationElement: 'span',
            paginationClickable: true,

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });

    });

}
