/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Global solution for simple AJAX forms

Usage:

<div id="example-form-container">
    <form class="ajax-form" data-form-container-id="example-form-container" action="/example-url/">
        <div
            data-layer-variable="example-variable-1"
            data-layer-value="example-value-1"
            >
        </div>
        <div
            data-layer-variable="example-variable-2"
            data-layer-value="example-value-2"
            >
        </div>
        ...
    </form>
</div>

Important:

Obviously, the container ID has to be unique, not just to pass the HTML validator.

*/

export function sendAjaxForm($form) {

    // init
    var url = $form.attr('action');
    var container_id_selector = '#' + $form.data('form-container-id');
    var postData = $form.serialize();

    // look for data-layer variables inside
    var $data_layers = $form.find('[data-layer-variable]');

    // AJAX magic
    $.ajax({
        type: "POST",
        url : url,
        data : postData,
        success:function(data, textStatus, jqXHR) {
            // write response content into container
            $(container_id_selector).html(data);

            // Google Tag Manager
            if (typeof dataLayer !== 'undefined') {
                // no GTM in use
            }
            // Note: If there are errors that we couldn't catch with the JavaScript form validation we get a '206' status code from the form's view
            else if (jqXHR.status === 206) {
                // something wrong while sending the form
            }
            else if ($data_layers.length > 0) {
                // no data layer variables for this form
            }
            // made it.. finally!
            else {
                $data_layers.each(function(){
                    // init
                    var $data_layer_item = $(this);
                    var data_layer_variable = $data_layer_item.attr('data-layer-variable');
                    var data_layer_value = $data_layer_item.attr('data-layer-value');
                    // add values to array
                    dataLayer.push({
                        data_layer_variable: data_layer_value,
                    });
                });
            }

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
