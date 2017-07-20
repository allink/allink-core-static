/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Bootstrap Select

Docs: https://silviomoreto.github.io/bootstrap-select/options/

*/

import 'bootstrap/js/dropdown';
import 'bootstrap-select/dist/js/bootstrap-select';

$(function(){

    function initBootstrapSelect() {
        $('.selectpicker').selectpicker({
          style: 'btn-default bs-placeholder',
          size: 'auto',
          dropupAuto: true, // per default, let bootstrap select choose where to dislpay the dropdown (above or below). Should you want to force to display the form below, add the `data-dropup-auto="false"` attribute to the desired <select> element.
        });
    }

    // on page load
    initBootstrapSelect();

    // custom event
    $(window).on('initBootstrapSelect ajaxForm:success softpage:opened form-modal:opened', function() {
        initBootstrapSelect();
    });

});
