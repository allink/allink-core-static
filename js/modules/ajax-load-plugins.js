import {initFormValidation} from "allink-core-static/js/modules/form-validation";

$(function () {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Load Plugins with ajax

    */

    function loadContentPlugin($content){
        let url = $content.data('rendered-plugin-url');
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                if (data){
                   $content.replaceWith(data);
                }
            }
        });
    }

    function initSkeletonPlugins(){
        $('.plugin--tpl-skeleton[data-rendered-plugin-url]').each(function() {
            let $this = $(this);
            loadContentPlugin($this);
        });
    }

    // on page load
    initSkeletonPlugins();

    // custom event
    $(window).on('softpage:opened default-modal:opened', function() {
        initFormValidation();
    });

});
