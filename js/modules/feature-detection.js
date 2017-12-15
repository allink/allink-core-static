/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Feature Detection

*/

$(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Swop class if JavaScript is enabled

    */

    $('html').removeClass('no-js').addClass('js');


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    object-fit detection without using Modernizr

    Inspiration: https://www.bmorecreativeinc.com/edge-object-fit-fallback-without-polyfill-modernizr/

    */

    const $html = $('html');
    const objectfit_supported = (getComputedStyle( $html[0], ':before' ).content == 'none') ? false : true;
    if (objectfit_supported === true) {
        $html.addClass('objectfit');
    }else {
        $html.addClass('no-objectfit');
    }

});
