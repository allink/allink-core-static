import { debounce } from './helper-functions';

export function triggerClassOnScroll(options) {
    if (!options.element) {
        console.error('triggerClassOnScroll: No element set');
    }
    if (!options.debounce_delay) {
        options.debounce_delay = 20;
    }
    let class_to_trigger = options.class_to_trigger,
        scroll = options.scroll || 0,
        element = options.element;

    // delayed call of function in order to improve scroll-smoothness
    var scrollHandler = debounce(function() {
        if(window.scrollY >= scroll && !element.classList.contains(class_to_trigger)) {
            element.classList.add(class_to_trigger);
        }
        else if(window.scrollY < scroll && element.classList.contains(class_to_trigger)) {
            element.classList.remove(class_to_trigger);
        }
    }, options.debounce_delay);

    // on page load
    scrollHandler();

    // on scroll
    window.addEventListener('scroll', scrollHandler );

    return this;
}
