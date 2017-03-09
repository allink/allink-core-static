/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The SoftPage AJAX Trigger

All child anchor-tags (<a>) of an element with a 'data-trigger-softpage' attribute
will toggle a softpage.

This feature can optionally be activated in an 'App Content Plugin' in the 'Display Options'.

In some cases, not all links within a section should trigger a softpage. That's why
we added the 'data-softpage-disabled' attribute for those links.

Example:

<div class"example-container" data-trigger-softpage>
    <a href="#">I will trigger a softpage</a>
    <a href="#" data-softpage-disabled>I will NOT trigger a softpage</a>
</div>

Custom Events:

softpage:opened
softpage:closed

*/

import SoftPage from 'softpage';
import { nodeListToArray } from './helper-functions';

$(function(){

    const softpage = new SoftPage({
        onPageLoaded: function(obj) {
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
            },50);
        },
        onSoftpageClosed: function (obj) {
            // hide site overlay
            $(window).trigger('hideSiteOverlay');
            $(window).trigger('softpage:closed');
        }
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
                    // instantly toggle site overlay (improves "felt performance")
                    $(window).trigger('showSiteOverlay');
                    // load softpage
                    event.preventDefault();
                    softpage.loadPage(event.currentTarget.href, true);
                }
            );
        });
    }

    // on page load
    initSoftpageTrigger();

    $(window).on('initSoftpageTrigger', function() {
        initSoftpageTrigger();
    });

});
