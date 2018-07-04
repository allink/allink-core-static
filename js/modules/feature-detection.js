/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Feature Detection

*/

$(function(){

    // init
    const $html = $('html');

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Swop class if JavaScript is enabled

    */

    $html.removeClass('no-js').addClass('js');


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    object-fit detection without using Modernizr

    Inspiration: https://www.bmorecreativeinc.com/edge-object-fit-fallback-without-polyfill-modernizr/

    */

    const objectfit_supported = (getComputedStyle( $html[0], ':before' ).content == 'none') ? false : true;
    // in case of EDGE browser, ignore the pseude-support
    const isEdge = navigator.userAgent.indexOf('Edge/') >= 0;
    if (objectfit_supported === true && isEdge === false) {
        $html.addClass('objectfit');
    }else {
        $html.addClass('no-objectfit');
    }

});
