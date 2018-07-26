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

    // init
    window.flatpickr_instances = [];

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

            // init
            var element = datepicker_elements[i];
            var $datepicker_element = $(element);
            const $datepicker_container = $datepicker_element.parents('.datepicker-container');
            var has_value_class = 'has-value';

            if ($datepicker_element.is(':hidden')) {
                return true;
            }

            // TIME only
            var noCalendar = $datepicker_element.attr('data-noCalendar');
            if (typeof noCalendar === 'undefined') {
                noCalendar = false;
            } else {
                noCalendar = true;
            }
            // date AND time
            var enableTime = $datepicker_element.attr('data-enableTime');
            if (typeof enableTime === 'undefined') {
                enableTime = false;
            } else {
                enableTime = true;
            }
            // technical format
            var dateFormat = $datepicker_element.attr('data-dateFormat');
            if (!dateFormat) {
                dateFormat = 'Y-m-d';
            }
            // Pretty Format
            var altFormat = $datepicker_element.attr('data-altFormat');
            if (!altFormat) {
                altFormat = 'D, j. F Y';
            }
            // MAX date
            var maxDate = $datepicker_element.attr('data-maxDate');
            if (!maxDate) {
                maxDate = false;
            }
            // MIN date
            var minDate = $datepicker_element.attr('data-minDate');
            if (!minDate) {
                minDate = 'today';
            }
            // set options
            const options = {
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
                onReady: function(selectedDates, dateStr, instance) {
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:ready', [instance]);
                },
                onOpen: function(selectedDates, dateStr, instance) {
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:opened', [instance]);
                },
                onClose: function(selectedDates, dateStr, instance) {
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:closed', [instance]);
                },
                onValueUpdate: function(selectedDates, dateStr, instance) {
                    // get parent container
                    var $datepicker_container = $(instance.element).parents('.datepicker-container');
                    // add class, so we can show the clear button
                    $datepicker_container.addClass(has_value_class);
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:updated', [instance]);
                },
                onChange: function(selectedDates, dateStr, instance) {
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:change', [instance]);
                },
                onMonthChange: function(selectedDates, dateStr, instance) {
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:month-changed', [instance]);
                },
                onYearChange: function(selectedDates, dateStr, instance) {
                    // trigger custom event and pass instance
                    $(window).trigger('datepicker:year-changed', [instance]);
                },
            };

            // init
            const flatpickr_instance = new Flatpickr(element,options);

            // do stuff when the value changes
            // console.log( $(flatpickr_instance.element) );
            $(flatpickr_instance.element).on('change', function(){
                $(window).trigger('datepicker:value-updated',[flatpickr_instance]);
            });

            // clear value
            const $clear_btn = $(element).siblings('.clear-btn');
            $clear_btn.on('click',function(){
                // a click outside the datepicker input field closes it. So we gotta "delay" it.
                setTimeout(function(){
                    flatpickr_instance.clear();
                    // add class, so we can hide the clear button
                    $datepicker_container.removeClass(has_value_class);
                },0);
            });

            // calendar toggle
            const $datetime_btn = $(element).siblings('.calendar-btn, .time-btn');
            $datetime_btn.on('click',function(){
                // a click outside the datepicker input field closes it. So we gotta "delay" it.
                setTimeout(function(){
                    flatpickr_instance.toggle();
                },0);
            });

            // label toggle
            const $label = $(element).parents('.form-field-container').siblings('.control-label');
            $label.on('click',function(){
                // a click outside the datepicker input field closes it. By delaying the call we can
                setTimeout(function(){
                    flatpickr_instance.toggle();
                },0);
            });

            // assign instances to window
            window.flatpickr_instances.push(flatpickr_instance);
        }
    }

}

$(function(){

    // on page load
    initDatepicker();

    // custom event
    $(window).on('initDatepicker default-modal:opened softpage:opened form-modal:opened', function() {
        initDatepicker();
    });

});
