$(function(){

    function initFormModifications(){

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        The maxlength attribute is being ignored on type="number" inputs. Let's make this work.

        */

        // find inputs with maxlength attribute
        var $maxlength_inputs = $('form').find('input[maxlength]');
        // loop elements and listen for key event
        $maxlength_inputs.each(function (e) {
            var $input = $(this);
            var maxlength = $input.attr('maxlength');
            $input.keydown(function(e) {
                // store key code
                var key_code = parseInt(e.which);
                var current_number_of_characters = parseInt($input.val().length);
                // key codes 8 until 46 are general keys like space, delete, backspace, arrows, ...
                if (key_code >= 8 && key_code <= 46) {
                    // can be pressed at all times
                }else {
                    // in case it's a character, make sure we respect the limit
                    if (current_number_of_characters == maxlength) {
                        return false;
                    }
                }
            });
        });

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Disable scroll for input type "number" to prevent Cromium browsers change the value when scrolling

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


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        Enable auto-expand on <textarea>-elements

        Applied globally on all textareas with the "data-auto-expand" attribute

        <textarea rows="3" ata-auto-expand></textarea>

        Inspiration: http://codepen.io/vsync/pen/frudD

        */

        // $(document)
        //     .one('input[data-auto-expand]', 'textarea[data-auto-expand]', function(){
        //         var savedValue = this.value;
        //         this.value = '';
        //         this.baseScrollHeight = this.scrollHeight;
        //         this.value = savedValue;
        //     })
        //     .on('input[data-auto-expand]', 'textarea[data-auto-expand]', function(){
        //         var minRows = this.getAttribute('rows')|0, rows;
        //         this.rows = minRows;
        //         rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        //         this.rows = minRows + rows;
        //     });
    }

    // on page load
    initFormModifications();

    // custom event
    $(window).on('initFormModifications', function() {
        initFormModifications();
    });

});
