# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

## v0.0.3 (under development)

### IMPORTANT

- IE 11 Button fix: Create and import a `ie/_ie.scss` file with the following definitions:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

IE 11 quick and dirty fixes

---

'Cause that's what he/she deserves!

*/

*::-ms-backdrop, .btn { line-height: 1.15 !important; }
```
- Form Fields: Variables `$btn-line-height-default` has now been implemented in the core. On a project basis, your have to update the following CSS definitions in `typography/_global.scss`:
```SCSS
.form-control,
.dropdown-menu {
    @include input-default();
    line-height: $btn-line-height-default;
}
```
- Ajax Load Items: `data-trigger-initialized` is now added to prevent multiple event listeners on same trigger (e.g. when initialized again when softpage has been opened). Should you require a "load more" functionality within a softpage, you need to add the following lines to the project's `ajax-load-items.js`:
```JS
// re-init when softpage has been opened
$(window).on('softpage:opened',function(){
    initAjaxLoadItemsTrigger(options);
    initMasonry(options);
});
```

### NEW

- App Filter: Loader icon has been added with the following new default settings:
```SCSS
$load-more-swop-category-loader-spacing-top-xs:         100px;
$load-more-swop-category-loader-spacing-top-sm:         150px;
```
- Form Style `placeholder-enabled`: New variables available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=form =placeholder-enabled

*/

// spacing between .form-group
$form-placeholder-enabled-group-spacing-top-xs:    $grid-gutter-width/4;
$form-placeholder-enabled-group-spacing-top-md:    $grid-gutter-width/4;
$form-placeholder-enabled-group-spacing-top-xl:    $grid-gutter-width/4;
```
- Form Style `side-by-side`: New variables available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=form =side by side

*/

$form-side-by-side-max-width:           800px;
$form-side-by-side-label-width-md:      240px; // change according to longest label text
$form-side-by-side-label-width-xxl:     300px; // change according to longest label text
$form-side-by-side-label-gap:           $grid-gutter-width;
$form-side-by-side-label-text-align:    left; // "text-align" values accepted

// spacing between .form-group
$form-side-by-side-group-spacing-top-xs:    $grid-gutter-width/4;
$form-side-by-side-group-spacing-top-md:    $grid-gutter-width/4;
$form-side-by-side-group-spacing-top-xl:    $grid-gutter-width/4;
```
- Form: New variable with following default available:
```SCSS
$form-default-max-width:                800px;
```
- Form Fieldset and Legend: New variables available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=Fieldset and =Legend

*/

// spacing between fieldsets
$form-fieldset-spacing-xs:             $grid-gutter-width;
$form-fieldset-spacing-md:             $grid-gutter-width*1.5;
$form-fieldset-spacing-xl:             $grid-gutter-width*2;

// legend heading size (h1, h2, h3 or h4)
$form-legend-heading-size:             'h2';

// form group container spacing to previous element (legend or .fieldset-text)
$form-group-container-spacing-top-xs:  $grid-gutter-width;
$form-group-container-spacing-top-md:  $grid-gutter-width;
$form-group-container-spacing-top-xl:  $grid-gutter-width;

// fieldset intro text spacing to legend
$form-fieldset-text-spacing-top-xs:    $grid-gutter-width/2;
$form-fieldset-text-spacing-top-md:    $grid-gutter-width/2;
$form-fieldset-text-spacing-top-xl:    $grid-gutter-width/2;
```
- Google Map Styles: New improved default style (https://snazzymaps.com/style/105672/django-cms-default)
- Form Heading: Default styles for optional form heading in `form_base.html` added.
- Section Heading: Support for <strong>heading small</strong> added.
- Admin Forms: select elements with class `selectpicker` are now converted to `bootstrap-select` inputs.
- Swiper: Disable autoplay of gallery with `data-autoplay="false"` attribute on `.swiper-default` tag

### FIXES

- Softpage (Firefox bug): Any selected text is now "deselected" when openen the softpage.
- Video (Mobile): The `poster-only-on-mobile` flag now <strong>finally</strong> works on iOs, too.
- iPad: Modal wasn't scrolling when touching an input field followed by an up or down swipe gesture.
- Google Maps: On mobile, `fitBounds` now makes sure that all markers are visible.
- Ajax Load Items: `data-trigger-initialized` is now added to prevent multiple event listeners on same trigger (e.g. when initialized again when softpage has been opened). The re-init has to be added in the project's `ajax-load-items.js`, because we work with options:
```JS
// re-init when softpage has been opened
$(window).on('softpage:opened',function(){
    initAjaxLoadItemsTrigger(options);
    initMasonry(options);
});
```
- Content Plugin Column: Due to the switch to `flexbox`, columns didn't break anymore (default flexbox behaviour). They now do as desired.
- Bootstrap Select: The select is now checking for available space (above or below). Should you want to disable this feature and to force the dropdown to expand below, add the `data-dropup-auto="false"` attribute.
- Softpage: Fixed navigating back after open softpage has been reloaded (deeplink).

## v0.0.2

### IMPORTANT

- Form Validation: Now classes are added to form group or error state handler (in case of multi column forms -> Our Contact Form)
- Content Plugin column classes: Django CMS adds extra markup when logged it, that's why the `nth-child` pseudo selector wasn't working. Instead, we now added classes `col-1`, `col-2` and so on and removed the `nth-child` definition. This requires the latest `allink-core`, or you need to overwrite the `column.html` template of the `djangocms_content` plugin.
- Form Modal: The close button is now inside the modal for better UX. Go get the content of `modal/_form.scss` from teo jakob.
- Print: Lazyload images that are not in viewport yet can be loaded when printing the page by including the following plugin in the project's `app.js` BEFORE the main `lazysizes` import:
```JS
import 'lazysizes/plugins/print/ls.print'; // needs to be BEFORE the main script
```
- Contact Form: New script added that can be included in `app.js` with `import 'allink-core-static/js/modules/contact-form';`
- Softpage: `.conent-section` withing a tingle modal were globally resetted to `padding:0` and `margin:0`. Double check the spacings when updating, or ask Beat for advice ;)

