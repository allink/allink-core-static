export function triggerClassOnScroll(options) {

    // init options
    if (!options.element) {
        console.error('triggerClassOnScroll: No element set');
    }

    // init vars
    let class_to_trigger = options.class_to_trigger,
        scroll = options.scroll || 0,
        element = options.element;

    // handler
    var scrollHandler = function(){
        if(window.pageYOffset >= scroll && !$(element).hasClass(class_to_trigger)) {
            $(element).addClass(class_to_trigger);
        }
        else if(window.pageYOffset < scroll && $(element).hasClass(class_to_trigger)) {
            $(element).removeClass(class_to_trigger);
        }
    }

    // on page load
    scrollHandler();

    // on scroll
    window.addEventListener('scroll', scrollHandler );

    return this;
}
