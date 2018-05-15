/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class [data-trigger-form-modal] will trigger the form lightbox

Example:

<a
    href="#"
    data-trigger-form-modal

    data-modal-button-close-method-enabled="true"
    data-modal-escape-close-method-enabled="true"
    data-modal-overlay-close-method-enabled="true"
    >
    ...
</a>

Custom Events:

form-modal:opened
form-modal:closed

*/

import tingle from 'tingle.js';

$(function(){

    // init
    var escape_close_method_enabled_class = 'tingle-modal--EscapeClose';
    var overlay_close_method_enabled_class = 'tingle-modal--OverlayClose';
    var button_close_method_enabled_class = 'tingle-modal--ButtonClose';

    // initialize modal
    window.form_modal = new tingle.modal({
        cssClass: ['form-modal'],
        onClose: function() {
            // init
            var $modal = $('.tingle-modal.form-modal');
            // remove class from html
            document.querySelector('html').classList.remove('form-modal-visible');
            // trigger class
            $(window).trigger('form-modal:closed');
            // remove closing method classes
            var closing_method_attr_value = $modal.attr('data-modal-closing-methods');
            $modal.removeClass(closing_method_attr_value);
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
            var $modal = $('.tingle-modal.form-modal');
            // remove default overlay class.. we have our own
            $modal.removeClass('tingle-modal--noOverlayClose');
            // trigger custom events
            $(window).trigger('initFormModalClose');
            // set closing method classes
            var closing_method_attr_value = $modal.attr('data-modal-closing-methods');
            $modal.addClass(closing_method_attr_value);
            // overlay close enabled?
            if ($modal.hasClass(overlay_close_method_enabled_class)) {
                $modal.on('click',function(e){
                    // only close modal if clicked on overlay, and not on modal itself
                    if ($(e.target).hasClass(overlay_close_method_enabled_class)) {
                        form_modal.close();
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
        var $form_modal = $('.tingle-modal.form-modal');
        var close_btn = $form_modal.find('.tingle-modal__close').get(0);
        var modal_content = $form_modal.find('.tingle-modal-box').get(0);
        modal_content.appendChild(close_btn);
    },500);

    // close modal when hitting ESC
    $(document).keydown(function(evt) {
        // init
        evt = evt || window.event;
        var isEscape = false;
        var $modal = $('.tingle-modal.form-modal');
        if ("key" in evt) {
            isEscape = evt.key == "Escape";
        } else {
            isEscape = evt.keyCode == 27;
        }
        if (isEscape) {
            // is form modal visible?
            if ($('html').hasClass('form-modal-visible')) {
                if ($modal.hasClass(escape_close_method_enabled_class)) {
                    form_modal.close();
                }
            }
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
            // trigger not visible? Adios!
            if($trigger.is(':visible') === false) {
                return false;
            }
            // check for initialized trigger
            var trigger_initialized = $trigger.attr(initialized_attr);
            // NOT initialized yet
            if (typeof trigger_initialized === 'undefined') {
                $trigger.
                    on('click',
                    function(event){
                        // init
                        var $modal = $('.tingle-modal.form-modal');
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
                        event.preventDefault();
                        openFormModal(this,event);
                        // trigger custom event
                        $(window).trigger('form-modal:opened');
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
    $(window).on('initFormModalTrigger softpage:opened form-modal:opened default-modal:opened', function() {
        initFormModalTrigger();
    });

    function initFormModalClose() {
        // init
        var $modal_close_toggles = $('.close-form-modal,[data-close-form-modal]');
        // look for triggers
        if ($modal_close_toggles.length > 0) {
            $modal_close_toggles.each(function(){
                // init
                var $toggle = $(this);
                $toggle.on('click', function(e) {
                    e.preventDefault();
                    form_modal.close();
                });
            });
        }
    }

    // custom event
    $(window).on('initFormModalClose', function() {
        initFormModalClose();
    });


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Custom event to close

    */

    function closeFormModal() {
        form_modal.close();
    }

    // custom event
    $(window).on('closeFormModal', function() {
        closeFormModal();
    });

});
