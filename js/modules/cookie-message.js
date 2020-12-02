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
            messageBox.classList.remove('hidden');
        }

        closeButton.addEventListener('click', () => {
            storage.setItem('isCookieAccepted', '1');
            messageBox.classList.add('hidden');
        });
    }
}
