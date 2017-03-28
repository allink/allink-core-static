# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes


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

- Added new variable to set background color of form fields when `:focus`:
```SCSS
// background color :focus
$input-bg-focus:                       $gray-light;
```

### FIXES




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