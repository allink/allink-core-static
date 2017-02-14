/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Link with class '.toggle-form-modal' will trigger the form lightbox

*/

import serialize from 'form-serialize';
import tingle from 'tingle.js';

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
            setTimeout(function(){
                $(window).trigger('initDatepicker');
            },1000);
        }
    });

    // function handle_form($the_form) {
        // var $tel = $the_form.find('#id_telephone').parents('.form-group');
        // var $email = $the_form.find('#id_email').parents('.form-group');
        // var $dateTime = $the_form.find('#id_date').parents('.form-group');
        // var $contactTypeField = $the_form.find('#id_contact_type');
        // var updateFields = function() {
        //     // show tel option
        //     if($contactTypeField.val() == 10) {
        //         $tel.show();
        //         $dateTime.show();
        //         $email.hide();
        //     }
        //     // show email option
        //     else if($contactTypeField.val() == 20) {
        //         $tel.hide();
        //         $dateTime.hide();
        //         $email.show();
        //     }
        //     // no option (hide everything)
        //     else {
        //         $dateTime.hide();
        //         $tel.hide();
        //         $email.hide();
        //     }
        // };

        // var init_select = function($the_form,$contactTypeField) {
        //     // change option
        //     $the_form.on('change', $contactTypeField, function() {
        //         updateFields();
        //     });
        // };

        // initial update
        // updateFields();
        // init_select($the_form,$contactTypeField);
    //
    // }

    // function handle_contact_type_select($the_form,url) {
    //
    //     $the_form.on('submit', function(event){
    //         var $this = $(this);
    //         var postData = $this.serialize();
    //         $.ajax({
    //             type: "POST",
    //             url : url,
    //             data : postData,
    //             success:function(data, textStatus, jqXHR) {
    //                 form_modal.setContent(data);
    //                 var $the_form = $('.form-modal').find('form');
    //                 handle_form_submit($the_form);
    //                 handle_contact_type_select($the_form,url);
    //                 $(window).trigger('initDatepicker');
    //                 $(window).trigger('initFormModalClose');
    //             },
    //             error: function(jqXHR, textStatus, errorThrown) {
    //                 //if fails
    //             }
    //         });
    //         event.preventDefault();
    //     });
    // }
    function handle_form_submit($the_form,url) {

        $the_form.on('submit', function(event){
            var $this = $(this);
            var postData = $this.serialize();
            console.log(postData);
            $.ajax({
                type: "POST",
                url : url,
                data : postData,
                success:function(data, textStatus, jqXHR) {
                    form_modal.setContent(data);
                    var $the_form = $('.form-modal').find('form');
                    handle_form_submit($the_form, url);
                    $(window).trigger('initFormModalClose');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //if fails
                }
            });
            event.preventDefault();
        });
    }

    // click handler
    function open_form_modal_handler(element,event) {
        event.preventDefault();

        document.querySelector('html').classList.add('form-modal-visible');

        // get and set content
        var url = element.getAttribute('href');

        $.get(url, function(data) {
            // open modal
            form_modal.setContent(data);
            form_modal.open();
            var $the_form = $('.form-modal').find('form');

            // handle_form($the_form);
            handle_form_submit($the_form,url);
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
