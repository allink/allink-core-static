function toggleButtonOptions(type) {
    // init
    var type = type || $('.button-link-plugin .field-type input:checked').val();
    var $btn_variations = $('.field-btn_context');
    var $btn_sizes = $('.field-btn_size');
    console.log( type );
    if (type == 'btn') {
        $btn_variations.show();
        $btn_sizes.show();
    }else {
        $btn_variations.hide();
        $btn_sizes.hide();
    }
}

function setActiveStateButtonOptions($trigger) {
    // remove active class of any siblings
    $trigger.siblings().removeClass('active');
    // and add the active class
    $trigger.addClass('active');
}

$(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Watch out for changes on the link type

    */

    $('.button-link-plugin .field-type input').on('change',function(){
        // init
        var type = $(this).val();
        // toggle!
        toggleButtonOptions(type);
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Set active state on selected element

    */

    $('.button-link-plugin [data-toggle-active-state]').on('click',function(){
        // init
        var $trigger = $(this);
        setActiveStateButtonOptions($trigger);
    });


    // on page load
    toggleButtonOptions();

});
