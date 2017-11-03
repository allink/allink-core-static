# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

## v1.0.0 (under development)

### IMPORTANT
- Dropdown (Bootstrap Select): New variables available:
  ```SCSS
  // link:hover
  $dropdown-link-hover-color:             $black;
  $dropdown-link-hover-bg:                $gray-lightest;
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
- Smooth Scroll: New offest `data` attributes available. Details in script header.
- Swiper: New variable `options.transitionDurationBetweenSlides_mobile` available.
### FIXES
-
