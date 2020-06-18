/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

SEO Accordion

*/

export default function initSEOAccordion(options) {
    const $seoAccordionItems = $('.seo-accordion__item');
    const animationDuration = options.duration || 400;

    if (typeof $seoAccordionItems.data('trigger-initialized') === 'undefined') {
        $seoAccordionItems.each(function () {
            const $item = $(this);
            const $seoAccordionTitle = $item.children('.seo-accordion__title');
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
        });

        $seoAccordionItems.attr('data-trigger-initialized', '');
    }
}
