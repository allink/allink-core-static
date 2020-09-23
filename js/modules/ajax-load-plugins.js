import {initFormValidation} from './form-validation';

$(function () {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Load Plugins with ajax

    */

    function loadContentPlugin($content) {
        let url = $content.data('rendered-plugin-url');
        let current_page = $('#current-page-id').data('current-page');

        $.ajax({
            url: url,
            method: 'GET',
            data: {'current_page': current_page},
            success: function (data) {
                if (data) {
                    $content.replaceWith(data);
                }
            }
        });
    }

    function initSkeletonPlugins() {
        $('.plugin--tpl-skeleton[data-rendered-plugin-url]').each(function () {
            let $this = $(this);
            loadContentPlugin($this);
        });
    }

    // on page load
    initSkeletonPlugins();

    // custom event
    $(window).on('softpage:opened default-modal:opened', function () {
        initFormValidation();
    });

});
