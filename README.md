# Changelog

## 10.3.2017

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
