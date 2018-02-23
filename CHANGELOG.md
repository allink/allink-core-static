# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

## v1.0.0 (under development)

### IMPORTANT
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
### NEW
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
### FIXES
-
