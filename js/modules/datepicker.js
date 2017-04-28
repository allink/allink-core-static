/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Datepicker

We use the package "Flatpickr"

Docs: https://chmln.github.io/flatpickr/
Options: https://chmln.github.io/flatpickr/#options

IMPORTANT:

All of the string/boolean config options can also be supplied using data attributes, e.g. data-min-date, data-default-date, data-date-format etc.

*/

import Flatpickr from 'flatpickr';

// Let's load and add the most common languages
import German from 'flatpickr/dist/l10n/de';
import French from 'flatpickr/dist/l10n/fr';
import Italian from 'flatpickr/dist/l10n/it';
import Spanish from 'flatpickr/dist/l10n/es';

function initDatepicker() {

    // Extend the existing localization object with additional langugaes

    // German
    Flatpickr.l10ns.de = German.de;
    Flatpickr.l10ns.de.firstDayOfWeek = 1; // Our week starts with Monday

    // French
    Flatpickr.l10ns.fr = French.fr;
    Flatpickr.l10ns.fr.firstDayOfWeek = 1; // Our week starts with Monday

    // Italian
    Flatpickr.l10ns.it = Italian.it;
    Flatpickr.l10ns.it.firstDayOfWeek = 1; // Our week starts with Monday

    // Spanish
    Flatpickr.l10ns.es = Spanish.es;
    Flatpickr.l10ns.es.firstDayOfWeek = 1; // Our week starts with Monday

    // determine currently active language
    var active_lang = document.querySelector('html').getAttribute('lang');
    // fallback lang
    if (!active_lang) {
        active_lang = 'en';
    }

    // Define options
    var options = {
        locale: active_lang, // IMPORTANT: We're gonna select the language according to the "lang" attribute of the <html> element
        altInput: true,
        altInputClass: 'form-control datepicker-rendered',
        disableMobile: true,
        altFormat: 'D, j. F Y',
        clickOpens: true,
        allowInput: false,
        dateFormat: 'Y-m-d',
        minDate: 'today',
        wrap: false,
    };

    // find datepicker elements and loop!
    var datepicker_elements = document.querySelectorAll('.datepicker');
    if(datepicker_elements.length > 0) {
        for (var i = 0; i < datepicker_elements.length; i++) {
            var element = datepicker_elements[i];
            var flatpickr_instance = new Flatpickr(element,options);
        }
    }

}

$(function(){

    // on page load
    initDatepicker();

    // custom event
    $(window).on('initDatepicker softpage:opened form-modal:opened', function() {
        initDatepicker();
    });

});