### NEW

- Bootstrap Select: Dropdowns now forcefully expand "downwards".
- Global print styles optimized.
- Trigger Class on Scroll: New option `debounce_delay` with default value `20` available.
- Bootstrap Select: New variables available:
```SCSS
// this is a quick and dirty solution to fight the bootstrap-select loading jumping bloody effect
// Important: Get height of rendered bootstrap-select at each breakpoint AFTER the typography has been approved.
$select-placeholder-height-xs:          35px;
$select-placeholder-height-md:          35px;
$select-placeholder-height-xxl:         35px;
```
- NPM dependencies: All packages are now set to a fixed version. This prevents unwanted changes when executing the command `npm update`.
- Input Label: New variable available:
```SCSS
$form-label-bold-enabled:              true;
```
- Input Field: Error color variables available:
```SCSS
// error label
$form-label-error-color:               $black;

// error message
$form-field-error-spacing-xs:          $grid-gutter-width/4;
$form-field-error-spacing-md:          $grid-gutter-width/4;
$form-field-error-spacing-xl:          $grid-gutter-width/4;
$form-field-error-color:               $brand-danger;
```
- Input Fields: Inverted color variables available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

INVERTED colors for form =Fields (.form-control)

How to use it: Simply add a class `inverted-colors` to one of the parents of a form.

Example:

<div class="site-footer inverted-colors">
    <form>
        <input class="form-control" type="text" name="me-has-inverted-form-styles">
    </form>
</div>

*/

// set to false per default because of backward compatibility
$form-field-inverted-enabled:                   false;

$form-field-inverted-transition:                $form-field-transition;
$form-field-inverted-border-radius-default:     $form-field-border-radius-default;
$form-field-inverted-border-width:              $form-field-border-width;
$form-field-inverted-border-style:              $form-field-border-style;
$form-field-inverted-border-color:              $form-field-border-color;

// background color
$input-inverted-bg:                             $input-bg;
// background color of disabled form field (e.g. type="text")
$input-inverted-bg-disabled:                    $input-bg-disabled;
// background color :focus
$input-inverted-bg-focus:                       $input-bg-focus;

// Text color for `<input>`s
$input-inverted-color:                          $input-color;

// horizontal padding settings for form fields and textarea
$input-inverted-padding-left:                   $input-padding-left;
$input-inverted-padding-right:                  $input-padding-right;

// border color
$input-inverted-border-top-color:               $input-border-top-color;
$input-inverted-border-right-color:             $input-border-right-color;
$input-inverted-border-bottom-color:            $input-border-bottom-color;
$input-inverted-border-left-color:              $input-border-left-color;

// border color :focus
$input-inverted-border-top-color-focus:         $input-border-top-color-focus;
$input-inverted-border-right-color-focus:       $input-border-right-color-focus;
$input-inverted-border-bottom-color-focus:      $input-border-bottom-color-focus;
$input-inverted-border-left-color-focus:        $input-border-left-color-focus;

