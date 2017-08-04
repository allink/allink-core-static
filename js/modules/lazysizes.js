/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Lazysizes Tweas

*/

function lazysizesLoadListener() {
    const imgs = document.querySelectorAll('img');

    // no images on page? adios
    if (imgs === null) {
      return;
    }

    Array.from(imgs).forEach(img => {
        img.addEventListener('load', () => {
            // init
            const $img = $(img);
            // mark parent as loaded
            $img.parents('.lazyloader').addClass('lazyloader--loaded');
        });
    });
}

function initLazysizes() {
    // Per default, we don't need to do anything but to include lazysizes.
    // But im combination with other plugins such as 'swiper' we were forced
    // to re-init lazysizes in order to load images of new slided.
    lazySizes.loader.checkElems();
}

$(function(){
    // on page load
    initLazysizes();
    lazysizesLoadListener();

    // custom event
    $(window).on('initLazysizes swiper:initialized', function() {
        initLazysizes();
        lazysizesLoadListener();
    });

});

