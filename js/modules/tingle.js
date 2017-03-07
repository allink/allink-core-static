/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Modify Tingle Close Button

*/

function initTingleModifications() {
    // Update button text (accessibility) and wrap with <span>
    var btns = document.querySelectorAll('.tingle-modal__close');
    for (var i = 0; i < btns.length; i++) {
        // init
        var btn = btns[i];
        // create and set elements lang attribute
        var btn_text_wrapper = document.createElement('span');
        btn_text_wrapper.setAttribute('lang', 'en');
        // remove button text
        btn.textContent = '';
        // set the created span
        btn_text_wrapper.textContent = 'Close';
        // and append it
        btn.appendChild(btn_text_wrapper);
    }

}

$(function(){
    // on page load, but delayed
    setTimeout(function(){
      initTingleModifications();
    },150);

    // custom event
    $(window).on('initTingleModifications', function() {
        initTingleModifications();
    });

});
