import docCookies from './docCookies';

$(function(){
    // init lang
    const lang = $('html').attr('lang');
    const $infobox = $('.infobox-trigger');
    const counterDefault = $infobox.data('counter'); // plugin setting counter
    const counterCurrent = Number(docCookies.getItem('infobox-hidden')) || 0;

    // in case cookie is NOT set, show the modal
    if (docCookies.getItem('infobox-hidden') === null || counterDefault === 0 || counterCurrent < counterDefault ) {
        if (lang === 'de') {
            // trigger promo video delayed
            setTimeout(function(){
                $infobox.trigger('click');
            },1500);
        }
    }

    if (counterDefault === 0) {
        docCookies.removeItem('infobox-hidden', '/');
    }

    // 0 = always visible, so no cookie
    if (counterDefault > 0) {
        // when closing the default modal, set cookie
        $(window).on('default-modal:closed',function(){
            // init
            const one_month_in_seconds = 2592000;
            // write cookie
            docCookies.setItem('infobox-hidden', counterCurrent + 1, one_month_in_seconds, '/');
        });
    }

});
