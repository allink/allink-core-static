/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

jQuery Validation

Usage:

<form class="validate-form">
    ...
        <!-- Mark a field as required -->
        <input type="text" name="example" required>
    ...
</form>

Optional: Validate on page load by adding a class to the form:

<form class="validate-form validate-on-page-load">
    ...
</form>

Docs:

https://jqueryvalidation.org/validate/

*/

import validate from 'jquery-validation';
import { sendAjaxForm } from './ajax-form';

export function initFormValidation() {
    $('form.validate-form').each(function(){
        // init
        var $form = $(this);
        // init form validation
        var form_to_validate = $form.validate({
            onkeyup: false,
            onfocusout: function(element) {
                // option 1: INSTANT validation after leaving a form field
                // this.element(element);
                // option 2: validate on submit
                return false;
            },
            errorPlacement: function(error,element) {
                return false;
            },
            submitHandler: function(form) {
                let $form_to_be_submitted = $(form);
                // ajax form
                if ($form_to_be_submitted.hasClass('ajax-form') === true) {
                    sendAjaxForm($form);
                }
                // default form
                else {
                    window.onbeforeunload = null;
                    return true;
                }
            },
            highlight: function(element) {
                $(element).addClass('error');
                $form.addClass('has-errors');
            },
            unhighlight: function(element) {
                $(element).removeClass('error');
                $form.removeClass('has-errors');
            }
        });
        // optional: validate on page load by adding a class to the form
        if ($form.hasClass('validate-on-page-load')) {
            $form.validate().form();
        }
    });
}

$(function(){

    // on page load
    initFormValidation();

    // custom event
    $(window).on('initFormValidation', function() {
        initFormValidation();
    });

});
