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

*/

import SoftPage from 'softpage';
import request from 'superagent';
import { nodeListToArray } from './helper-functions';

$(function(){

    // init ajax form in softpage
    const init_ajax_form = function(target) {
        var form = target.modal.modalBox.querySelector('form')

        if (form){
            form.addEventListener('submit', (event)=> {
                event.preventDefault();
                // if a success url is defined it should be used otherwise go back to previous page
                try {
                    var success_url = event.currentTarget.querySelector('[name=success_url]').value;
                  } catch(e) {
                    var success_url = '.';
                  }

                request
                    .post(event.currentTarget.getAttribute('action'))
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('X-CSRFToken', event.currentTarget.querySelector('[name=csrfmiddlewaretoken]').value)
                    .type('form')
                    .send($(event.currentTarget).serialize())
                    .end((error, result) => {
                        if(result.statusCode == 200) {
                            target.modal.destroy();
                            if (typeof(Storage) !== "undefined") {
                                localStorage.setItem("message_to_push", "Deine Änderungen wurden gespeichert.");
                                localStorage.setItem("message_type", "success");
                            }

                            window.location = success_url;

                        }
                        else {
                            target.modal.setContent(result.body.html);
                            if(target.modal) {
                                let error_field = target.modal.modal.querySelector('.has-error');
                                if(error_field) {
                                    target.modal.modal.scrollTop = error_field.offsetTop - 20;
                                }
                            }
                            init_ajax_form(target);
                        }
                    }
                );
            });
        }
    }

    // init softpage in softpage
    const init_softpage_in_softpage = function(target) {
        var softpage_in_soft_page = target.modal.modalBox.querySelector('a[data-trigger-softpage]:not([data-softpage-disabled]), [data-trigger-softpage] a:not([data-softpage-disabled]')

        if (softpage_in_soft_page){
            softpage_in_soft_page.addEventListener('click', (event)=> {
                event.preventDefault();
                    // instantly toggle site overlay (improves "felt performance")
                    $(window).trigger('showSiteOverlay');
                    // load softpage
                    event.preventDefault();
                    soft_page.loadPage(event.currentTarget.href, true);
            });
        }
    }


    const soft_page = new SoftPage({
        onPageLoaded: function(obj) {
            // scroll to top everytime a softpage is opened
            document.querySelector('.tingle-modal').scrollTop = 0;
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
                $(window).trigger('initFormModalTrigger');
                $(window).trigger('initOnScreen');
                $(window).trigger('initiSwiperInstances');
            },50);
            // init forms on softpage
            init_ajax_form(obj);
            init_softpage_in_softpage(obj);
        },
        onSoftpageClosed: function (obj) {
            // hide site overlay
            $(window).trigger('hideSiteOverlay');
        }
    });


    function initSoftpageTrigger() {
        nodeListToArray(document.querySelectorAll('a[data-trigger-softpage]:not([data-softpage-disabled]), [data-trigger-softpage] a:not([data-softpage-disabled])')).map((value) => {
            value.addEventListener('click', (event) => {
                // instantly toggle site overlay (improves "felt performance")
                $(window).trigger('showSiteOverlay');
                // load softpage
                event.preventDefault();
                soft_page.loadPage(event.currentTarget.href, false);
            });
        });
    }


    // on page load
    initSoftpageTrigger();


    $(window).on('initSoftpageTrigger', function() {
        initSoftpageTrigger();
    });

});
