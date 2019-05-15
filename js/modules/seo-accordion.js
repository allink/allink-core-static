/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

SEO Accordion

*/

$(function () {
    const $seoAccordionItems = $('.seo-accordion__item');
    const animationDuration = 400;
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
            });
        });
    });
});
