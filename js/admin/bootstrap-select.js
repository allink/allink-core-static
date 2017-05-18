/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Admin Bootstrap Select

Docs: https://silviomoreto.github.io/bootstrap-select/options/

*/

import 'bootstrap/js/dropdown';
import 'bootstrap-select/dist/js/bootstrap-select';

$(function(){

    function initBootstrapSelect() {
        $('.selectpicker').selectpicker({
          style: 'btn-default bs-placeholder',
          size: 'auto',
        });
    }

    // on page load
    initBootstrapSelect();

    // custom event
    $(window).on('initBootstrapSelect ajaxFormSuccess softpage:opened form-modal:opened', function() {
        initBootstrapSelect();
    });

});
