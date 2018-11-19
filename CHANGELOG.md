# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

## v1.0.x (under development)

### IMPORTANT
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
### NEW
- CMS Structure: Added trigger to open cms structure from admin edit view
- `softpage`: Command, Ctrl and Shift key pressed down when clicking on softpage link now doesn't trigger the modal anymore.
- Typo: Prevent phone link line breaks
- Form: `.form-group` now gets the modifier class `.form-group--has-focus` when the form field is focused. No default styles, they have to be added on a project basis.
- `smooth-scroll`: Updated logic, now uses correct spacing.
- `Swiper`: Now able to randomize slide order by setting `data-randomize-slide-order` on the `.slider-container`.
- Textrea: New default styles and variables available:
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
- Site Overlay: In case `click-close-enabled` is active, the cursor is now correctly set to pointer.
- Map: Only add click event listener to marker if infobox content is given.
- Swiper: Fixed randomize slider bug (removed parseInt)
- Softpage: Fixed Browser History when opening a softpage
