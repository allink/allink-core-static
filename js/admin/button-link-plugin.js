function toggleButtonOptions(type) {
    // init
    const btnType = type || $('.button-link-plugin .field-type input:checked').val();
    const $btnVariations = $('.field-btn_context');
    const $btnSizes = $('.field-btn_size');
    const $textLinkVariations = $('.field-txt_context');

    if (btnType === 'btn') {
        $btnVariations.show();
        $btnSizes.show();
        $textLinkVariations.hide();
    }
    else if (btnType === 'lnk') {
        $textLinkVariations.show();
        $btnVariations.hide();
        $btnSizes.hide();
    }
    else {
        $textLinkVariations.hide();
        $btnVariations.hide();
        $btnSizes.hide();
    }
}

function setActiveStateButtonOptions($trigger) {
    // remove active class of any siblings
    $trigger.siblings().removeClass('active');
    // and add the active class
    $trigger.addClass('active');
}

$(() => {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Watch out for changes on the link type

    */

    $('.button-link-plugin .field-type input').on('change', function () {
        // init
        const type = $(this).val();
        // toggle!
        toggleButtonOptions(type);
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Set active state on selected element

    */

    $('.button-link-plugin [data-toggle-active-state]').on('click', function () {
        // init
        const $trigger = $(this);
        setActiveStateButtonOptions($trigger);
    });

    // on page load
    toggleButtonOptions();
});
