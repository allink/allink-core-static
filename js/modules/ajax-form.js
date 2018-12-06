/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Global solution for simple AJAX forms

Usage:

    <form class="ajax-form" data-ajax-response-container-id="example-form-container" data-success-data-layer-event="newsletter.sent" action="/example-url/">
        <div
            data-layer-variable="example-variable-1"
            data-layer-value="example-value-1"
            >
        </div>
        ...
    </form>

<div id="example-form-container">
    ...results are loaded here because of the 'data-ajax-response-container-id' attribute
</div>

Google Tag Manager GTM note:

Send a custom event to GTM by adding the 'data-success-data-layer-event' attribute to the <form> and pass a value e.g. 'newsletter.sent' that matched your GTM settings.

Important:

Obviously, the container ID ("example-form-container") has to be unique, not just to pass the HTML validator.

*/
import docCookies from './docCookies';

export function sendAjaxForm($form) {

    // init
    var url = $form.attr('action');
    var custom_event = $form.attr('data-success-data-layer-event');
    var success_url = $form.attr('data-success-url');
    var ajax_response_container_id = $form.attr('data-ajax-response-container-id');
    // we now support file uploads, too
    var formData = new FormData($form[0]);
    $form.find('[type="file"]').each(function () {
        // init
        var $input = $(this);
        var id = $input.attr('id');
        var file = $input.get(0).files[0];
        // strip "id_" so django finds the file
        formData.append(id.substring(3), file);
    });
    // debug formData
    //for (var pair of formData.entries()) {
    //      console.log(pair[0]+ ', ' + pair[1]);
    //}

    // define the container in which the ajax response will be written into
    // 1. in case an ID is defined, select that element
    if (ajax_response_container_id) {
        var $ajax_response_container = $('#' + ajax_response_container_id);
        if ($ajax_response_container.length == 0) {
            console.warn('The form\'s "data-ajax-response-container-id" is set to "' + ajax_response_container_id + '" but element can not be found in DOM');
        }
    }
    // 2. default: use immediate parent
    else {
        var $ajax_response_container = $form.parent();
    }

    // trigger custom event to indicate that we sent the AJAX request
    $(window).trigger('ajaxForm:request-sent', [$form]);

    // AJAX magic
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,  // Important!
        contentType: false,
        cache: false,
        timeout: 600000,
        url: url,
        data: formData,
        success: function (data, textStatus, jqXHR) {
            // do we get a custom URL from view?
            if (data.success_url) {
                window.location.href = data.success_url;
            }
            // otherwise, write HTML
            else {
                $ajax_response_container.html(data.rendered_content);
                // toggle class on plugin container if the response contains the string 'no-results-container'
                if (data.no_results === true) {
                    $ajax_response_container.addClass('app-list__no-results');
                } else {
                    $ajax_response_container.removeClass('app-list__no-results');
                }
            }

            // Note: If there are errors that we couldn't catch with the JavaScript form validation we get a '206' status code from the form's view
            if (jqXHR.status === 206) {
                // something wrong while sending the form
            }
            // made it.. finally!
            else {
                // Google Tag Manager in use?
                if (typeof dataLayer !== 'undefined') {
                    // Is there a custom event defined?
                    if (custom_event) {
                        // add values to array
                        dataLayer.push({
                            'event': custom_event,
                        });
                    }
                }
            }

            // trigger custom events
            $(window).trigger('ajaxForm:success', [$form]);
            $(window).trigger('initAjaxForm');
            $(window).trigger('initDatepicker');
            $(window).trigger('initFormModalClose');
            $(window).trigger('initFormValidation');
            // reveals next section in case there are no results when filtering
            $(window).trigger('initOnScreen');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // if something goes wrong
            $(window).trigger('ajaxForm:error');
        }
    });

}

export function setupAjax() {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    ajaxSetup (csrftoken)

    */
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    var csrftoken = docCookies.getItem('csrftoken');
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

}

export function initAjaxForm() {

    // find .ajax-form elements and loop!
    let ajax_forms = document.querySelectorAll('.ajax-form');
    if (ajax_forms.length > 0) {
        for (var i = 0; i < ajax_forms.length; i++) {
            // init
            var $form = $(ajax_forms[i]);
            // only listen for the submit event, if the form is not being validated
            if ($form.hasClass('validate-form') === false) {
                $form.on('submit', function (event) {
                    sendAjaxForm($form);
                    event.preventDefault();
                });
            }
        }
    }

}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Live Search

Usage:

Add the 'data-live-search' attribute to a text input and the script will listen for keyup events:

<input class="example-class form-control" id="example" name="example" type="search" data-live-search>

*/

export function initLiveSearch() {
    // init
    let $live_search_inputs = $('[data-live-search]');
    $live_search_inputs.each(function () {
        // init
        let $input = $(this);
        let timeoutId = 0;
        let initialized_attr = 'data-trigger-initialized';
        // check for initialized trigger
        let trigger_initialized = $input.attr(initialized_attr);
        // NOT initialized yet
        if (typeof trigger_initialized === 'undefined') {
            // listen for keyup event
            $input.keyup(function (e) {
                // init
                e.preventDefault();
                let $form = $(this).parents('.ajax-form').first();
                let $plugin = $(this).parents('.app-content-plugin').first();
                let $ajax_container = $plugin.find('.ajax-items-container');
                let loading_class = 'loading';
                // indicate that we are loading while typing
                $ajax_container.addClass(loading_class);
                // clear timeout
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    sendAjaxForm($form);
                }, 800);
            });
            // mark as initialized
            $input.attr(initialized_attr, '');
        }

    });
}

$(function () {

    // on page load
    setupAjax();
    initAjaxForm();
    initLiveSearch();

    // custom event
    $(window).on('initAjaxForm', function () {
        setupAjax();
        initAjaxForm();
        initLiveSearch();
    });

});
