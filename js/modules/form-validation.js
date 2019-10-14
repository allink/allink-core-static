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
            invalidHandler: function(event, validator){
                $form.addClass('has-errors');
            },
            unhighlight: function(element) {
                // form element itself
                $(element).removeClass('error');

                // form group, or error state handler (in case of multi column forms)
                var $error_state_handler = $(element).parents('.error-state-handler');
                if ($error_state_handler.length > 0) {
                    $error_state_handler.removeClass('has-error');
                }else {
                    $(element).parents('.form-group').first().removeClass('has-error');
                }
            },
            highlight: function(element) {
                // form element itself
                $(element).addClass('error');
                $($(element).parents('form').first()[0]).find('.has-error button, .error').focus();
                $(element).parents('form').first()[0].$('.has-error button, .error').focus();

                // form group, or error state handler (in case of multi column forms)
                var $error_state_handler = $(element).parents('.error-state-handler');
                if ($error_state_handler.length > 0) {
                    $error_state_handler.addClass('has-error');
                }else {
                    $(element).parents('.form-group').first().addClass('has-error');
                }
            },
        });
        // optional: validate on page load by adding a class to the form
        if ($form.hasClass('validate-on-page-load')) {
            $form.validate().form();
        }
    });
}

$(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    optimize email validation

    note: by using the keyword 'email' we don't have to do anything in the existing markup

    inspiration: https://stackoverflow.com/questions/37609828/jquery-validate-email-without-top-level-domain-valid#answer-40392540

    */

    $.validator.addMethod('email', function(val, elem){
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(val)) {
            return false;
        } else {
            return true;
        }
    }, '*');

    // on page load
    initFormValidation();

    // custom event
    $(window).on('initFormValidation softpage:opened default-modal:opened form-modal:opened', function() {
        initFormValidation();
    });

});
