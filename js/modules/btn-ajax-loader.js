/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Adds loading animation to all elements with the attribute [data-btn-ajax-loader].

It ist meant for 'load more' button elements.

How it works:

1. When clicking on an element, a 'loader' icon appears within the button
2. As soon as the 'btnAjaxLoaderDone' event is triggered, the icon is hidden
the buton goes back to normal.

Required markup (button style can vary, of course:

<a href="#" class="btn btn-default" data-btn-ajax-loader>
    <span class="btn-text"></span>
</a>

*/

function resetBtnAjaxLoader($element) {
    $element.removeClass('loading');
    $element
        .css('width','')
        .css('height','');
}

function setBtnAjaxLoader($btn) {
    $btn.addClass('loading');
    var width = $btn.outerWidth();
    var height = $btn.outerHeight();
    $btn
        .css('width',width)
        .css('height',height);
}

function initBtnAjaxLoader() {
    // find buttons and loop!
    var btn_elements = document.querySelectorAll('[data-btn-ajax-loader]');
    if(btn_elements.length > 0) {
        for (var i = 0; i < btn_elements.length; i++) {
            var $element = $(btn_elements[i]);
            $element.on('click',function(e){
                // init
                var $btn = $(this);
                // are we validation the form? Delayed check so we can check if the error class has been added in the meanwhile
                if ($btn.parents('form').hasClass('validate-form') === true) {
                    // only apply 'loading' styles when there are no errors
                    setTimeout(function(){
                        if($btn.parents('form').hasClass('has-errors') === false) {
                            setBtnAjaxLoader($btn);
                        }
                    },10);
                }
                // otherwise, let it load right away!
                else {
                    setBtnAjaxLoader($btn);
                }

            });
        }
    }
    return btn_elements;
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
