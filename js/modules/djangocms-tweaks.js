$(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Disable Scrolling when Django Modal is open

    Inspiration:

    http://jsfiddle.net/ybGCF/

    */

    // init
    var djangocms_modal, observer_config, djangocms_modal_observer;

    // select element to be observed
    djangocms_modal = document.querySelector('.cms-modal');

    // only start observing if we're logged in and the element exists
    if (djangocms_modal !== null) {

        // observer settings
        observer_config = {
            attributes: true, // this is enough in our case
            childList: false,
            characterData: false
        };

        // instantuation MutationObserver
        djangocms_modal_observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var newVal = $(mutation.target).prop(mutation.attributeName);
                if (mutation.attributeName === "class") {
                    if ( newVal.search('cms-modal-open') > 0 ) {
                        $('html').addClass('scrolling-disabled');
                    }else {
                        $('html').removeClass('scrolling-disabled');
                    }
                }
            });
        });

        // Let's observe!
        djangocms_modal_observer.observe(djangocms_modal, observer_config);

    }


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Initialize CMS-Plugins after Ajax-Request

    */

    if (typeof CMS !== 'undefined') {
        $(window).on('ajaxLoadItems:success', function(event){
            // CMS.Plugin._initializeTree();
        });
    }


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Open/trigger structure view when 'View structure' button (in admin edit view) has been clicked

    */

    if (location.search.indexOf('?structure') > -1) {
        window.top.CMS.$('.cms-toolbar-item-cms-mode-switcher a').first().not('.cms-btn-active').trigger('click');
    }
});
