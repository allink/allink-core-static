/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Bootstrap Select

Docs: https://silviomoreto.github.io/bootstrap-select/options/

*/

import 'bootstrap/js/dropdown';
import 'bootstrap-select/dist/js/bootstrap-select';

$(function(){

    function initBootstrapSelect() {
        // dynamically define offset of select because of fixed site header
        let bs_select_offset_top = $('.site-header').outerHeight();
        $('.selectpicker').selectpicker({
          style: 'btn-default bs-placeholder',
          size: 'auto',
          dropupAuto: true, // per default, let bootstrap select choose where to dislpay the dropdown (above or below). Should you want to force to display the form below, add the `data-dropup-auto="false"` attribute to the desired <select> element.
          windowPadding: [bs_select_offset_top,0,0,0],
        });
    }

    // on page load
    initBootstrapSelect();

    // custom event
    $(window).on('initBootstrapSelect ajaxFormSuccess softpage:opened form-modal:opened', function() {
        initBootstrapSelect();
    });

});
