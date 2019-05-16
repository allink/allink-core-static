/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

OnScreen - Does stuff when an element is on screen.

https://github.com/silvestreh/onScreen

*/

import OnScreen from 'onscreen';

export function setupOnScreen(options) {

    const os = new OnScreen(options);

    // Do something when an element enters the viewport
    os.on('enter', '[data-scroll-spy]', (element) => {
        // init
        addEffectClass(element);
    });
}

export function addEffectClass(element) {
    let effect_prefix = 'on-screen-';
    let effect_type = element.getAttribute('data-scroll-spy');
    // set class if effect type is set
    if (effect_type != '') {
        let effect_class = effect_prefix + effect_type;
        element.classList.add(effect_class);
    }
}
