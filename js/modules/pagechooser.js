function initPageChooser() {
    // select topics drodown (important: we need to select the actual <select> element in order to get the value, not the dropdown)
    var $pagechooser_dropdown = $('.pagechooser-plugin__dropdown.selectpicker');
    // listen for the change event and open the URL
    $pagechooser_dropdown.on('change', function (e) {
        var href = $(this).val();
        window.location.href = href;
    });
}

$(function(){

    // on page load
    initPageChooser();

    // custom event
    $(window).on('initPageChooser',function(){
        initPageChooser();
    });

});
