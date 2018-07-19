/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The SoftPage AJAX Trigger

All child anchor-tags (<a>) of an element with a 'data-trigger-softpage' attribute
will toggle a softpage.

This feature can optionally be activated in an 'App Content Plugin' in the 'Display Options'.

In some cases, not all links within a section should trigger a softpage. That's why
we added the 'data-softpage-disabled' attribute for those links.

Default (loading a links href-attribute:

<div class"example-container" data-trigger-softpage>
    <a href="/link-to-page">I will trigger a softpage</a>
    <a href="/link-to-page" data-softpage-disabled>I will NOT trigger a softpage</a>
</div>

Optional (loading content of a specific element):

<a href="/link-to-page" data-trigger-softpage data-softpage-content-id="example-element">I will trigger a softpage</a>

<div id="example-element">
    ...
        <h1>Anything in here will be displayed in the Softpage</h1>
    ...
</div>

Optional moda header markup (to be added in e.g. news_detail.html):

<div class="modal-header-markup" style="display: none;">
    <h2 class="tingle-modal-header__heading">
        {% trans "Example Heading" %}
    </h2>
    <a class="tingle-modal-header__link-close" href="#" data-close-softpage>
        <span class="sr-only">
            {% trans "Close" %}
        </span>
    </a>
</div>

Custom Events:

softpage:opened
softpage:closed

Event Listeners:

initSoftpageTrigger
closeSoftpage

*/

import SoftPage from 'softpage';
import { nodeListToArray } from './helper-functions';

$(function(){

    window.softpage = new SoftPage({
        onPageLoaded: function(obj) {
            // scroll to top everytime a softpage is opened
            obj.modal.modal.querySelector('.tingle-modal-box').scrollTop = 0;
            // check if header markup exists and set
            let $header_markup = $(obj.modal.modal).find('.modal-header-markup');
            if ($header_markup.length > 0) {
                let $header_markup_container = $('<div class="tingle-modal-header"></div>');
                $(obj.modal.modal).prepend($header_markup_container);
                $header_markup_container.prepend($header_markup.html());
            }
            // trigger custom events
            $(window).trigger('initSoftpageCloseTrigger');
            // do stuff slighty delayed, so we get all the information we need
            setTimeout(function(){
                // init page meta
                var modal_url = obj.modal.modal.baseURI;
                var modal_page_title_element = obj.modal.modalBoxContent.querySelector('#softpage-page-title');
                var modal_page_title = '';
                // Info for developer, that #softpage-page-title is missing on the detail page
                if (modal_page_title_element != null) {
                    var modal_page_title = modal_page_title_element.textContent;
                }
                // Google Tag Manager
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'VirtualPageview',
                        'virtualPageURL': modal_url,
                        'virtualPageTitle': modal_page_title,
                    });
                }
                // trigger custom events
                $(window).trigger('initSoftpageTrigger');
                $(window).trigger('initOnScreen');
                $(window).trigger('initiSwiperInstances');
                // clean content in case of CMS page
                var $softpage = $('.tingle-modal.softpage');
                var is_cms_page = $softpage.attr('data-cms-page');
                if (typeof is_cms_page !== 'undefined' && is_cms_page !== false) {
                    cleanupSoftpageMarkup($softpage);
                }else {
                    $(window).trigger('softpage:opened');
                }
            },50);
        },
        onSoftpageClosed: function (obj) {
            // init
            let $modal = $(obj.modal.modal);
            // hide site overlay
            $(window).trigger('hideSiteOverlay');
            $(window).trigger('softpage:closed');
            // remove variation definition
            $modal.removeAttr('data-softpage-variation');
            // remove any content (issue: video was still playing)
            $modal.find('.tingle-modal-box__content').empty();
            // remove flag on html element
            $('html').removeClass('softpage-visible');
            // remove header
            $modal.find('.tingle-modal-header').remove();
        },
        onBeforeClose: function(){
            // prevent closing of the softpage as long as..
            // 1. the form modal is opened
            if ($('.tingle-modal.form-modal').hasClass('tingle-modal--visible')) {
                return false;
            }
            // 2. the swiper fullscreen gallery is visible
            else if($('html').hasClass('swiper-fullscreen-visible')) {
                return false;
            }
            // default
            else {
                return true;
            }
        }
    });


    function initSoftpageTrigger() {
        // init all softpage trigger links and loop
        // 1. Text Editor > All links that should trigger a softpage (added by e.g. button link plugin)
        // 2. App Content > If the Softpage option is enabled.
        $('a[data-trigger-softpage]:not([data-softpage-disabled]), [data-trigger-softpage] a:not([data-softpage-disabled])').each(function(i) {
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
                // add event listener
                $trigger.
                    on('click',
                    function(event){
                        // init
                        var $trigger = $(this);
                        var $softpage = $('.tingle-modal.softpage');
                        var softpage_content_id = '';
                        var href = event.currentTarget.href;
                        // set flag on html element
                        $('html').addClass('softpage-visible');
                        // optional: use a node's content instead of href-attribute
                        var softpage_content_id = $trigger.attr('data-softpage-content-id');
                        // optional: get softpage variation string and set attribute
                        var softpage_variation = $trigger.attr('data-softpage-variation');
                        if (softpage_variation) {
                            $softpage.attr('data-softpage-variation', softpage_variation);
                        }
                        // optional: we are about to display a CMS page within the softpage
                        var softpage_cms_page = $trigger.attr('data-cms-page');
                        if (typeof softpage_cms_page !== 'undefined' && softpage_cms_page !== false) {
                            $softpage.attr('data-cms-page', '');
                        }
                        // otherwise, make sure the attribute is removed
                        else {
                            $softpage.removeAttr('data-cms-page');
                        }
                        // special case: prevent softpage reload in case of a menu that has been toggled already and is about to be closed
                        var softpage_already_toggled = $trigger.attr('data-softpage-toggled');
                        if (typeof softpage_already_toggled !== 'undefined' && softpage_already_toggled !== false) {
                            return true;
                        }
                        // instantly toggle site overlay (improves "felt performance")
                        $(window).trigger('showSiteOverlay');
                        // load softpage
                        event.preventDefault();
                        softpage.loadPage(href, true, softpage_content_id);
                        // fixes bug in firefox: softpage text was selected - let's remove any selection
                        document.getSelection().removeAllRanges();
                    }
                );
                // mark as initialized
                $trigger.attr(initialized_attr,'');
            }

        });
    }

    function closeSoftpage() {
        softpage.closeSoftpage();
    }

    function cleanupSoftpageMarkup($softpage) {
        // init
        var $softpage_content_container = $softpage.find('.tingle-modal-box__content');
        // select/store the content we want to put inside the modal box content
        var $ajax_page_container = $softpage.find('.site-content').children();
        // empty the box content and append the just stored markup
        $softpage_content_container.empty().append($ajax_page_container);
        // trigger custom event
        $(window).trigger('softpage:opened');
    }

    // on page load
    initSoftpageTrigger();

    // custom events
    $(window).on('initSoftpageTrigger ajaxForm:success default-modal:opened', function() {
        initSoftpageTrigger();
    });
    $(window).on('closeSoftpage', function() {
        closeSoftpage();
    });


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Init close triggers

    */

    function initSoftpageCloseTrigger() {

        // init
        var $modal_close_toggles = $('.close-softpage,[data-close-softpage]');
        // look for triggers
        if ($modal_close_toggles.length > 0) {
            $modal_close_toggles.each(function(){
                // init
                var $toggle = $(this);
                $toggle.on('click', function(e) {
                    e.preventDefault();
                    softpage.closeSoftpage();
                });
            });
        }
    }

    // custom event
    $(window).on('initSoftpageCloseTrigger', function() {
        initSoftpageCloseTrigger();
    });

});
