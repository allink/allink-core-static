/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Global solution for simple AJAX forms

Usage:

<div id="example-form-container">
    <form class="ajax-form" data-form-container-id="example-form-container" action="/example-url/">
        ...
    </form>
</div>

*/

export function sendAjaxForm($form) {

    // init
    var url = $form.attr('action');
    var container_id_selector = '#' + $form.data('form-container-id');
    var postData = $form.serialize();

    // AJAX magic
    $.ajax({
        type: "POST",
        url : url,
        data : postData,
        success:function(data, textStatus, jqXHR) {
            // write content
            $(container_id_selector).html(data);
            // trigger custom events
            $(window).trigger('initAjaxForm');
            $(window).trigger('initDatepicker');
            $(window).trigger('initFormModalClose');
            $(window).trigger('initFormValidation');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //if fails
        }
    });

}

export function initAjaxForm() {

    // find .ajax-form elements and loop!
    let ajax_forms = document.querySelectorAll('.ajax-form');
    if(ajax_forms.length > 0) {
        for (var i = 0; i < ajax_forms.length; i++) {
            // init
            var $form = $(ajax_forms[i]);
            // only listen for the submit event, if the form is not being validated
            if ($form.hasClass('validate-form') === false) {
                $form.on('submit', function(event){
                    sendAjaxForm($form);
                    event.preventDefault();
                });
            }
        }
    }

}

$(function(){

    // on page load
    initAjaxForm();

    // custom event
    $(window).on('initAjaxForm', function() {
        initAjaxForm();
    });

});
