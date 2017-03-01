/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class '.toggle-form-modal' will trigger the form lightbox

*/

import serialize from 'form-serialize';
import tingle from 'tingle.js';
import request from 'superagent';

$(function(){

    // initialize modal
    var form_modal = new tingle.modal({
        cssClass: ['form-modal'],
        onClose: function() {
            close_form_modal_handler();
            // trigger custom events
            $(window).trigger('hideSiteOverlay');
        },
        onOpen: function(){
            $(window).trigger('initFormModalClose');
        }
    });

    function handle_form_submit(form_modal) {

        var form = form_modal.modalBox.querySelector('form')
        console.log(form_modal);
        console.log(form);

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
                            form_modal.destroy();
                            window.location = success_url;

                        }
                        else {
                            console.log('POST FAIL');
                            form_modal.setContent(result.body.html);
                            handle_form_submit(form_modal);
                        }
                    }
                );
            });
        }
    }

    // click handler
    function open_form_modal_handler(element,event) {
        event.preventDefault();

        document.querySelector('html').classList.add('form-modal-visible');
        document.querySelector('.softpage').classList.remove('tingle-modal--visible');

        // get and set content
        var url = element.getAttribute('href');

        $.get(url, function(data) {
            // open modal
            form_modal.setContent(data);
            form_modal.open();
            var $the_form = $('.form-modal').find('form');

            // handle_form($the_form);
            handle_form_submit(form_modal);
            $(window).trigger('initFormModalClose');
            setTimeout(function(){
                // $(window).trigger('initDatepicker');
                $(window).trigger('initFormModalTrigger');
            },1500);
        });

        // add functionality to close the modal with the ESCAPE key
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key == "Escape";
            } else {
                isEscape = evt.keyCode == 27;
            }
            if (isEscape) {
                form_modal.close();
            }
        };
    }

    function close_form_modal_handler() {
        document.querySelector('html').classList.remove('form-modal-visible');
    }

    function initFormModalTrigger(){
        if(document.querySelector('.toggle-form-modal')) {
            var form_modal_elements = document.querySelectorAll('.toggle-form-modal');
            for (var i = 0; i < form_modal_elements.length; i++) {
                form_modal_elements[i].addEventListener('click', function(event) {
                    // instantly toggle site overlay (improves "felt performance")
                    $(window).trigger('showSiteOverlay');
                    // open modal
                    open_form_modal_handler(this,event);
                });
            }
        }
    }

    // on page load
    initFormModalTrigger();
    // custom event
    $(window).on('initFormModalTrigger', function() {
        initFormModalTrigger();
    });

    function initFormModalClose() {
        if (document.querySelector('.close-form-modal')) {
            var close_form_modal = document.querySelector('.close-form-modal');
            close_form_modal.addEventListener('click', function(event) {
                event.preventDefault();
                form_modal.close();
            });
        }
    }

    // custom event
    $(window).on('initFormModalClose', function() {
        initFormModalClose();
    });

});
