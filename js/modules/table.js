/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Responsive tables

Add indicator when the table can be scrolled (usually on mobile)

*/

export function initTableModifications() {

    $('.table-container').each(function(i){
        // init
        var $container = $(this);
        // determine container width
        var container_width = $container.outerWidth();
        // find table inside the container
        var $tables = $container.find('table');
        // there might be multiple tables
        $tables.each(function(i){
            // init
            var $table = $(this);
            // determine width and compare with container
            var table_width = $table.outerWidth();
            if (table_width > container_width) {
                $container.addClass('scrolling-enabled');
            }else {
                $container.removeClass('scrolling-enabled');
            }
        });
        var container_width = $container.outerWidth();
    });

}

$(function(){

    // on page load
    initTableModifications();

    // custom event
    $(window).on('initTableModifications viewportWidthHasChanged softpage:opened default-modal:opened form-modal:opened', function() {
        initTableModifications();
    });

    // re-init after cms page refresh
    if (window.CMS) {
        CMS.$(window).on('cms-content-refresh', () => {
            initTableModifications();
        });
    }

});
