# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

## v2.0.x (under development)
### NEW
- Added font-cropping mixin
    Example:
    ```SCSS
    // Variables:
    $font-h1-crop-top:                           0.1em;
    $font-h1-crop-bottom:                        0.3em;

    // Mixin (add to i.e. font-h1()):
    @include text-crop($font-h1-crop-top, $font-h1-crop-bottom);
    ```
- Added generic `fluid-size` mixin. You can now add a size-map directly
    Example:

    ```SCSS
    @include fluid-size((min: 7.8125rem, max: 14.0625rem), width);
    ```

- @mixin button-variation border-colors depend on new settings in $btn-variation map.
    Set to true if borders should be displayed:

    `'border':               true,`
    `'border-hover':         true,`
    `'border-disabled':      true,`

    file in project: `./static/scss/base/variables/_forms.scss`

### FIXES
- Made `spacings-size` mixin more generic for more properties (i.e. height), only provide property shorthand for margin and padding.


## v1.0.x

### IMPORTANT
- Video Updates (conditional loading of video source): Requires latest core markup of `allink_core/core_apps/allink_content/templates/allink_content/content_base.html` and `allink_core/core_apps/allink_video/templates/allink_video/file/content.html`.
- Newsletter: Added new plugin with new variables. Make sure to add `@import "~bootstrap-sass/assets/stylesheets/bootstrap/component-animations";` in `static/scss/bootstrap/_bootstrap.scss`.
```SCSS
  // collapse and checkmark icons and checkmark icon color
  $newsletter-icon-plus: '\e934';
  $newsletter-icon-minus: '\e933';
  $newsletter-icon-checkmark: '\e908';
  $newsletter-icon-checkmark-color: $brand-blue;
  $newsletter-form-modal-max-width-md:         500px;
  $newsletter-form-modal-max-width-xxl:        550px;
```
- you must include "js/modules/ajax-load-plugins.js" in app.js otherwise plugin CMSAllinkLanguageChooserPlugin won't load
### NEW
- Reorganized headings (H1-H6). H2 is no longer the default heading, added H5 and H6 to defaults. Add the following example code to your `_variables.scss` and to your `settings.py`
- Added selection inverted colors:
```SCSS
$selection-inverted-bg-color:   $white;
$selection-inverted-color:      get-black-or-white-contrast-color($white);
```
```SCSS
// h5
$font-h5-font-sizes: (
    null: (2.4rem, 1.1em),
    md: 2.8rem,
);
$font-h5-text-transform:                     none;
$font-h5-letter-spacing:                     0;
$font-h5-antialiased-enabled:                true;
$font-h5-font-weight:                        700;
$font-h5-font-family:                        $font-family-bold;

// h6
$font-h6-font-sizes: (
    null: (2.2rem, 1.1em),
    md: 2.4rem,
);
$font-h6-text-transform:                     none;
$font-h6-letter-spacing:                     0;
$font-h6-antialiased-enabled:                true;
$font-h6-font-weight:                        700;
$font-h6-font-family:                        $font-family-bold;
```
```python
'stylesSet': [
    {
        'name': 'Überschrift 1',
        'element': 'h1',
    },
    {
        'name': 'Überschrift 2',
        'element': 'h2',
    },
    {
        'name': 'Überschrift 3',
        'element': 'h3',
    },
    {
        'name': 'Überschrift 4',
        'element': 'h4',
    },
    {
        'name': 'Überschrift 5',
        'element': 'h5',
    },
    {
        'name': 'Überschrift 6',
        'element': 'h6',
    },
    ...
]
```
- IE and Edge: Scrollbars now do NOT take up space anymore thanks to the `-ms-overflow-style: -ms-autohiding-scrollbar;` property.
- CMS Structure: Added trigger to open cms structure from admin edit view
- `softpage`: Command, Ctrl and Shift key pressed down when clicking on softpage link now doesn't trigger the modal anymore.
- Typo: Prevent phone link line breaks
- Form: `.form-group` now gets the modifier class `.form-group--has-focus` when the form field is focused. No default styles, they have to be added on a project basis.
- `smooth-scroll`: Updated logic, now uses correct spacing.
- `Swiper`: Now able to randomize slide order by setting `data-randomize-slide-order` on the `.slider-container`.
- Textrea: New default styles and variables available:
- ajax-forms: all forms with class "ajax-form" now get sent with the appropriate csrftoken which will be fetched from the cookie. you don't need a {% csrf_token %} in the template anymore (this is why we can now cache CMSAllinkSignupFormPlugin and any other CMSPlugin displaying a form) -> if you decide to change cache=False to cache=True in the CMSPlugin configuration you must remove {% csrf_token %} from the template and clear the cache on production! otherwise you will end up with a 403!
- ajax-load-items: added custom event triggers for items exchanging and appending
```SCSS
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

=textarea =area

*/

$textarea-min-height:                   5em;
$textarea-max-height:                   60vh;
```
- `Swiper` now supports instance specific <strong>transition durations</strong> between slides and <strong>specific transition effects</strong> that can be set on the `swiper-container` via `data`-attributes.
- Google Map now supports location specific pins by setting a `pin_url` (besides `lat`, `lng` and `infowindow_content`).
- Video poster and source are now lazyloaded.
- `softpage` and `default-modal` now support a `tingle-modal-header`. Details in both javascript files.
- `bootstrap-select` now has an additional selector `.selectpicker-alt` besides the default `.selectpicker` for that prevent rendering in some cases (such as the `default-modal`)
- Site Overlay: New custom events added. Details in comments of `js/modules/site-overlay.js`.
- Google Maps: Markers can now be opened with custom link. Details in comments of `js/modules/map.js`.
- Google Maps: `FullscreenControl` is now set to `false` per default. This can be overwriiten by setting the variable `fullscreen_enabled` to `true` on a project basis.
- Lazyload loader icon is now removed from the DOM when image is loaded (with a delay to make the icon is hidden after the image animation has finished)
- All modal instance variables are now assigned to the `window` object and are accessible anywhere:
  ```JS
  // the currently available instances
  console.log( window.form_modal );
  console.log( window.default_modal );
  console.log( window.image_modal );
  console.log( window.softpage );
  // example: calling tingle.js methods
  window.form_modal.close();
  ```
- Smooth Scroll: New offest `data` attributes available. Details in script header.
- Swiper: New variable `options.transitionDurationBetweenSlides_mobile` available.
- Infobox: Added new plugin
- docCookies, Added module
- New settings for `signup-form` plugin available in `_variables.scss` in the `allink-core-static`. Look for `=signup` and copy&paste into your project.
- New Javascript module `to-the-top` is now available:
  ```JS
  import 'allink-core-static/js/modules/to-the-top';
  ```
- New Javascript plugin `pagechooser` is now available:
  ```JS
  import 'allink-core-static/js/modules/pagechooser';
  ```
- New Javascript plugin `expandable` is now available:
  ```JS
  import 'allink-core-static/js/modules/expandable';
  ```
### FIXES
- Fixed selection colors with rgba
- Upgraded node-sass to `4.11.0`
- Site Overlay: In case `click-close-enabled` is active, the cursor is now correctly set to pointer.
- Map: Only add click event listener to marker if infobox content is given.
- Swiper: Fixed randomize slider bug (removed parseInt)
- Softpage: Fixed Browser History when opening a softpage
- Smooth Scroll: Added workaround for hash-based routing (i.e. vue-router)
