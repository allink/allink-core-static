/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Adds loading animation to all elements with the attribute [data-btn-ajax-loader].

It ist meant for 'load more' button elements.

How it works:

1. When clicking on an element, a 'loader' icon appears within the button
2. As soon as the 'btnAjaxLoaderDone' event is triggered, the icon is hidden
the buton goes back to normal.

*/

function initBtnAjaxLoader() {
    // find buttons and loop!
    var btn_elements = document.querySelectorAll('[data-btn-ajax-loader]');
    if(btn_elements.length > 0) {
        for (var i = 0; i < btn_elements.length; i++) {
            var $element = $(btn_elements[i]);
            $element.on('click',function(e){
                var $this = $(this);
                $this.addClass('loading');
                var width = $this.outerWidth();
                var height = $this.outerHeight();
                $this
                    .css('width',width)
                    .css('height',height);
            });
        }
    }
    return btn_elements;
}

function resetBtnAjaxLoader($element) {
    $element.removeClass('loading');
    $element
        .css('width','')
        .css('height','');
}

function btnAjaxLoaderDone() {
    // find buttons and loop!
    var btn_elements = initBtnAjaxLoader();
    if(btn_elements.length > 0) {
        for (var i = 0; i < btn_elements.length; i++) {
            var $element = $(btn_elements[i]);
            resetBtnAjaxLoader($element);
        }
    }
}

$(function(){

    // on page load
    initBtnAjaxLoader();

    // custom event
    $(window).on('initBtnAjaxLoader', function() {
        initBtnAjaxLoader();
    });

    // custom event
    $(window).on('btnAjaxLoaderDone', function() {
        btnAjaxLoaderDone();
    });

});
