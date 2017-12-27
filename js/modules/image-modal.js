/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class '.toggle-image-modal' will trigger the form lightbox

Custom Events:

image-modal:opened
image-modal:closed

*/

import tingle from 'tingle.js';

$(function(){

    // initialize modal
    window.image_modal = new tingle.modal({
        cssClass: ['image-modal'],
        onClose: function() {
            // remove class from html
            document.querySelector('html').classList.remove('image-modal-visible');
            // trigger class
            $(window).trigger('image-modal:closed');
            // if the softpage is still open in the brackground, we have to keep the overlay, otherwise we can close it
            if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
                // tingle removes the class from the body, so let's re-add it
                document.querySelector('body').classList.add('tingle-enabled');
            }else {
                $(window).trigger('hideSiteOverlay');
            }
        },
        onOpen: function(){
            // trigger custom events
            $(window).trigger('image-modal:opened');
            $(window).trigger('initImageModalClose');
        },
    });

    // click handler
    function openImageModal(element,event,$image_modal_content) {
        // init
        event.preventDefault();

        // indicate that the image modal is visible
        document.querySelector('html').classList.add('image-modal-visible');

        // set content
        $(image_modal.modalBoxContent).html($image_modal_content);
        image_modal.open();
    }

    function initImageModalTrigger(){
        // init all trigger links and loop
        $('[data-trigger-image-modal]').each(function(i) {
            // stop multiple event listeners on the same element by adding an initialized attribute that we can check the next time we call this function
            // init
            var $trigger = $(this);
            var initialized_attr = 'data-trigger-initialized';
            // check for initialized trigger
            var trigger_initialized = $trigger.attr(initialized_attr);
            // NOT initialized yet
            if (typeof trigger_initialized === 'undefined') {
                $trigger.
                    on('click',
                    function(event){
                        // init
                        event.preventDefault();
                        var $trigger = $(this);
                        var href = $trigger.attr('href');
                        var window_width = $(window).width();
                        // mobile, show in new tab instead
                        if (window_width < 768) {
                            window.open(href,'_blank');
                        }
                        // larger screens, show modal
                        else {
                            // get content of modal
                            var $image_modal_content = $trigger.find('.image-modal-content').contents().clone();
                            if ($image_modal_content.length > 0) {
                                // instantly toggle site overlay (improves "felt performance")
                                $(window).trigger('showSiteOverlay');
                                // load softpage
                                openImageModal(this,event,$image_modal_content);
                            }
                        }

                    }
                );
                // mark as initialized
                $trigger.attr(initialized_attr,'');
            }
        });
    }

    // on page load
    initImageModalTrigger();

    // custom event
    $(window).on('initImageModalTrigger softpage:opened image-modal:opened', function() {
        initImageModalTrigger();
    });

    function initImageModalClose() {
        // look for triggers
        if (document.querySelector('.close-image-modal,[data-close-image-modal]')) {
            var close_image_modal = document.querySelector('.close-image-modal,[data-close-image-modal]');
            close_image_modal.addEventListener('click', function(event) {
                event.preventDefault();
                image_modal.close();
            });
        }
    }

    // custom event
    $(window).on('initImageModalClose', function() {
        initImageModalClose();
    });

});