// ERROR styles
$input-inverted-error-border-top-color:         $input-error-border-top-color;
$input-inverted-error-border-right-color:       $input-error-border-right-color;
$input-inverted-error-border-bottom-color:      $input-error-border-bottom-color;
$input-inverted-error-border-left-color:        $input-error-border-left-color;
$input-inverted-error-bg:                       $input-error-bg;
```
- Video File Update (requires latest `allink-core`): New variables available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=Video File

*/

$video-controls-transition-property:        all;
$video-controls-transition-duration:        150ms;
$video-controls-transition-timing-function: ease-in;
$video-controls-fallback-arrow-color:       $white;
$video-controls-fallback-arrow-width:       25px;
$video-controls-fallback-arrow-height:      25px;
$video-controls-image-path-play:            false; // SVG recommended. Path to file e.g. '/static/images/icons/play.svg'
$video-controls-image-width-xs:             50px;
$video-controls-image-height-xs:            50px;
$video-controls-image-width-md:             80px;
$video-controls-image-height-md:            80px;
$video-controls-image-width-xl:             100px;
$video-controls-image-height-xl:            100px;
```
- Form Modal: Trigger now also gets the `data-trigger-initialized` when the `click` event listener has been attached (prevents event listener stacking).
- Dropdown: New variable with default value added `$dropdown-link-padding: 0;`
- Picture Elements (Image Plugin or by templatetag): `$project-colors` can now be used for `picutre` element by adding `project-color-1`, `project-color-2`, ...
- Softpage: Prevent reloading a softpage (in case of our placeholder menus) by toggling the attribute `data-softpage-toggled` on the trigger element.
- Lockdown: Basic styles added.
- App Filter: Filtering now works independent of category navigation. Requires the latest core. Of COREs..
- App Filter: Basic styles for `no-results-container` added
- Form: New `data-submit-form` trigger listener added that will submit its parent `form` (used for the logout mini form of the `Members Plugin`.
- Custom Newsletter Collapse functionality
- Members Plugin: New variables available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=members plugin

*/

$members-modal-spacing-top-xs:                      60px;
$members-modal-spacing-bottom-xs:                   60px;
$members-modal-spacing-top-md:                      60px;
$members-modal-spacing-bottom-md:                   60px;
$members-modal-spacing-top-xl:                      60px;
$members-modal-spacing-bottom-xl:                   60px;
```
- AJAX form: The optional `success_url` parameter from the AJAX response is now supported
- `tingle.js` updated to `0.10.0`: New variables for the `form modal` with the following default values are now available:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=form =modal

*/

$form-modal-transition-duration:                150ms;
$form-modal-transition-timing-function:       ease-in;
$form-modal-transition:         visibility $form-modal-transition-duration $form-modal-transition-timing-function,
                                opacity $form-modal-transition-duration $form-modal-transition-timing-function;
```
- Backend Colorpicker static files added and optimized.

### FIXES

- Colorpicker: Initial color value is now properly set to `transparent`
- Content Section: Full height mode fix (sectino now set to `position: relative`)
- Button/Link Container: Horizontal alignment 'left' is now working.
- Colorpicker: More userfriendly, prettier, transparent preview added.
- Softpage: Remove content when softpages closes (video was still playing in the background)
- Video: In progress..
- Form Fields: iPad shadow removed.
- Content Section: The first content section now gets the class `first` (fixes :first-child spacing issue when logged in).
- Bootstrap Select: Default select now hidden per default in order to prevent the flicker when rendering.
- Trigger Class on Scroll: IE11 fix.
- Swiper Fullscreen Gallery: Closing fixes.
- Video: re-init when softpage is loaded.
- Colopicker JS Bug fixed.
- Section Heading: Padding fix after changing the philisophy that app content belongs into a column of a content plugin.
- Softpage: Modal now scrolls to top every time a softpage is opened (was broken with tingle update).
- Colorpicker: Default color is now set to `transparent`
- Swiper: `swiper-counter` is now hidden per default. Only a temporary fix until gallery plugin is extended with flags.
- Softpage: Callback `onPageLoaded` now also called when working with `softpage_content_id` instead of the AJAX request.
- Bootstrap Select: `selected` styles are now supported.
- Bootstrap Select: `min-width` is now used for the actual dropdown as well, not only the button.
- iPad Video: `autoplay` now works for content section videos.
- Softpage: Momentum scrolling added for iWhatever devices. Baam!
- Content Plugin: Removed `overflow:hidden` of `col-1` templates.
- List Template: Added `@include make-row-sm-max();` that fixes a spacing issue on mobile.
- Softpage: `.tingle-modal__close:before` is now set to `absolute` and is therefore centered correctly
- Softpage: `.tingle-modal-box` is now handling the `overflow-y`.
- Form Modal: The form modal can now <strong>only</strong> be closed by clicking on an element with the attribute `data-close-form-modal` inside the modal
- Swiper Buttons: Edge displayed globally set `border` and `text-decoration` of links
- Swiper Buttons: Edge had a conflict when link color and `&:before` had different colors
- Swiper Fullscreen mode: fixed not applied options in fullscreen mode

## v0.0.1

### IMPORTANT

- AJAX button loader animation was buggy on iPads. The script has been updated, but requires adjusting the `transition` variable of form fields to the following:
```SCSS
$form-field-transition:                background-color $default-transition-duration $default-transition-timing, color $default-transition-duration $default-transition-timing, border $default-transition-duration $default-transition-timing;
```
- This requires the AJAX button to be <strong>visible on page load</strong> (meaning: not set to `display:none;` and not within a parent that is set `display:none;`). In case of the newsletter form in the footer (accordion), this can be achieved by the following:
```SCSS
.newsletter-container {
    .collapse {
        height: 0 !important;
        display: block;
        overflow: hidden;
        &.in {
            height: auto !important;
        }
    }
}
```

### NEW

- Content Plugin: The inner container background image is now handled with a separate HTML-element that allows us to stack the image and the overlay text on small screens. Requires the latest core.
- Dropdown: New variables `$dropdown-min-width` available (default to `0`).
- App Content Filter: Functionality added with new available variables:
- Slider counter styles
- Slider fullscreen mode
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

App Content > Filter spacing

*/

// spacing to next element (grid, list, ...)
$filter-container-spacing-bottom-xs:             $grid-gutter-width/2;
$filter-container-spacing-bottom-md:             $grid-gutter-width;
$filter-container-spacing-bottom-xl:             $grid-gutter-width;

// spacing between selects
$filter-container-spacing-between-select:        0.5em; // 'em' recommended
```
- Video Plugin: Basic styles added with the following settings variables:
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=video plugin

*/

$video-embed-default-ratio-width:               16;
$video-embed-default-ratio-height:               9;
```
- Softpage: New event `closeSoftpage` to close softpage from a custom toggle:
```js
$(window).trigger('closeSoftpage');
```
- Softpage: Option for loading content of a specific element instead of href-attribute added:
```HTML
<a href="/link-to-page" data-trigger-softpage data-softpage-content-id="example-element">I will trigger a softpage</a>

<div id="example-element">
    ...
        <h1>Anything in here will be displayed in the Softpage</h1>
    ...
</div>
```
- Content Plugin: Support for vertical alignment of columns added (the tallest element defines the boundaries). Important: Requires `allink-core` commit `4c060098fd93890d9355870b2cf54d2505650eda`
- Added new variable to set background color of form fields when `:focus`:
```SCSS
// background color :focus
$input-bg-focus:                       $gray-light;
```

### FIXES

- Button Link Plugin: Link target are now respected in the template.
- Swiper: Background image repeated on some mobile devices due to the padding ratio approach (when thumbnail and placeholder ratio are not the same). Now set to `background-repeat: no-repeat`.
- Admin: Automatically set size-attribute of multi-select fields (e.g. used for conten section classes)
- Instagram Plugin: Temporary spacing fix until we remove the .content-section markup from the instagram plugin (in the future we ONLY want to place the feed within columns of the Content Plugin, not asa standalone plugin)


# Older Changes

## 21.3.2017

- Feature: Horizontal alignment classes have been turned into utility classes that are globally usable. Currently, only the `Content Plugin Column` and the `Button/Link Plugin` use these classes: `.align-h-mobile-left`, `.align-h-mobile-center`, `.align-h-mobile-right` and `.align-h-desktop-left`, `.align-h-desktop-center`, `.align-h-desktop-right`
- Improvement: Removed fade in transition for content within softpage because the softpage is faded in already (increases performance). This comes with a new variable (flag) with the following dfault value:
```SCSS
$softpage-content-transition-enabled:       false;
```
- Feature: Beside the default softpage, we now support the option for a `small` softpage. Requires the latest core. New settings available:
```SCSS
// variations
$softpage-small-sm-max-width:                   500px;
$softpage-small-xxl-max-width:                  700px;
```

## 14.3.2017

- Feature: Added new instagram feed styles.

## 12.3.2017

- Improvement: Default browser input type "number" arrows are now hidden.
- Bugfix: Input type "number" limitted key functionality solved.
- Bugfix: Swiper (Slider) variables were wrong.

## 10.3.2017

- Content Plugin: Support for column alignment (horizontal) prepared.
- Content Plugin: Support for column ordering (for mobile only) has been added. Requires the latest `allink-core`.
- Content Plugin: Empty columns now get the class `col-empty` and are set to `display:none;` by default.

## 9.3.2017

Support for `Content Plugin` in an app's detail view added. New variables witwh the following defaults available:

```SCSS
// App Content Plugin > Detail View: Spacings between the .content-section
$app-detail-content-section-spacing-xs:     $grid-gutter-width;
$app-detail-content-section-spacing-sm:     $grid-gutter-width;
$app-detail-content-section-spacing-md:     $grid-gutter-width;
$app-detail-content-section-spacing-lg:     $grid-gutter-width;
$app-detail-content-section-spacing-xl:     $grid-gutter-width;

// App Content Plugin > Detail View: first item
$app-detail-content-section-spacing-first-item-xs:     $app-detail-content-section-spacing-xs;
$app-detail-content-section-spacing-first-item-sm:     $app-detail-content-section-spacing-sm;
$app-detail-content-section-spacing-first-item-md:     $app-detail-content-section-spacing-md;
$app-detail-content-section-spacing-first-item-lg:     $app-detail-content-section-spacing-lg;
$app-detail-content-section-spacing-first-item-xl:     $app-detail-content-section-spacing-xl;

// App Content Plugin > Detail View: last item
$app-detail-content-section-spacing-last-item-xs:      $app-detail-content-section-spacing-xs;
$app-detail-content-section-spacing-last-item-sm:      $app-detail-content-section-spacing-sm;
$app-detail-content-section-spacing-last-item-md:      $app-detail-content-section-spacing-md;
$app-detail-content-section-spacing-last-item-lg:      $app-detail-content-section-spacing-lg;
$app-detail-content-section-spacing-last-item-xl:      $app-detail-content-section-spacing-xl;
```

Important: Do not render the placeholder within a `.manage-spacings` container. Wrap it in an element with the class `app-detail-content-container`.

New custom events (jQuery)
- `softpage:opened`: triggered when softpage has been opened
- `softpage:closed`: triggered when softpage has been closed
- `form-modal:opened`: triggered when form-modal has been opened
- `form-modal:closed`: triggered when form-modal has been closed

How to listen to these events:
```JavaScript
$(window).on('softpage:opened form-modal:opened', function() {
    // do something
});
```

## 7.3.2017

- `tingle.js` close button is now working properly when multiple tingle instances are present.
- In progress: Static files of default social icons defined in `allink-core` will soon be moved to `allink-core-static`

## 6.3.2017

- All `input` fields with the `maxlength` attribute are now forcefully limitted via the `initFormModifications` function.

## 1.3.2017

New variables available:

### overlay

```SCSS
$overlay-background-color-sm-max:          #000;
$overlay-background-opacity-sm-max:        0.5;
```

### swiper

```SCSS
$swiper-default-pagination-hidden-sm-max:       true;
```

## 25.1.2017

New variables available:

```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=Alerts

*/

$alert-border-width:            1px;
$alert-border-style:            solid;
$alert-border-color:            transparent;
$alert-padding:                 1em 1em 1em 3em; // Important: Leave some space for the icon!
$alert-icon-position-left:      1em;

$alert-variations: (
    'success': (
        'icon':                 '\e206',
        'icon-color':           $brand-success-dark,
        'border-color':         $brand-success,
        'bg':                   $brand-success-light,
        'color':                $brand-success-dark,
    ),
    'danger': (
        'icon':                 '\e000',
        'icon-color':           $brand-danger-dark,
        'border-color':         $brand-danger,
        'bg':                   $brand-danger-light,
        'color':                $brand-danger-dark,
    ),
    'warning': (
        'icon':                 '\e002',
        'icon-color':           $brand-warning-dark,
        'border-color':         $brand-warning,
        'bg':                   $brand-warning-light,
        'color':                $brand-warning-dark,
    ),
    'info': (
        'icon':                 '\e2a2',
        'icon-color':           $brand-info-dark,
        'border-color':         $brand-info,
        'bg':                   $brand-info-light,
        'color':                $brand-info-dark,
    ),
);
```
