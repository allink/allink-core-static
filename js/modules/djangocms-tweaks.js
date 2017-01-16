/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Disable Scrolling when Django Modal is open

Inspiration:

http://jsfiddle.net/ybGCF/

*/

$(function(){

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

});
