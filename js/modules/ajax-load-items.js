/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Loading items using AJAX

Supported functionality:

- Replacing all items (use case: switching category)
- Appending items (use case: load more)

To make the "Load Items" functionality work, it REQUIRES the following elements:

<!-- Section container -->
<div class="content-section app-content-plugin">
    <!-- Categories -->
    <ul class="app-content-categories">
        <li>
            <a class="ajax-load-items" href="{{AJAX_URL}}">Category 1</a>
        </li>
        <li>
            <a class="ajax-load-items" href="{{AJAX_URL}}">Category 2</a>
        </li>
    </ul>
    <!-- The actual container where the items are to be exchanged, or appended to -->
    <div class="ajax-items-container">
        ...
    </div>
    <!-- Load More Button -->
    <div class="load-more-container">
        <a href="{{ next_page_url }}" class="ajax-load-items append">
            Load More
        </a>
    </div>
</div>

*/


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Initialize the app content filter and listen for the change event

Next, determine the active category and call the `loadAjaxItems` function
as simulation it was the trigger. 2 in 1!

*/

function initAjaxFilter(options) {
    // find and loop through filter containers
    $('.filter-container').each(function(){
        var $filter_container = $(this);
        var $plugin_container = $(this).parents('.app-content-plugin');
        // find all selects and loop
        $(this).find('select').each(function(){
            // when a filter (select) is changed:
            $(this).change(function(e){
                // combined with categories?
                var $category_container = $plugin_container.find('.app-content-categories');
                if ($category_container.length > 0) {
                    var $active_category = $category_container.find('.active a');
                    loadAjaxItems($active_category, options);
                }
                // only filters: in this case, our filter-container is the trigger
                else {
                    loadAjaxItems($filter_container, options);
                }

            });
        });
    });
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Function that appends the filters values (= selected options) to the active category

*/

function appendFilterToURL(ajax_url,$filter_container) {
    $filter_container.find('select').each(function(){
        var selected_value = $(this).find('option:selected').val();
        if (selected_value) {
            // determine field name
            var field_name = $(this).attr('name');
            //
            ajax_url += '&' + field_name + '=' + selected_value;
        }
    });
    return ajax_url;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Function that searches for elements

*/

export function initAjaxLoadItemsTrigger(options) {

    // initialize options
    var options = options || {};

    // find links and load items
    $('.ajax-load-items').each(function(){
        // init
        var $trigger = $(this);
        var initialized_attr = 'data-trigger-initialized';
        // check for initialized trigger
        var trigger_initialized = $trigger.attr(initialized_attr);

        // NOT initialized yet
        if (typeof trigger_initialized === 'undefined') {
            // add event listener
            $trigger.on('click',function(e){
                // init
                var $trigger = $(this);
                // let me handle this ;)
                e.preventDefault();
                // special case 1: adios, when clicking on a category that is already active.
                if ($trigger.parent('li').hasClass('active')) {
                    return false;
                }
                // special case 2: the dynamic grid (masonry.js) handles appending items by itself
                if ($trigger.parents('.grid_dynamic-template').length > 0) {
                    return false;
                }
                // default
                else {
                    loadAjaxItems($trigger,options);
                }
            });
            // mark as initialized
            $trigger.attr(initialized_attr,'');
        }
    });

    // init the filter switch
    initAjaxFilter(options);

}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Function that loads the new or appended items

@param $trigger: The clicked link (either 'load more' or a 'category' in the category navigation)
@param (optional) masonry_grid: Vanilla JS Node item of the masonry grid
@param (optional) masonry_instance: Masonry Instance

*/

export function loadAjaxItems($trigger,options,masonry_grid,masonry_instance) {

    // initialize options
    var options = options || {};

    // init
    var masonry_grid = masonry_grid || null,
        masonry_instance = masonry_instance || null,
        ajax_url = $trigger.attr('href'),
        ajax_filter_base_url = $trigger.attr('data-ajax-filter-base-url'),
        $plugin_container = $trigger.parents('.app-content-plugin'),
        $filter_container = $plugin_container.find('.filter-container'),
        $items_container = $plugin_container.find('.ajax-items-container'),
        $category_container = $trigger.parents('.app-content-categories'),
        $load_more_container = $plugin_container.find('.load-more-container'),
        $load_more_btn = $load_more_container.find('.btn-load-more'),
        category_active_class = 'active',
        loading_class = 'loading',
        append = false,
        transtion_duration = options.ajax_load_transition_duration || 100; // has to be equal SCSS variable $load-more-swop-category-transition-duration

    // Per default, we replace all items. But if an additional class '.append' is set on the trigger element, we obviously append items (load more)
    if( $trigger.hasClass('append')) {
        append = true;
    }else {
        $items_container.addClass(loading_class);
        $load_more_container.addClass(loading_class);
    }

    // are we browsing through the categories? if so, set active state
    if( $category_container.length > 0) {
        // remove all active classes
        $category_container.find('li').removeClass(category_active_class);
        // set active class on clicked element
        $trigger.parents('li').addClass(category_active_class);
    }

    // with disabled categories we don't get a href, which mean we get a base url from the filter-container
    if (typeof ajax_url === 'undefined') {
        ajax_url = ajax_filter_base_url;
    }

    // append filter values to URL
    ajax_url = appendFilterToURL(ajax_url,$filter_container);

    $.ajax({
        type: 'GET',
        url: ajax_url,
        contentType: 'application/json',
        success: function(data, textStatus, jqXHR) {

            // init
            var final_transition_duration = 0;

            // duration of CSS transition when EXCHANGING the content
            if (append === false) {
                final_transition_duration = transtion_duration;
            }

            // depending on the CSS transition settings, do stuff with or without delay
            setTimeout(function(){

                // temporary quick and dirty fix: toggle class on plugin container if the response contains the string 'no-results-container'
                if (jqXHR.status === 206) {
                    $plugin_container.addClass('no-results');
                }else {
                    $plugin_container.removeClass('no-results');
                }

                // masonry grid: requires different appending technique
                if (masonry_instance !== null) {
                    getRenderedContent(masonry_grid, masonry_instance, data.rendered_content, append);
                }
                // default
                else {
                    // append
                    if (append === true) {
                        $items_container.append(data.rendered_content);
                    }
                    // exchange entire content
                    else {
                        $items_container.html(data.rendered_content);
                    }
                }

                // load more button: hide if there are no further pages
                if( !data.next_page_url || data.next_page_url === null) {
                    $load_more_container.hide();
                }
                // load more buton: modify the link and make sure the button is shown
                else {
                    $load_more_container.show();
                    $load_more_btn.attr('href',data.next_page_url);
                }

                // trigger custom events
                $(window).trigger('initSoftpageTrigger');
                $(window).trigger('btnAjaxLoaderDone');
                $(window).trigger('ajaxLoadItems:success');
                // reveals next section in case there are no results when filtering
                $(window).trigger('initOnScreen');

                // remove loading class
                $items_container.removeClass(loading_class);
                $load_more_container.removeClass(loading_class);

            },final_transition_duration);
        },
        error: function(xhr, status, error) {
            var err = "(" + xhr.responseText + ")";
            $(window).trigger('ajaxLoadItems:error');
        }
    });

}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Masonry (Grid Dynamic) exchanging/appending items

@param masonry_grid: Vanilla JS Node item of the masonry grid
@param masonry_instance: Masonry Instance
@param rendered_content: Items markup as a STRING
@param append: Boolean value, if we should append or exchange items

*/

function getRenderedContent(masonry_grid, masonry_instance, rendered_content, append) {

    // init
    var grid_items_array = [];
    var i = 0;
    var fragment = document.createDocumentFragment();

    // create and fill tempoary container with our items markup
    var tmp_container = document.createElement('div');
    tmp_container.innerHTML = rendered_content;
    var tmp_grid_items = tmp_container.children;

    // fill our items array with the just created items
    for (var item of tmp_grid_items) {
        grid_items_array.push(item);
    }

    // add this markup to our fragment
    fragment.appendChild( tmp_container );

    // exchange items: remove all existing items first
    if( append === false ) {
        var items_to_be_removed = masonry_grid.querySelectorAll('.grid-item');
        for ( i = 0; i < items_to_be_removed.length; i++ ) {
            items_to_be_removed[i].remove();
        }
    }

    // append items
    masonry_grid.appendChild( fragment );
    masonry_instance.appended( grid_items_array );

    // Required delay: Redraw grid and re-calculate height
    setTimeout(function(){
        masonry_instance.layout();
    },10);
};
