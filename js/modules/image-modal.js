/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with data attribute 'data-toggle-image-modal' will trigger the image lightbox

*/
import tingle from 'tingle.js';

$(function(){

    // initialize modal
    var image_modal = new tingle.modal({
        cssClass: ['image-modal'],
        onClose: function() {
            close_image_modal_handler();
            // trigger custom events
            $(window).trigger('hideSiteOverlay');
        },
        onOpen: function(){
            $(window).trigger('initImageModalClose');
        }
    });


    // click handler
    function open_image_modal_handler(element,event) {
        event.preventDefault();
        document.querySelector('html').classList.add('image-modal-visible');

        // get and set content
        var url = element.getAttribute('data-href');
        var picture = element.getElementsByTagName("picture")[0].cloneNode(true);
        picture.getElementsByTagName('img')[0].setAttribute('data-srcset', url);

        image_modal.setContent(picture);
        image_modal.open();
        $(window).trigger('initImageModalClose');
            setTimeout(function(){
                $(window).trigger('initImageModalTrigger');
            },1500);

        // add functionality to close the modal with the ESCAPE key
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key == "Escape";
            } else {
                isEscape = evt.keyCode == 27;
            }
            if (isEscape) {
                image_modal.close();
            }
        };
    }

    function close_image_modal_handler() {
        document.querySelector('html').classList.remove('image-modal-visible');
    }

    function initImageModalTrigger(){
        if(document.querySelector('a[data-toggle-image-modal]')) {
            var image_modal_elements = document.querySelectorAll('a[data-toggle-image-modal]');
            for (var i = 0; i < image_modal_elements.length; i++) {
                image_modal_elements[i].addEventListener('click', function(event) {
                    // instantly toggle site overlay (improves "felt perimageance")
                    $(window).trigger('showSiteOverlay');
                    // open modal
                    open_image_modal_handler(this,event);
                });
            }
        }
    }

    // on page load
    initImageModalTrigger();

    // custom event
    $(window).on('initImageModalTrigger softpage:opened form-modal:opened', function() {
        initImageModalTrigger();
    });

    function initImageModalClose() {
        if (document.querySelector('.close-image-modal')) {
            var close_image_modal = document.querySelector('.close-image-modal');
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
