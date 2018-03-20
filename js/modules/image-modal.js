/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class '.toggle-image-modal' will trigger the image lightbox

Example:

<a
    href="#"
    data-trigger-image-modal

    data-modal-button-close-method-enabled="true"
    data-modal-escape-close-method-enabled="true"
    data-modal-overlay-close-method-enabled="true"
    >
    ...
</a>

Custom Events:

image-modal:opened
image-modal:closed

*/

import tingle from 'tingle.js';

$(function(){

    // init
    var escape_close_method_enabled_class = 'tingle-modal--EscapeClose';
    var overlay_close_method_enabled_class = 'tingle-modal--OverlayClose';
    var button_close_method_enabled_class = 'tingle-modal--ButtonClose';

    // initialize modal
    window.image_modal = new tingle.modal({
        cssClass: ['image-modal'],
        onClose: function() {
            // init
            var $modal = $('.tingle-modal.image-modal');
            // remove class from html
            document.querySelector('html').classList.remove('image-modal-visible');
            // trigger class
            $(window).trigger('image-modal:closed');
            // remove closing method classes
            var closing_method_attr_value = $modal.attr('data-modal-closing-methods');
            $modal.removeClass(closing_method_attr_value);
            // remove any content (issue: video was still playing)
            $modal.find('.tingle-modal-box__content').empty();
            // if the softpage is still open in the brackground, we have to keep the overlay, otherwise we can close it
            if ($('.tingle-modal.softpage').hasClass('tingle-modal--visible')) {
                // tingle removes the class from the body, so let's re-add it
                document.querySelector('body').classList.add('tingle-enabled');
            }else {
                $(window).trigger('hideSiteOverlay');
            }
        },
        onOpen: function(){
            // init
            var $modal = $('.tingle-modal.image-modal');
            // remove default overlay class.. we have our own
            $modal.removeClass('tingle-modal--noOverlayClose');
            // trigger custom events
            $(window).trigger('image-modal:opened');
            $(window).trigger('initImageModalClose');
            // set closing method classes
            var closing_method_attr_value = $modal.attr('data-modal-closing-methods');
            $modal.addClass(closing_method_attr_value);
            // overlay close enabled?
            if ($modal.hasClass(overlay_close_method_enabled_class)) {
                $modal.on('click',function(e){
                    // only close modal if clicked on overlay, and not on modal itself
                    if ($(e.target).hasClass(overlay_close_method_enabled_class)) {
                        image_modal.close();
                    }
                });
            }
        },
        // per default, only ['button'] has to be set (otherwise the button will be removed from the DOM)
        // The closing options have to specificly be defined by setting data attributes on the modal trigger element
        closeMethods: ['button']
    });

    // close modal when hitting ESC
    $(document).keydown(function(evt) {
        // init
        evt = evt || window.event;
        var isEscape = false;
        var $modal = $('.tingle-modal.image-modal');
        if ("key" in evt) {
            isEscape = evt.key == "Escape";
        } else {
            isEscape = evt.keyCode == 27;
        }
        if (isEscape) {
            // is image modal visible?
            if ($('html').hasClass('image-modal-visible')) {
                if ($modal.hasClass(escape_close_method_enabled_class)) {
                    image_modal.close();
                }
            }
        }
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
                                // init
                                var $modal = $('.tingle-modal.image-modal');
                                var closing_method_attr_value = '';
                                // instantly trigger site overlay (improves "felt performance")
                                $(window).trigger('showSiteOverlay');
                                // ESC close
                                var escape_close_method_enabled = $trigger.attr('data-modal-escape-close-method-enabled');
                                if (escape_close_method_enabled === 'true') {
                                   closing_method_attr_value += escape_close_method_enabled_class+' ';
                                }
                                // overlay close
                                var overlay_close_method_enabled = $trigger.attr('data-modal-overlay-close-method-enabled');
                                if (overlay_close_method_enabled === 'true') {
                                   closing_method_attr_value += overlay_close_method_enabled_class+' ';
                                }
                                // button close
                                var button_close_method_enabled = $trigger.attr('data-modal-button-close-method-enabled');
                                if (button_close_method_enabled === 'true') {
                                   closing_method_attr_value += button_close_method_enabled_class+' ';
                                }
                                if (closing_method_attr_value.length > 0) {
                                    $modal.attr('data-modal-closing-methods', closing_method_attr_value);
                                }
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
        // init
        var $modal_close_toggles = $('.close-image-modal,[data-close-image-modal]');
        // look for triggers
        if ($modal_close_toggles.length > 0) {
            $modal_close_toggles.each(function(){
                // init
                var $toggle = $(this);
                $toggle.on('click', function(e) {
                    e.preventDefault();
                    image_modal.close();
                });
            });
        }
    }

    // custom event
    $(window).on('initImageModalClose', function() {
        initImageModalClose();
    });

});
