export function triggerClassOnScroll(options) {

    // init options
    if (!options.element) {
        console.error('triggerClassOnScroll: No element set');
    }

    // init vars
    let class_to_trigger = options.class_to_trigger,
        scroll = options.scroll || 0,
        element = options.element;

    let scrollPos = window.pageYOffset;
    let ticking = false;

    // handler
    function scrollHandler() {
        if (scrollPos >= scroll && !$(element).hasClass(class_to_trigger)) {
            $(element).addClass(class_to_trigger);
        }
        else if (scrollPos < scroll && $(element).hasClass(class_to_trigger)) {
            $(element).removeClass(class_to_trigger);
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(scrollHandler);
            ticking = true;
        }
    }

    // on page load
    scrollHandler();

    // on scroll
    window.addEventListener('scroll', () => {
        scrollPos = window.pageYOffset;
        requestTick();
    });

    return this;
}
