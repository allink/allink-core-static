/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Make newsletter advanced form collapse

May need these styles in project:

.site-footer {
    .collapse {
        display: none;
        &.in {
            display: block;
        }
    }
}

*/
$(function() {
    // Adjust footer map height accordingly
    const $footer = $('body>.site-footer');
    const $mapContainer = $footer.find('.map-container');
    const footerDefaultHeight = $footer.outerHeight();

    function initCollapse() {
        $('.mailchimp-group-item [data-collapse-toggle]').on('click', function(e) {
            e.preventDefault();
            const $collapse = $(this).parents('.mailchimp-group-item').find('.collapse');

            if ($collapse.hasClass('in')) {
                $collapse.removeClass('in');
                if ($mapContainer) {
                    $mapContainer.height(footerDefaultHeight);
                }
            } else {
                $collapse.addClass('in');
                if ($mapContainer) {
                    $mapContainer.height($footer.outerHeight());
                }
            }
        });
    }

    $(window).on('softpage:opened', function() {
        initCollapse();
    });

    initCollapse();
});
