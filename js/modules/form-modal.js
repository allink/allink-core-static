/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class [data-trigger-form-modal] will trigger the form lightbox

Custom Events:

form-modal:opened
form-modal:closed

*/

import tingle from 'tingle.js';

$(function(){

    // initialize modal
    window.form_modal = new tingle.modal({
        cssClass: ['form-modal'],
        onClose: function() {
            // remove class from html
            document.querySelector('html').classList.remove('form-modal-visible');
            // trigger class
            $(window).trigger('form-modal:closed');
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
            $(window).trigger('form-modal:opened');
            $(window).trigger('initFormModalClose');
        },
        closeMethods: ['button']
    });

    // modify tingle markup on page load (while the modal is hidden)
    setTimeout(function(){
        // relocate close button
        var $form_modal = $('.tingle-modal.form-modal');
        var close_btn = $form_modal.find('.tingle-modal__close').get(0);
        var modal_content = $form_modal.find('.tingle-modal-box').get(0);
        modal_content.appendChild(close_btn);
    },500);

    // click handler
    function openFormModal(element,event) {
        // init
        event.preventDefault();

        // in case we opened a form modal from within a softpage, we need to hide the softpage
        document.querySelector('html').classList.add('form-modal-visible');
        // document.querySelector('.softpage').classList.remove('tingle-modal--visible');

        // get and set content
        var url = element.getAttribute('href');

        $.get(url, function(data) {
            // set modal content and open
            form_modal.setContent(data);
            form_modal.open();
            // scroll to top everytime a modal is opened
            form_modal.modal.scrollTop = 0;
        });
    }

    function initFormModalTrigger(){
        // init all trigger links and loop
        $('.toggle-form-modal:not([data-softpage-disabled]),[data-trigger-form-modal]:not([data-softpage-disabled])').each(function(i) {
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
                        // instantly toggle site overlay (improves "felt performance")
                        $(window).trigger('showSiteOverlay');
                        // load softpage
                        event.preventDefault();
                        openFormModal(this,event);
                    }
                );
                // mark as initialized
                $trigger.attr(initialized_attr,'');
            }
        });
    }

    // on page load
    initFormModalTrigger();

    // custom event
    $(window).on('initFormModalTrigger softpage:opened form-modal:opened', function() {
        initFormModalTrigger();
    });

    function initFormModalClose() {
        // look for triggers
        if (document.querySelector('.close-form-modal,[data-close-form-modal]')) {
            var close_form_modal = document.querySelector('.close-form-modal,[data-close-form-modal]');
            close_form_modal.addEventListener('click', function(event) {
                event.preventDefault();
                form_modal.close();
            });
        }
    }

    // custom event
    $(window).on('initFormModalClose', function() {
        initFormModalClose();
    });

});
