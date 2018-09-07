/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Prevent the viewport dependent container height (e.g. 100vh)
to be adjust when scrolling (resulting in smaller address bar)
on some Android devices by setting the height inline

Usage:

Some websites have a fixed header with a background color, that is also taking up space.
In such a case, we have to subtract the height of that header element:

<div class="site-header-buffer" data-respect-my-height-to-calculate-full-height></div>

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
        let minimum_height = 450;
        let subtract_element_height = 0;
        // find elements
        let elements = document.querySelectorAll('.full-height-enabled');
        if (elements.length > 0) {
            let subtract_element = document.querySelector('[data-respect-my-height-to-calculate-full-height]');
            if (subtract_element !== null) {
                subtract_element_height = subtract_element.offsetHeight;
            }
            // ..and looop through all items and set inline height
            for (let element of elements) {
                // bullet-proof version: JS!
                let calculated_height_in_css = $(window).height();
                // in case of small screens in landscape mode, the height would be too small, so we apply a minimum height
                if (calculated_height_in_css < 450) {
                    element.style.minHeight = minimum_height + 'px';
                }
                // oterhwise we set the calculated height
                else {
                    element.style.minHeight = (calculated_height_in_css - subtract_element_height) + 'px';
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
