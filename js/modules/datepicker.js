/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Datepicker

We use the package "Flatpickr"

Docs: https://chmln.github.io/flatpickr/
Options: https://chmln.github.io/flatpickr/#options

Available Attribute Options (Django Form):

date_time = forms.DateTimeField(
    label=_(u'Date and Time'),
    widget=forms.widgets.DateTimeInput(
        attrs={
            'placeholder': _(u'Please choose date and time'),
            'data-dateFormat': 'Y-m-d H:i',
            'data-altFormat': 'D, j. F Y, H:i',
            'data-minDate': str(datetime.date.today() - datetime.timedelta(days=180)),
            'data-maxDate': 'today',
            'data-enableTime': True,
            'data-noCalendar': True,
        }
    ),
)

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

    // find datepicker elements and loop!
    var datepicker_elements = document.querySelectorAll('.datepicker');
    if(datepicker_elements.length > 0) {
        for (var i = 0; i < datepicker_elements.length; i++) {

            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

            get custom options from the input's data-attribute or set default options

            */

            // TIME only
            var noCalendar = $(datepicker_elements[i]).attr('data-noCalendar');
            if (typeof noCalendar === 'undefined') {
                noCalendar = false;
            } else {
                noCalendar = true;
            }
            // date AND time
            var enableTime = $(datepicker_elements[i]).attr('data-enableTime');
            if (typeof enableTime === 'undefined') {
                enableTime = false;
            } else {
                enableTime = true;
            }
            // technical format
            var dateFormat = $(datepicker_elements[i]).attr('data-dateFormat');
            if (!dateFormat) {
                dateFormat = 'Y-m-d';
            }
            // Pretty Format
            var altFormat = $(datepicker_elements[i]).attr('data-altFormat');
            if (!altFormat) {
                altFormat = 'D, j. F Y';
            }
            // MAX date
            var maxDate = $(datepicker_elements[i]).attr('data-maxDate');
            if (!maxDate) {
                maxDate = false;
            }
            // MIN date
            var minDate = $(datepicker_elements[i]).attr('data-minDate');
            if (!minDate) {
                minDate = 'today';
            }
            // set options
            var options = {
                locale: active_lang, // IMPORTANT: We're gonna select the language according to the "lang" attribute of the <html> element
                time_24hr: true,
                altInput: true,
                altInputClass: 'form-control datepicker-rendered',
                disableMobile: true,
                altFormat: altFormat,
                clickOpens: true,
                allowInput: false,
                dateFormat: dateFormat,
                minDate: minDate,
                maxDate: maxDate,
                wrap: false,
                enableTime: enableTime,
                noCalendar: noCalendar,
            };

            // init
            var element = datepicker_elements[i];
            var flatpickr_instance = new Flatpickr(element,options);
            console.log( flatpickr_instance );

            // calendar toggle
            var $calendar = $(element).siblings('.calendar-btn');
            $calendar.on('click',function(){
                // a click outside the datepicker input field closes it. By delaying the call we can
                setTimeout(function(){
                    flatpickr_instance.toggle();
                },0);
            });

            // label toggle
            var $label = $(element).parents('.form-field-container').siblings('.control-label');
            $label.on('click',function(){
                // a click outside the datepicker input field closes it. By delaying the call we can
                setTimeout(function(){
                    flatpickr_instance.toggle();
                },0);
            });
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
