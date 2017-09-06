/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Default Contact Form

*/

$(function(){

    function initContactForm() {

        // init
        var $the_form = $('.default-contact-form');
        var $phone_container = $the_form.find('.phone-container');
        var $email_container = $the_form.find('.email-container');
        var $contact_type_select = $the_form.find('#id_contact_type');

        var updateFields = function() {
            // show PHONE option
            if($contact_type_select.val() == 10) {
                $phone_container.find("input").attr('disabled', false);
                $phone_container.show();
                $email_container.find("input").attr('disabled', true);
                $email_container.hide();
            }
            // show EMAIL option
            else if($contact_type_select.val() == 20) {
                $email_container.find("input").attr('disabled', false);
                $email_container.show();
                $phone_container.find("input").attr('disabled', true);
                $phone_container.hide();
            }
            // no option (hide everything)
            else {
                console.log( 'drin' );
                $phone_container.find("input").attr('disabled', true);
                $phone_container.hide();
                $email_container.find("input").attr('disabled', true);
                $email_container.hide();
            }
        };

        var initSelect = function($the_form,$contact_type_select) {
            // change option
            $the_form.on('change', $contact_type_select, function() {
                updateFields();
            });
        };

        // initial update
        updateFields();
        // init select listener
        initSelect($the_form,$contact_type_select);
    }

    // on page load
    initContactForm();

    // custom event
    $(window).on('initContactForm ajaxFormSuccess softpage:opened form-modal:opened', function() {
        initContactForm();
    });

});
