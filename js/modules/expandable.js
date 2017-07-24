/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Super Simple Expandable Plugin

===

Using a link trigger:

<a
    href="#"
    data-expandable-trigger
    data-expandable-trigger-default-text="Show"
    data-expandable-trigger-active-text="Hide"
    data-expandable-container-selector=".test"
    >
    Show
</a>

===

Using in an other module:

import { expandContainer, collapseContainer } from 'allink-core-static/js/modules/expandable';
...
var $container = $('.example-container');
...
expandContainer($container);
...
collapseContainer($container);

===

Custom events:

expandable:triggered

*/

export function collapseContainer($container) {
    // init
    var expanded_class = 'expandable--expanded';
    // warn if class is missing
    if ($container.hasClass('expandable') === false) {
        console.warn('The following element can not be expanded/collapsed because of a missing "expandable" class:')
        console.log( $container );
    }
    // otherwise, continue
    else {
        $container.css('height','');
        $container.removeClass(expanded_class);
    }
}

export function expandContainer($container) {
    // init
    var expanded_class = 'expandable--expanded';
    // warn if class is missing
    if ($container.hasClass('expandable') === false) {
        console.warn('The following element can not be expanded/collapsed because of a missing "expandable" class:')
        console.log( $container );
    }
    // otherwise, continue
    else {
        var container_height = $container.attr('data-height');
        $container.css('height',container_height);
        $container.addClass(expanded_class);
    }
}

export function initExpandableTrigger(){
    // init all trigger links and loop
    $('[data-expandable-trigger]').each(function(i) {
        // stop multiple event listeners on the same element by adding an initialized attribute that we can check the next time we call this function
        // init
        var $trigger = $(this);
        var initialized_attr = 'data-trigger-initialized';
        // check for initialized trigger
        var trigger_initialized = $trigger.attr(initialized_attr);
        // NOT initialized yet
        if (typeof trigger_initialized === 'undefined') {
            $trigger.
                on('click',
                function(e){
                    // init
                    e.preventDefault();
                    var $trigger = $(this);
                    // get container selector and select element
                    var container_selector = $trigger.attr('data-expandable-container-selector');
                    var $container = $(container_selector);
                    // only continue if container exists
                    if ($container.length > 0) {
                        // triggered already? nope
                        var trigger_active = $trigger.attr('data-expandable-trigger-active');
                        if (typeof trigger_active === 'undefined') {
                            // set trigger as active
                            $trigger.attr('data-expandable-trigger-active', '');
                            // swop text
                            var active_text = $trigger.attr('data-expandable-trigger-active-text');
                            $trigger.html(active_text);
                            // expand container
                            expandContainer($container);
                        }
                        // has been triggered already
                        else {
                            $trigger.removeAttr('data-expandable-trigger-active');
                            // swop text
                            var default_text = $trigger.attr('data-expandable-trigger-default-text');
                            $trigger.html(default_text);
                            // collapse container
                            collapseContainer($container);
                        }
                    }
                    // custom event
                    $(window).trigger('expandable:triggered');
                }
            );
            // mark as initialized
            $trigger.attr(initialized_attr,'');
        }
    });
}

export function setExpandableHeight() {
    $('.expandable--expanded').each(function(){
        var $container = $(this);
        var $content = $container.find('.expandable__content');
        var container_height = $content.outerHeight(true); // 'true': includes margin
        $container.css('height',container_height);
    });
}

export function initExpandable() {
    $('.expandable').each(function(){
        var $container = $(this);
        var $content = $container.find('.expandable__content');
        var container_height = $content.outerHeight(true); // 'true': includes margin
        $container.attr('data-height',container_height);
    });
}

$(function(){

    initExpandable();
    initExpandableTrigger();

    // re-calculate container height
    $(window).on('initExpandable viewportWidthHasChanged',function(){
        initExpandable();
        initExpandableTrigger();
    });

});
