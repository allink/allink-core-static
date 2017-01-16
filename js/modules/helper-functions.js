/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Get the closest matching element up the DOM tree.

@param  {Element} elem     Starting element
@param  {String}  selector Selector to match against
@return {Boolean|Element}  Returns null if not match found

https://gomakethings.com/ditching-jquery/#climb-up-the-dom

*/

export function getClosest( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;

};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Turning a node list into an array

*/

export function nodeListToArray(node_list) {
    let array_list = [];
    for(let i  = 0; i < node_list.length; i++) {
        array_list.push(node_list[i]);
    }
    return array_list;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Count an objects properties

*/

export function countObjectProperties(obj) {
    return Object.keys(obj).length;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Execute function delayed (such as scroll events)

Inspiration: https://davidwalsh.name/javascript-debounce-function

*/

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


