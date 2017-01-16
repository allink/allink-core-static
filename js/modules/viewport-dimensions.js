import { debounce } from './helper-functions';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Store and update viewport dimensions for oriontation change
detection

*/

function update_viewport_dimensions() {
    $('html').attr('data-viewport-width',$(window).width());
    $('html').attr('data-viewport-height',$(window).height());
}

function viewport_height_has_changed() {
    var stored_height = $('html').attr('data-viewport-height');
    var new_height = $(window).height();
    if( stored_height != new_height) {
        return true;
    }
}

function viewport_width_has_changed() {
    var stored_width = $('html').attr('data-viewport-width');
    var new_width = $(window).width();
    if( stored_width != new_width) {
        return true;
    }
}

$(function(){

    // on page load
    update_viewport_dimensions();

    // delayed calling of functinos on 'resize'
    var initViewportDimensions = debounce(function(){
        // do stuff when viewport WIDTH has changed
        if(viewport_width_has_changed()) {
            update_viewport_dimensions();
            // trigger custom events
            $(window).trigger('viewportWidthHasChanged');
        }
        // do stuff when viewport HEIGHT has changed
        if(viewport_height_has_changed()) {
            update_viewport_dimensions();
            // trigger custom event
            $(window).trigger('viewportHeightHasChanged');
        }
    },500);
    $(window).on('resize',initViewportDimensions);

});
