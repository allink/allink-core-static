/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Lazysizes Tweas

*/

function initLazysizes() {
    // Per default, we don't need to do anything but to include lazysizes.
    // But im combination with other plugins such as 'swiper' we were forced
    // to re-init lazysizes in order to load images of new slided.
    lazySizes.loader.checkElems();
}

$(function(){
    // on page load
    initLazysizes();

    // custom event
    $(window).on('initLazysizes swiper:onSlideChangeStart', function() {
        initLazysizes();
    });

});

