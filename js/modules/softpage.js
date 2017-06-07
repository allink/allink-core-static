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

    const softpage = new SoftPage({
        onPageLoaded: function(obj) {
            // scroll to top everytime a softpage is opened
            obj.modal.modal.querySelector('.tingle-modal-box').scrollTop = 0;
            // do stuff slighty delayed, so we get all the information we need
            setTimeout(function(){
                // init page meta
                var modal_url = obj.modal.modal.baseURI;
                var modal_page_title_element = obj.modal.modalBoxContent.querySelector('#softpage-page-title');
                var modal_page_title = '';
                // Info for developer, that #softpage-page-title is missing on the detail page
                if (modal_page_title_element != null) {
                    var modal_page_title = modal_page_title_element.textContent;
                }else {
                    // used during development phase, but no need anymore
                    // console.warn('Softpage is missing #softpage-page-title.');
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
                $(window).trigger('softpage:opened');
                $(window).trigger('initSoftpageTrigger');
                $(window).trigger('initOnScreen');
                $(window).trigger('initiSwiperInstances');
            },50);
        },
        onSoftpageClosed: function (obj) {
            // hide site overlay
            $(window).trigger('hideSiteOverlay');
            $(window).trigger('softpage:closed');
            // remove variation definition
            $(obj.modal.modal).removeAttr('data-softpage-variation');
            // remove any content (issue: video was still playing)
            $(obj.modal.modal).find('.tingle-modal-box__content').empty();
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

    // on page load
    initSoftpageTrigger();

    // custom events
    $(window).on('initSoftpageTrigger', function() {
        initSoftpageTrigger();
    });
    $(window).on('closeSoftpage', function() {
        closeSoftpage();
    });

    // clean up content when a CMS page is about to be displayed within a softpage
    $(window).on('softpage:opened',function(){
        // init
        var $softpage = $('.softpage');
        // check if CMS page attribute is set
        var $softpage_content_container = $softpage.find('.tingle-modal-box__content');
        var is_cms_page = $softpage.attr('data-cms-page');
        if (typeof is_cms_page !== 'undefined' && is_cms_page !== false) {
            // select/store the content we want to put inside the modal box content
            var $ajax_page_container = $softpage.find('.site-content').children();
            // empty the box content and append the just stored markup
            $softpage_content_container.empty().append($ajax_page_container);
        }
    });

});
