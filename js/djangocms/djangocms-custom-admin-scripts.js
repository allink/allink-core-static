/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Toggle visibility of fieldset options depending on which
template has been selected.

*/

function toggle_option_group_visibility(selected_template) {

    // 'disable_when_' selectors
    $('fieldset').each(function(i){
        // init
        var $fieldset = $(this);
        // it's a match! Hide!
        if ($fieldset.hasClass('disable_when_'+selected_template)) {
            $fieldset.removeClass('show_options');
            $fieldset.addClass('hide_options');
        }
        // no match, make sure to remove the hide class
        if (!$fieldset.hasClass('disable_when_'+selected_template)) {
            $fieldset.removeClass('hide_options');
        }
    });

    // 'only_when_' selectors
    $('fieldset[class*="only_when"]').each(function(i){
        // init
        var $fieldset = $(this);
        // it's a match! Show!
        if ($fieldset.hasClass('only_when_'+selected_template)) {
            $fieldset.removeClass('hide_options');
            $fieldset.addClass('show_options');
        }
        // no match, make sure to remove the hide class
        else {
            $fieldset.removeClass('show_options');
            $fieldset.addClass('hide_options');
        }
    });

    // hide/show is visible, due to late execution via javscript.
    // After all the work is done, let's make the content visible.
    $('#content-main').addClass('visible');

}

$(function(){

    // selecting an app template: listen to the 'change' and and toggle visibility
    $('#id_template').on( 'change', function( e ) {
        toggle_option_group_visibility($(this).val());
    });

    // when loading the modal, get currently selected template and and toggle visibility
    toggle_option_group_visibility($('#id_template').val());

});
