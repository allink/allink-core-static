/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Cookie Message

*/

export function initCookieMessage(options) {
    const messageBox = document.querySelector('.js-cookie-message');
    const closeButton = messageBox.querySelector('.js-close-cookie-message');
    let storage;

    try {
        storage = window.localStorage;
    } catch(e) {
        // Access denied, storage full etc.
    }

    if (storage) {
        if (!storage.getItem('isCookieAccepted')) {
            messageBox.classList.remove('cookie-message--hidden');
        }

        closeButton.addEventListener('click', () => {
            storage.setItem('isCookieAccepted', '1');
            messageBox.classList.add('cookie-message--hidden');
        });

        // remove cookie message and spacer markup from DOM after the animation
        messageBox.addEventListener('transitionend', (e) => {
            if (messageBox.classList.contains('cookie-message--hidden') && e.propertyName === 'transform') {
                const spacer = messageBox.previousElementSibling;

                spacer.parentNode.removeChild(spacer);
                messageBox.parentNode.removeChild(messageBox);
            }
        });
    }
}
