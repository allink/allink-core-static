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

            // obj.modal.modal.classList.add('small');
            // scroll to top everytime a softpage is opened
            obj.modal.modal.scrollTop = 0;
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
                    console.warn('Softpage is missing #softpage-page-title.');
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
        },
    });


    function initSoftpageTrigger() {
        // init all softpage trigger links and loop
        // 1. Text Editor > All links that should trigger a softpage (added by e.g. button link plugin)
        // 2. App Content > If the Softpage option is enabled.
        $('a[data-trigger-softpage]:not([data-softpage-disabled]), [data-trigger-softpage] a:not([data-softpage-disabled])').each(function(i) {
            // stop multiple event listeners from firing multiple times by removing (off()) and adding (on()) the event listener
            $(this).
                off('click').
                on('click',
                function(event){
                    // init
                    var softpage_content_id = '';
                    var href = event.currentTarget.href;
                    // optional: use a node's content instead of href-attribute
                    var softpage_content_id = $(this).attr('data-softpage-content-id');
                    // optional: get softpage variation string and set attribute
                    var softpage_variation = $(this).attr('data-softpage-variation');
                    if (softpage_variation) {
                        $('.tingle-modal.softpage').attr('data-softpage-variation', softpage_variation);
                    }
                    // instantly toggle site overlay (improves "felt performance")
                    $(window).trigger('showSiteOverlay');
                    // load softpage
                    event.preventDefault();
                    softpage.loadPage(href, true, softpage_content_id);
                }
            );
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

});
