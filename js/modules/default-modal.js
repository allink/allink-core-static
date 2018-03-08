/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Example:

<a
    href="#"
    data-trigger-default-modal

    data-modal-button-close-method-enabled="true"
    data-modal-escape-close-method-enabled="true"
    data-modal-overlay-close-method-enabled="true"

    data-default-modal-variation="special-modal"
    data-default-modal-content-container-id="example-container"
    >
    ...
</a>

<div id="example-container">
    ...
    This content will be loaded within modal.
    ...
</div>

Link with class [data-trigger-default-modal] will trigger the default lightbox

Custom Events:

default-modal:opened
default-modal:closed

*/

import tingle from 'tingle.js';

$(function(){

    // init
    var escape_close_method_enabled_class = 'tingle-modal--EscapeClose';
    var overlay_close_method_enabled_class = 'tingle-modal--OverlayClose';
    var button_close_method_enabled_class = 'tingle-modal--ButtonClose';

    // initialize modal
    window.default_modal = new tingle.modal({
        cssClass: ['default-modal'],
        onClose: function() {
            // init
            var $modal = $('.tingle-modal.default-modal');
            // remove class from html
            document.querySelector('html').classList.remove('default-modal-visible');
            // trigger class
            $(window).trigger('default-modal:closed');
            // remove variation definition
            $modal.removeAttr('data-default-modal-variation');
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
            var $modal = $('.tingle-modal.default-modal');
            // remove default overlay class.. we have our own
            $modal.removeClass('tingle-modal--noOverlayClose');
            // trigger custom events
            $(window).trigger('default-modal:opened');
            $(window).trigger('initDefaultModalClose');
            // set closing method classes
            var closing_method_attr_value = $modal.attr('data-modal-closing-methods');
            $modal.addClass(closing_method_attr_value);
            // overlay close enabled?
            if ($modal.hasClass(overlay_close_method_enabled_class)) {
                $modal.on('click',function(e){
                    e.stopPropagation();
                    // only close modal if clicked on overlay, and not on modal itself
                    if ($(e.target).hasClass(overlay_close_method_enabled_class)) {
                        default_modal.close();
                    }
                });
            }
        },
        // per default, only ['button'] has to be set (otherwise the button will be removed from the DOM)
        // The closing options have to specificly be defined by setting data attributes on the modal trigger element
        closeMethods: ['button']
    });

    // modify tingle markup on page load (while the modal is hidden)
    setTimeout(function(){
        // relocate close button
        var $default_modal = $('.tingle-modal.default-modal');
        var close_btn = $default_modal.find('.tingle-modal__close').get(0);
        var modal_content = $default_modal.find('.tingle-modal-box').get(0);
        modal_content.appendChild(close_btn);
    },500);

    // close modal when hitting ESC
    $(document).keydown(function(evt) {
        // init
        evt = evt || window.event;
        var isEscape = false;
        var $modal = $('.tingle-modal.default-modal');
        if ("key" in evt) {
            isEscape = evt.key == "Escape";
        } else {
            isEscape = evt.keyCode == 27;
        }
        if (isEscape) {
            // is default modal visible?
            if ($('html').hasClass('default-modal-visible')) {
                if ($modal.hasClass(escape_close_method_enabled_class)) {
                    default_modal.close();
                }
            }
        }
    });

    // click handler
    function openDefaultModal(element,$content_container) {

        // in case we opened a default modal from within a softpage, we need to hide the softpage
        document.querySelector('html').classList.add('default-modal-visible');

        // set content
        // set modal content and open
        default_modal.setContent($content_container.html());
        default_modal.open();
        // scroll to top everytime a modal is opened
        default_modal.modal.scrollTop = 0;

    }

    function initDefaultModalTrigger(){
        // init all trigger links and loop
        $('[data-trigger-default-modal]:not([data-modal-disabled])').each(function(i) {
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
                        var $trigger = $(this);
                        var $modal = $('.tingle-modal.default-modal');
                        // only continue if the container exists
                        var container_id = $trigger.attr('data-default-modal-content-container-id');
                        var $content_container = $('#'+container_id);
                        if ($content_container.length > 0) {
                            // init
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
                            // optional: get modal variation string and set attribute
                            var modal_variation = $trigger.attr('data-default-modal-variation');
                            if (modal_variation) {
                                $modal.attr('data-default-modal-variation', modal_variation);
                            }
                            // load softpage
                            event.preventDefault();
                            openDefaultModal(this,$content_container);
                        }
                    }
                );
                // mark as initialized
                $trigger.attr(initialized_attr,'');
            }
        });
    }

    // on page load
    initDefaultModalTrigger();

    // custom event
    $(window).on('initDefaultModalTrigger softpage:opened default-modal:opened', function() {
        initDefaultModalTrigger();
    });

    function initDefaultModalClose() {
        // look for triggers
        if (document.querySelector('.close-default-modal,[data-close-default-modal]')) {
            var close_default_modal = document.querySelector('.close-default-modal,[data-close-default-modal]');
            close_default_modal.addEventListener('click', function(event) {
                event.preventDefault();
                default_modal.close();
            });
        }
    }

    // custom event
    $(window).on('initDefaultModalClose', function() {
        initDefaultModalClose();
    });

});
