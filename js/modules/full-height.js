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
        if (elements.length > 0) {
            // ..and looop through all items and set inline height
            for (var element of elements) {
                // NOT WORKING: get the calculated height of the element..
                // Safari on iOS and Chrome on Android rendered 100vh to the height WITHOUT address bar
                // https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
                // var calculated_height_in_css = parseInt(getComputedStyle(element).minHeight);
                // bullet-proof version: JS!
                var calculated_height_in_css = $(window).height();
                // in case of small screens in landscape mode, the height would be too small, so we apply a minimum height
                if (calculated_height_in_css < 450) {
                    element.style.minHeight = minimum_height + 'px';
                }
                // oterhwise we set the calculated height
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
