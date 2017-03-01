/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Modify Tingle Close Button

*/

function initTingleModifications() {
    // Update button text (accessibility) and wrap with <span>
    var btns = document.querySelector('.tingle-modal__close');
    for (var i = 0; i < btns.length; i++) {
        var btn_text_wrapper = document.createElement('span');
        btn_text_wrapper.setAttribute('lang', 'en');
        // set button text
        btn.textContent = '';
        btn_text_wrapper.textContent = 'Close';
        btn.appendChild(btn_text_wrapper);
    }

}

$(function(){
    // on page load, but delayed
    setTimeout(function(){
      initTingleModifications();
    },150);

});
