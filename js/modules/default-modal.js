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

<div id="example-container" style="display: none;">
    <div class="modal-header-markup" style="display: none;">
        <h2 class="tingle-modal-header__heading">
            {% trans "Example Heading" %}
        </h2>
        <a class="tingle-modal-header__link-close" href="#" data-close-default-modal>
            <span class="sr-only">
                {% trans "Close" %}
            </span>
        </a>
    </div>
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

    function initDefaultModal() {
        // initialize modal
        window.default_modal = new tingle.modal({
            cssClass: ['default-modal'],
            onClose: function () {
                // init
                var $modal = $('.tingle-modal.default-modal');
                // remove class from html
                document.querySelector('html').classList.remove('default-modal-visible');
                // remove header
                $modal.find('.tingle-modal-header').remove();
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
                } else {
                    $(window).trigger('hideSiteOverlay');
                }
            },
            onOpen: function () {
                // init
                var $modal = $('.tingle-modal.default-modal');
                // remove default overlay class.. we have our own
                $modal.removeClass('tingle-modal--noOverlayClose');
                // trigger custom events
                $(window).trigger('initDefaultModalClose');
                // set closing method classes
                var closing_method_attr_value = $modal.attr('data-modal-closing-methods');
                $modal.addClass(closing_method_attr_value);
                // overlay close enabled?
                if ($modal.hasClass(overlay_close_method_enabled_class)) {
                    $modal.on('click', function (e) {
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
        // relocate close button
        var $default_modal = $('.tingle-modal.default-modal');
        var close_btn = $default_modal.find('.tingle-modal__close').get(0);
        var modal_content = $default_modal.find('.tingle-modal-box').get(0);
        modal_content.appendChild(close_btn);

        // close modal when hitting ESC
        $(document).keydown(function (evt) {
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
    }

    // click handler
    function openDefaultModal(element,$content_container) {

        // in case we opened a default modal from within a softpage, we need to hide the softpage
        document.querySelector('html').classList.add('default-modal-visible');

        // set content
        // set modal content and open
        default_modal.setContent($content_container.html());
        // check if header markup exists, but only get the first one
        let $header_markup = $content_container.find('.modal-header-markup').first();
        if ($header_markup.length > 0) {
            // in case the first header markup element is preceeded by a button link plugin link, then ignore it since it does NOT what we want here
            let belongs_to_button_link_plugin = $header_markup.prev().hasClass('button-link-plugin__link');
            if (belongs_to_button_link_plugin === false) {
                let $header_markup_container = $('<div class="tingle-modal-header"></div>');
                $(default_modal.modal).prepend($header_markup_container);
                $header_markup_container.prepend($header_markup.html());
            }
        }
        // modal-header-markup
        default_modal.open();
        // scroll to top everytime a modal is opened
        default_modal.modal.scrollTop = 0;
        // trigger custom event
        $(window).trigger('default-modal:opened');

    }

    function initDefaultModalTrigger(){
        // init all trigger links and loop
        $('[data-trigger-default-modal]:not([data-modal-disabled])').each(function(i) {
            // stop multiple event listeners on the same element by adding an initialized attribute that we can check the next time we call this function
            // init
            var $trigger = $(this);
            var initialized_attr = 'data-trigger-initialized';
            // trigger not visible? Adios!
            if($trigger.is(':visible') === false) {
                return true;
            }
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
                            // load modal
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
    initDefaultModal();
    initDefaultModalTrigger();

    // custom event
    $(window).on('initDefaultModalTrigger softpage:opened default-modal:opened', function() {
        initDefaultModalTrigger();
    });


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Init close triggers

    */

    function initDefaultModalClose() {

        // init
        var $modal_close_toggles = $('.close-default-modal,[data-close-default-modal]');
        // look for triggers
        if ($modal_close_toggles.length > 0) {
            $modal_close_toggles.each(function(){
                // init
                var $toggle = $(this);
                $toggle.on('click', function(e) {
                    e.preventDefault();
                    default_modal.close();
                });
            });
        }
    }

    // custom event
    $(window).on('initDefaultModalClose', function() {
        initDefaultModalClose();
    });

    // re-init after cms page refresh
    if (window.CMS) {
        CMS.$(window).on('cms-content-refresh', () => {
            initDefaultModal();
            initDefaultModalTrigger();
        });
    }


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Custom event to close

    */

    function closeDefaultModal() {
        default_modal.close();
    }

    // custom event
    $(window).on('closeDefaultModal', function() {
        closeDefaultModal();
    });

});
