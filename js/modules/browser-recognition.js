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
    const chrome = {
        label: gettext('Get Chrome'),
        url: 'https://www.google.com/chrome/',
    };
    let browserSuggestionList = options.browserSuggestionList || {
        windows: {
            [chrome.label]: chrome.url,
        },
        macos: {
            [chrome.label]: chrome.url,
        },
        linux: {
            [chrome.label]: chrome.url,
        },
    };


    const forceOverlay = location.search.match(/outdated/);
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies(validBrowserVersions);
    const userOS = browser.getOSName(true);

    const COOKIE_NAME = 'legacybrowser';
    const COOKIE_LIFETIME_IN_DAYS = 30;

    const overlayWindowList = document.getElementsByClassName('browser-suggestion');
    const btnListVisitAnyways = document.getElementsByClassName('js-use-legacy-browser');
    const browserList = document.querySelector('.browser-suggestion__list');

    const hasChosenLegacyBrowser = getCookieIsLegacyBrowser();

    function getSuggestedBrowserList() {
        return browserSuggestionList[userOS];
    }

    function visitPageAnyways(e) {
        e.preventDefault();
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
        document.body.classList.remove('tingle-enabled');

        overlayWindowList.forEach(overlay => {
            overlay.classList.add('hidden');
        });
    }

    function showOverlays() {
        document.body.classList.add('tingle-enabled');

        overlayWindowList.forEach(overlay => {
            overlay.classList.remove('hidden');
        });
    }

    function populateButtons(suggestions) {

        let html = '';
        let arrowIcon = `
            <i class="link-icon link-icon--right">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M13.091 0.398v4.571l10.724-0.002-23.793 23.793 3.232 3.233 23.793-23.793-0.002 10.724h4.571l0.002-18.527z"></path>
                </svg>
            </i>
        `;

        for (let browser in suggestions) {
            if (suggestions.hasOwnProperty(browser)) {
                html += `
                    <a href="${ suggestions[browser] }" class="btn btn-default browser-suggestion__btn-download" target="_blank" rel="noopener" role="button">
                        <span class="link-text">
                            <span>${ browser }</span>
                            ${ arrowIcon }
                        </span>
                        <span class="link-text-mask">
                            <span class="link-text-mask__inner">
                                <span>${ browser }</span>
                                ${ arrowIcon }
                            </span>
                        </span>
                    </a>
                `;
            }
        }

        browserList.innerHTML += html;
    }

    if (forceOverlay || !isValidBrowser && !hasChosenLegacyBrowser && browserSuggestionList.hasOwnProperty(userOS)) {
        showOverlays();
        populateButtons(getSuggestedBrowserList());
    }

    btnListVisitAnyways.forEach(btn => {
        btn.addEventListener('click', visitPageAnyways);
    });
};
