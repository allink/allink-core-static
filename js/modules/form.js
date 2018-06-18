$(function(){

    function initFormModifications(){

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Submit form from trigger (that is not an input type 'submit')

        */

        $('[data-submit-form]').on('click',function(e){
            // init
            e.preventDefault();
            var $trigger = $(this);
            // find and submit form
            $trigger.parents('form').submit();
        });


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        The maxlength attribute is being ignored on type="number" inputs. Let's make this work.

        */

        // find inputs with maxlength attribute
        var $maxlength_inputs = $('form').find('input[maxlength]');
        // loop elements and listen for key event
        $maxlength_inputs.each(function (e) {
            // init
            var $input = $(this);
            var maxlength = $input.attr('maxlength');
            // listen to relevant events
            $input.on('keydown', function(e) {
                return handleInputMaxlength(this,e,maxlength);
            });
            $input.on('focus', function(e) {
                return handleInputMaxlength(this,e,maxlength);
            });
            $input.on('click', function(e) {
                return handleInputMaxlength(this,e,maxlength);
            });
        });

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Disable scroll for input type "number" to prevent Chromium browsers change the value when scrolling

        */

        $('form').on('focus', 'input[type=number]', function (e) {
            $(this).on('mousewheel.disableScroll', function (e) {
                e.preventDefault();
            });
        });
        $('form').on('blur', 'input[type=number]', function (e) {
            $(this).off('mousewheel.disableScroll');
        });


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Custom File Upload

        Inspired by: http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

        */

        $( '.custom-file-upload' ).each( function() {
            var $container = $(this),
                $input = $container.find( 'input' ),
                $label = $container.find( 'label' ),
                labelVal = $label.html();

            $input.on( 'change', function( e ) {
                var fileName = '';

                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else if( e.target.value )
                    fileName = e.target.value.split( '\\' ).pop();

                if( fileName ) {
                    $container.addClass('file-selected');
                    $label.html( fileName );
                } else {
                    $label.html( labelVal );
                }
            });

            // Firefox bug fix
            $input
            .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
            .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
        });

    }

    function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = window.selection.createRange().text;
        }
        return text;
    }


    function handleInputMaxlength(input,e,maxlength) {
        // store key code
        var $input = $(input);
        var input_field = input;
        var key_code = parseInt(e.which);
        var current_number_of_characters = parseInt($input.val().length);
        var input_text_is_selected = false;
        // try to get selected text
        if (getSelectedText()) {
            input_text_is_selected = true;
        }
        // always accepted: key codes 8 until 46 are general keys like space, delete, backspace, arrows, ...
        if (key_code >= 8 && key_code <= 46 ) {
            // all good. keep going.
        }
        // any other system keys (and the COMMAND key of Macs)
        else if( e.altKey || e.ctrlKey || e.shiftKey || key_code == 91) {
            // all good. keep going.
        }
        // any other case should be checked
        else {
            // only block typing if NO text is selected
            if (input_text_is_selected === true) {
                // we're overwriting marked text, keep going!
            }else {
                // in case it's a character, make sure we respect the limit
                if (current_number_of_characters == maxlength) {
                    return false;
                }
            }
        }
    }

    // on page load
    initFormModifications();

    // custom event
    $(window).on('initFormModifications ajaxForm:success softpage:opened form-modal:opened', function() {
        initFormModifications();
    });

});
