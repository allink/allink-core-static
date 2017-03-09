/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class '.toggle-form-modal' will trigger the form lightbox

Custom Events:

form-modal:opened
form-modal:closed

*/

import tingle from 'tingle.js';

$(function(){

    // initialize modal
    var form_modal = new tingle.modal({
        cssClass: ['form-modal'],
        onClose: function() {
            // tbd
            closeFormModal();
            // if the softpage is still open in the brackground, we have to keep the overlay, otherwise we can close it
            if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
                // don't do anything
            }else {
                $(window).trigger('form-modal:closed');
                $(window).trigger('hideSiteOverlay');
            }
        },
        onOpen: function(){
            $(window).trigger('form-modal:opened');
            $(window).trigger('initFormModalClose');
        }
    });

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
        });
    }

    function closeFormModal() {
        document.querySelector('html').classList.remove('form-modal-visible');
    }

    function initFormModalTrigger(){
        // init all trigger links and loop
        $('.toggle-form-modal').each(function(i) {
            // stop multiple event listeners from firing multiple times by removing (off()) and adding (on()) the event listener
            $(this).
                off('click').
                on('click',
                function(event){
                    // instantly toggle site overlay (improves "felt performance")
                    $(window).trigger('showSiteOverlay');
                    // load softpage
                    event.preventDefault();
                    openFormModal(this,event);
                }
            );
        });
    }

    // on page load
    initFormModalTrigger();

    // custom event
    $(window).on('initFormModalTrigger softpage:loaded softpage:loaded', function() {
        initFormModalTrigger();
    });

    function initFormModalClose() {
        // prevent clicks on background to close modal
        // $('.tingle-modal.form-modal').each(function(i) {
        //     // stop multiple event listeners from firing multiple times by removing (off()) and adding (on()) the event listener
        //     $(this).off('click').
        //         on('click',
        //         function(event){
        //             // load softpage
        //             console.log( event );
        //             event.preventDefault();
        //             return false;
        //         }
        //     );
        // });
        // look for triggers
        if (document.querySelector('.close-form-modal')) {
            var close_form_modal = document.querySelector('.close-form-modal');
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
