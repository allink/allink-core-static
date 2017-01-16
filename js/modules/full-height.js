/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Prevent the viewport dependent container height (e.g. 100vh)
to be adjust when scrolling (resulting in smaller address bar)
on some Android devices by setting the height inline

*/

$(function(){

    function remove_full_height() {
        var elements = document.querySelectorAll('.full-height-enabled');
        if (elements.length > 0) {
            for (var element of elements) {
                element.style.minHeight = '';
            }
        }
    }

    function set_full_height() {
        // define the very minimum height of an element (very small screens or mobile devies in landscape)
        var minimum_height = 450;
        // find elements
        var elements = document.querySelectorAll('.full-height-enabled');
        // In case there are full height elements, let's get the calculated height of the first element (they're all the same)..
        if (elements.length > 0) {
            var calculated_height_in_css = parseInt(getComputedStyle(elements[0]).minHeight);
            // ..and looop through all items and set inline height
            for (var element of elements) {
                if (calculated_height_in_css < 450) {
                    element.style.minHeight = minimum_height + 'px';
                }
                else {
                    element.style.minHeight = calculated_height_in_css + 'px';
                }
            }
        }
    }

    // on page load
    set_full_height();

    // custom event
    $(window).on('setFullHeight', function(){
        // first we need to remove the inline CSS, so we can get the proper CSS calculations again..
        remove_full_height();
        // ..and then we set the height
        set_full_height();
    });

    // initialize again when viewport width has changed
    $(window).on('viewportWidthHasChanged', function(){
        // first we need to remove the inline CSS, so we can get the proper CSS calculations again..
        remove_full_height();
        // ..and then we set the height
        set_full_height();
    });

});
