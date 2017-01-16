import Masonry from 'masonry-layout';
import { getClosest } from './helper-functions';
import { loadAjaxItems } from './ajax-load-items';

export function initMasonry(options) {

    // initialize options
    var options = options || {};

    // initialize grid
    if(document.querySelector('.grid-dynamic-container')) {
        var grids_on_page = document.querySelectorAll( '.grid-dynamic-container' );

        var MasonryImagesReveal = function(masonry, items) {
            var itemSelector = masonry.options.itemSelector;

            var displayItem = function(index, items) {
                if (items.length <= index) {
                    return;
                }

                var item = items[index];

                masonry.element.appendChild(item);
                masonry.appended(item);
                displayItem(index + 1, items);

            };

            displayItem(0, items);

            return this;
        };

        for ( var i = 0, len = grids_on_page.length; i < len; i++ ) {

            // init
            var masonry_grid = grids_on_page[i].querySelector('.the-grid');
            var $content_section = $(masonry_grid).parents('.content-section');

            // instanciate grid
            var masonry_instance = new Masonry(masonry_grid, {
                columnWidth: '.grid-sizer',
                percentagePosition: true,
                transitionDuration: '0'
            });

            // handle AJAX requests (usually done with ajax-load-items.js, but masonry is a bit trickier so we handle it separately)
            $content_section.find('.ajax-load-items').on('click', function(e){

                // init
                var $trigger = $(this);
                e.preventDefault();

                // Do AJAX stuff
                loadAjaxItems($trigger, options, masonry_grid, masonry_instance);

            });

            // reveal Masonry Images
            new MasonryImagesReveal(
                masonry_instance,
                grids_on_page[i].querySelectorAll('.grid-items .grid-item')
            );

        }
    }

}
