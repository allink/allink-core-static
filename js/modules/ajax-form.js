/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Global solution for simple AJAX forms

Usage:

<div id="example-form-container">
    <form class="ajax-form" data-form-container-id="example-form-container" data-success-data-layer-event="newsletter.sent" action="/example-url/">
        <div
            data-layer-variable="example-variable-1"
            data-layer-value="example-value-1"
            >
        </div>
        ...
    </form>
</div>

Google Tag Manager GTM note:

Send a custom event to GTM by adding the 'data-success-data-layer-event' attribute to the <form> and pass a value e.g. 'newsletter.sent' that matched your GTM settings.

Important:

Obviously, the container ID ("example-form-container") has to be unique, not just to pass the HTML validator.

*/

export function sendAjaxForm($form) {

    // init
    var url = $form.attr('action');
    var custom_event = $form.attr('data-success-data-layer-event');
    var success_url = $form.attr('data-success-url');
    var container_id = $form.attr('data-form-container-id');
    var postData = $form.serialize();

    // define the container in which the ajax response will be written into
    // 1. in case an ID is defined, select that element
    if (container_id) {
        var $form_container = $('#' + container_id);
        if ($form_container.length == 0) {
            console.warn('The form\'s "data-form-container-id" is set to "' + container_id + '" but element can not be found in DOM');
        }
    }
    // 2. default: use immediate parent
    else {
        var $form_container = $form.parent();
    }

    // AJAX magic
    $.ajax({
        type: "POST",
        url : url,
        data : postData,
        success:function(data, textStatus, jqXHR) {
            console.log( data );
            // do we get a custom URL from view?
            if (data.success_url) {
                window.location.href = data.success_url;
            }
            // otherwise, write HTML
            else {
                $form_container.html(data);
            }
            // Note: If there are errors that we couldn't catch with the JavaScript form validation we get a '206' status code from the form's view
            if (jqXHR.status === 206) {
                // something wrong while sending the form
            }
            // made it.. finally!
            else {
                // Google Tag Manager in use?
                if (typeof dataLayer !== 'undefined') {
                    // Is there a custom event defined?
                    if (custom_event) {
                        // add values to array
                        dataLayer.push({
                            'event': custom_event,
                        });
                    }
                }
            }

            // trigger custom events
            $(window).trigger('ajaxFormSuccess');
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
