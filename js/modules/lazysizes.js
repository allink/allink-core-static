/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Lazysizes Tweas

*/

function lazysizesLoadListener() {
    const $images = $('img');
    // only continue when images on page
    if ($images.length > 0) {
        $images.each(function(){
            // init
            let $image = $(this);
            $image.on('load',function(){
                // init
                let $image = $(this);
                // mark parent as loaded with some delay (to make sure the animation has finished)
                setTimeout(function(){
                    $image.parents('.lazyloader').addClass('lazyloader--loaded');
                },1000);
            });
        });
    }
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
    $(window).on('initLazysizes default-modal:opened softpage:opened swiper:initialized', function() {
        initLazysizes();
        lazysizesLoadListener();
    });

});
