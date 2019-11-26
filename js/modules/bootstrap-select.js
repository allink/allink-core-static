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
        let initialized_class = 'selectpicker--initialized';
        $('.selectpicker, .selectpicker-alt').each(function(){
            const $select = $(this);
            if ($select.is(':visible') && $select.hasClass(initialized_class) === false) {
                $select.selectpicker({
                    style: 'bs-placeholder',
                    size: 'auto',
                    dropupAuto: true, // per default, let bootstrap select choose where to dislpay the dropdown (above or below). Should you want to force to display the form below, add the `data-dropup-auto="false"` attribute to the desired <select> element.
                    windowPadding: [bs_select_offset_top,0,0,0],
                });
                // mark as initialized
                $select.addClass(initialized_class);
                // modify markup
                setTimeout(function(){
                    $select.parents('.bootstrap-select').find('.dropdown-toggle').each(function(){
                        this.innerHTML = this.innerHTML.replace(/&nbsp;/g,'');
                        $(this).find('.bs-caret').remove();
                        $(this).addClass('toggle-initialized');
                    });
                },0);
            }
        })
    }

    // on page load
    initBootstrapSelect();

    // custom event
    $(window).on('initBootstrapSelect viewportWidthHasChanged ajaxForm:success softpage:opened form-modal:opened default-modal:opened', function() {
        initBootstrapSelect();
    });

    $(window).on('shown.bs.select',function(){
        var $opened_bs = $('.bootstrap-select.open > .dropdown-menu');
        $opened_bs.addClass('animate');
    });

    $(window).on('hidden.bs.select',function(){
        var $bs = $('.bootstrap-select > .dropdown-menu');
        $bs.removeClass('animate');
    });

});
