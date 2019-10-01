/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Recognises a clients browser, browser-version and OS.

If an outdated or not supported browser is used,
an overlay is shown to the user.

The overlay contains browser suggestions dependent on users OS
and provides links to the specific browsers download site.

Use this table to figure out which browser versions you want to support:
https://caniuse.com/usage-table

Bowser:
https://github.com/lancedikson/bowser/blob/HEAD/src/constants.js

*/

import Bowser from "bowser";

export function initBrowserCheck(options={}) {

    // valid browsers and their version nrs
    let validBrowserVersions = options.validBrowserVersions || {
        firefox: ">66",
        safari: ">11",
        chrome: ">74",
        edge: ">16",
    };

    // browser names and the link to their download site, categorised by OS
    let browserSuggestionList = options.browserSuggestionList || {
        'windows': {
            'Chrome': 'https://www.google.com/chrome/'
        },
        'macos': {
            'Chrome': 'https://www.google.com/chrome/'
        },
        'linux': {
            'Chrome': 'https://www.google.com/chrome/'
        }
    };

    const forceOverlay = location.search.match(/outdated/);
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies(validBrowserVersions);
    const userOS = browser.getOSName(true);

    const COOKIE_NAME = 'legacybrowser';
    const COOKIE_LIFETIME_IN_DAYS = 30;

    const overlayWindowList = document.querySelectorAll('.browser-suggestion');
    const btnListVisitAnyways = document.querySelectorAll('.js-use-legacy-browser');
    const browserList = document.querySelector('.browser-suggestion__list');

    const hasChosenLegacyBrowser = getCookieIsLegacyBrowser();

    function getSuggestedBrowserList() {
        return browserSuggestionList[userOS];
    }

    function visitPageAnyways() {
        setCookieIsLegacyBrowser();
        hideOverlays();
    }

    function setCookieIsLegacyBrowser() {
        let date = new Date();
        date.setTime(date.getTime() + (COOKIE_LIFETIME_IN_DAYS*24*60*60*1000));
        let expires = "; expires=" + date.toUTCString();

        document.cookie = COOKIE_NAME + "=" + 1 + expires + "; path=/";
    }

    function getCookieIsLegacyBrowser() {
        let value = document.cookie.match(`(^|;) ?${ COOKIE_NAME }=([^;]*)(;|$)`);
        return value ? value[2] : null;
    }

    function hideOverlays() {
        overlayWindowList.forEach(overlay => {
            overlay.classList.add('hidden');
        });
    }

    function showOverlays() {
        overlayWindowList.forEach(overlay => {
            overlay.classList.remove('hidden');
        });
    }

    function populateButtons(suggestions) {

        let html = '';

        for (let browser in suggestions) {
            if (suggestions.hasOwnProperty(browser)) {
                html += `
                    <a href="${ suggestions[browser] }" class="button-link-plugin__link  btn btn-default btn-md" target="_blank" rel="noopener" role="button">
                        <span class="button-link-plugin__text">
                            ${ browser }
                        </span>
                        <span class="btn__text--mask">
                            <span class="btn__text--mask__inner">
                                ${ browser }
                            </span>
                        </span>
                    </a>`
            }
        }
        browserList.innerHTML = html;
    }

    if (forceOverlay || !isValidBrowser && !hasChosenLegacyBrowser && browserSuggestionList.hasOwnProperty(userOS)) {
        showOverlays();
        populateButtons(getSuggestedBrowserList());
    }

    btnListVisitAnyways.forEach(btn => {
        btn.addEventListener('click', visitPageAnyways);
    });
};
