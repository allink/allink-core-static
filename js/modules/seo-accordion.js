/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

SEO Accordion

*/

export default function initSEOAccordion(options) {
    const $seoAccordionItems = $('.seo-accordion__item');
    const animationDuration = options.duration || 400;

    $seoAccordionItems.each(function () {
        const $item = $(this);
        const $seoAccordionTitle = $item.children('.seo-accordion__title');

        if (typeof $item.data('trigger-initialized') === 'undefined') {
            let animationRunning = false;

            $seoAccordionTitle.on('click', function (event) {
                event.preventDefault();

                // prevent item to keep opening & closing when user clicks multiple times on title
                if (animationRunning) {
                    return;
                }

                const $seoAccordionContent = $item.children('.seo-accordion__content');
                $item.toggleClass('seo-accordion__item--open');
                animationRunning = true;
                $seoAccordionContent.slideToggle(animationDuration, 'swing', function () {
                    animationRunning = false;
                    $(window).trigger('initSoftpageTrigger');
                });
            });

            $item.attr('data-trigger-initialized', '');
        }
    });
}
