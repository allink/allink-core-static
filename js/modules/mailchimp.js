import serialize from 'form-serialize';
import request from 'superagent';

export default () => {
    $(document.body).on('submit', '#mailchimp-form', function(event){
        event.preventDefault();
        $.post('/mailchimp/', $(this).serialize(), function(data) {

            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

            This is a quick and dirty fix. How it works:

            In case there was something wrong with the email submitted,
            we get the same form markup INCLUDING error messages.
            The error message is wrapped with the class 'errorlist'
            so in case we find this string in the markup, we print
            the error message, otherwise we assume everything's fine.

            */

            if (data.search('errorlist') == -1){
                $(".mailchimp-result").html( 'Vielen Dank für Ihre Anmeldung.' );
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({'event': 'newsletter.sent'});
                }
            }
            else {
                $(".mailchimp-result").html(data);
            }
        });
        return false;
    });
};
