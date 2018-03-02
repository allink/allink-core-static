/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Toggles the .site-overlay visibility

This feature can be used in 2 ways:

1. Calling the custom event from another script.
2. Defining a custom toggle settings the 'data-trigger-site-overlay' attribute.

Per default, a click on the .site-overlay doesn't to anything.

If you want to enable the 'click close', pass the parameter 'false'
to the function, or add an additional 'data-site-overlay-click-close'
attribute to the custom toggle.

Usage:

// default: click close disabled
$(window).trigger('showSiteOverlay');
// click close ENABLED
$(window).trigger('showSiteOverlay', [true]);

Custom Events:

site-overlay:visible
site-overlay:hiding
site-overlay:hidden
site-overlay:click-closed

*/

export function showSiteOverlay(click_close_enabled) {
    // init
    var $site_overlay = $('.site-overlay');
    // helper class in case we need to modify any other elements if the site-overlay is visible
    $('html').addClass('site-overlay-visible');
    // make overlay visible
    $site_overlay.addClass('visible');
    // animating
    setTimeout(function(){
        $site_overlay.addClass('animating');
    },0);
    // enable click close
    if (click_close_enabled) {
        $site_overlay.addClass('click-close-enabled');
    }
    // trigger custom event
    $(window).trigger('site-overlay:visible');
}

export function hideSiteOverlay() {
    // init
    var $site_overlay = $('.site-overlay');
    var site_overlay = $site_overlay.get(0);
    // helper class in case we need to modify any other elements if the site-overlay is visible
    $('html').removeClass('site-overlay-visible');
    // remove classes
    $site_overlay.removeClass('animating');
    $site_overlay.removeClass('click-close-enabled');
    // trigger custom event
    $(window).trigger('site-overlay:hiding');
    // delayed event trigger
    setTimeout(function(){
        $site_overlay.removeClass('visible');
        // trigger custom event
        $(window).trigger('site-overlay:hidden');
    },300);
}

$(function(){

    // find site overlay triggers
    if(document.querySelectorAll('[data-trigger-site-overlay]')) {
        var site_overlay_trigger_elements = document.querySelectorAll('[data-trigger-site-overlay]');
        for (var i = 0; i < site_overlay_trigger_elements.length; i++) {
            site_overlay_trigger_elements[i].addEventListener('click', function(event) {
                // in some cases, we might NOT want that an overlay can be closed by clicking on it. in this case an additional data attribute has to be set
                var click_close_enabled = false;
                if (this.hasAttribute('data-site-overlay-click-close')) {
                    click_close_enabled = true;
                }
                showSiteOverlay(click_close_disabled);
            });
        }
    }

    $('.site-overlay').on('click',function(){
        if ($(this).hasClass('click-close-enabled')) {
            hideSiteOverlay();
            // trigger custom event
            $(window).trigger('site-overlay:click-closed');
        }
    });

    // custom events
    $(window).on('showSiteOverlay', function(event,click_close_enabled=false) {
        showSiteOverlay(click_close_enabled);
    });
    $(window).on('hideSiteOverlay', function() {
        hideSiteOverlay();
    });

});
