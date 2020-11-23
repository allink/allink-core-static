# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

## v2.8.0
### IMPORTANT
- Moved datepicker to boilerplate and disabled it by default [#117](https://github.com/allink/allink-core-static/pull/117)
    - Add datepicker to existing projects that need it (VMI)
- Added scrollto prefix method for real smooth scrolling [#118](https://github.com/allink/allink-core-static/pull/118)
    - Add scrollto prefix in template (e.g. jobs detail)

### NEW
- Updated lazysizes to v5.2.2 [#102](https://github.com/allink/allink-core-static/pull/102)
- Updated text cropping docs [#103](https://github.com/allink/allink-core-static/pull/103)
- Removed inverted variant for text selection [#104](https://github.com/allink/allink-core-static/pull/104)
- Optimized scroll performance in triggerClassOnScroll [#110](https://github.com/allink/allink-core-static/pull/110)
- Added variables for colors wherever possible[#112](https://github.com/allink/allink-core-static/pull/112)
- Site title changes accordingly by opening a softpage [#116](https://github.com/allink/allink-core-static/pull/116)
- Added support for new horizontal spacings [#119](https://github.com/allink/allink-core-static/pull/119)
    - The old spacings-xx syntax is still supported
- Added lazyload-fade animation [#120](https://github.com/allink/allink-core-static/pull/120)
- Updated get chrome translation [#123](https://github.com/allink/allink-core-static/pull/123)
- Added hover styles and display block for form controls [#125](https://github.com/allink/allink-core-static/pull/125)
- Updated swiper to v6.3.4 [#127](https://github.com/allink/allink-core-static/pull/127)
- Used default cursor behavior on softpage [#128](https://github.com/allink/allink-core-static/pull/128)
- Made placement of modal header markup more flexible [#130](https://github.com/allink/allink-core-static/pull/130)
- Added arrow icon to browser download button [#131](https://github.com/allink/allink-core-static/pull/131)
- Updated softpage content padding [#132](https://github.com/allink/allink-core-static/pull/132)
- Removed browser check style leftover [#133](https://github.com/allink/allink-core-static/pull/133)

### FIXES
- Fixed radio / checkbox spacing [#105](https://github.com/allink/allink-core-static/pull/105)
- Fixed gallery transition styles and added keyboard controls [#115](https://github.com/allink/allink-core-static/pull/115)
- Added color transition for link icons [#121](https://github.com/allink/allink-core-static/pull/121)
- Removed pseudo default values for fluid-size and spacings-size mixins [#122](https://github.com/allink/allink-core-static/pull/122)
- Optimized softpage scrolling, made header sticky [#124](https://github.com/allink/allink-core-static/pull/124)
- Fixed input placeholder mixin [#126](https://github.com/allink/allink-core-static/pull/126)
- Specified overflow anchor on app list to prevent jumping to the page end on ajax load more [#129](https://github.com/allink/allink-core-static/pull/129)
- Fixed text cropping in browser check heading [#134](https://github.com/allink/allink-core-static/pull/134)


## v2.7.2
### FIXES
- Fixed video loading behavior in autoplay mode [#106](https://github.com/allink/allink-core-static/pull/106)
- Used relative path to form validation module [#107](https://github.com/allink/allink-core-static/pull/107)
- Fixed button mask in iOS Safari [#108](https://github.com/allink/allink-core-static/pull/108)
- Fixed second case for double modal title [#109](https://github.com/allink/allink-core-static/pull/109)
- Restored video resume functionality after scrolling [#114](https://github.com/allink/allink-core-static/pull/114)


## v2.7.1
### FIXES
- Fixed accordion transitions [#99](https://github.com/allink/allink-core-static/pull/99)
- Fixed accordion default spacing [#100](https://github.com/allink/allink-core-static/pull/100)


## v2.7.0
### IMPORTANT
- Updated accordion styles [#75](https://github.com/allink/allink-core-static/pull/75), [#76](https://github.com/allink/allink-core-static/pull/76), [#79](https://github.com/allink/allink-core-static/pull/79)
    - Check existing accordion styles on project basis
- Updated list styles [#78](https://github.com/allink/allink-core-static/pull/78), [#81](https://github.com/allink/allink-core-static/pull/81), [#87](https://github.com/allink/allink-core-static/pull/87), [#88](https://github.com/allink/allink-core-static/pull/88)
    - Update variables on project basis
- Added new spacing (spacing-equal-7) [#90](https://github.com/allink/allink-core-static/pull/90)
    - Search and replace spacings in project (spacing-equal-6 = spacing-equal-7, spacing-equal-5 = spacing-equal-6, spacing-equal-4 = spacing-equal-5)
- Refactored link styles to optimize spacing and multiline behavior [#96](https://github.com/allink/allink-core-static/pull/96)
    - Update mixins/_buttons.scss and mixins/_link.scss from boilerplate

### FIXES
- Updated modal scrollbar position [#80](https://github.com/allink/allink-core-static/pull/80)
- Fixed swiper arrow hover color [#83](https://github.com/allink/allink-core-static/pull/83)
- Fixed spacing for sections with background colors [#84](https://github.com/allink/allink-core-static/pull/84)
- Fixed fluid size formula [#86](https://github.com/allink/allink-core-static/pull/86)
- Fixed browser check button list [#89](https://github.com/allink/allink-core-static/pull/89)
- Fixed seo accordion borders [#93](https://github.com/allink/allink-core-static/pull/93)
- Prevented modal title from being inserted multiple times [#97](https://github.com/allink/allink-core-static/pull/97)

### NEW
- Moved slider spacing to content [#82](https://github.com/allink/allink-core-static/pull/82)
- Removed Google Plus [#85](https://github.com/allink/allink-core-static/pull/85)
- Added font-default-tighter mixin [#91](https://github.com/allink/allink-core-static/pull/91)
- Removed variable $font-family-monospace [#92](https://github.com/allink/allink-core-static/pull/92)
- Added styles for unstyled text links [#95](https://github.com/allink/allink-core-static/pull/95)


## v2.6.0
### IMPORTANT
- Init JS modules on softpages and after CMS refresh [#64](https://github.com/allink/allink-core-static/pull/64), [#71](https://github.com/allink/allink-core-static/pull/71), [#73](https://github.com/allink/allink-core-static/pull/73)
    - JS modules must be updated from boilerplate

### FIXES
- Updated bootstrap-select to v1.13.15 [#50](https://github.com/allink/allink-core-static/pull/50)
- Fixed link tag in docs [#52](https://github.com/allink/allink-core-static/pull/52)
- Fixed accordion icon [#53](https://github.com/allink/allink-core-static/pull/53)
- Centered button text [#54](https://github.com/allink/allink-core-static/pull/54)
- Fixed line height output [#55](https://github.com/allink/allink-core-static/pull/55)
- Optimized link icon transition [#58](https://github.com/allink/allink-core-static/pull/58)
- Fixed section spacing specificity [#59](https://github.com/allink/allink-core-static/pull/59)
- Fixed language nav [#61](https://github.com/allink/allink-core-static/pull/61)
- Fixed clickability of header elements [#63](https://github.com/allink/allink-core-static/pull/63)
- Set lazyloader-transition-duration to 300ms [#65](https://github.com/allink/allink-core-static/pull/65)
- Fixed grid-spacing behaviour on mobile [#66](https://github.com/allink/allink-core-static/pull/66)
- Fixed social icon transition [#67](https://github.com/allink/allink-core-static/pull/67)
- Fixed browser-suggestion content-width behavior on all viewports [#68](https://github.com/allink/allink-core-static/pull/68)

### NEW
- Added basic link styles from variables [#45](https://github.com/allink/allink-core-static/pull/45)
- Updated browser check logo styles [#46](https://github.com/allink/allink-core-static/pull/46)
- Added to-rem function [#47](https://github.com/allink/allink-core-static/pull/47)
- Added responsive media styles [#51](https://github.com/allink/allink-core-static/pull/51)
- Added stylelint [#56](https://github.com/allink/allink-core-static/pull/56)
- Added hover color variables for nav toggle [#60](https://github.com/allink/allink-core-static/pull/60)

### Docs
- Added docs for text cropping [#57](https://github.com/allink/allink-core-static/pull/57)

## v2.5.3
### FIXES
- Fixed modal header border [#49](https://github.com/allink/allink-core-static/pull/49)

## v2.5.2
### FIXES
- Fixed modal header container [#48](https://github.com/allink/allink-core-static/pull/48)

## v2.5.1
### FIXES
- Fixed cms toolbar height [#43](https://github.com/allink/allink-core-static/pull/43)
- Fixed visit anyway button [#44](https://github.com/allink/allink-core-static/pull/44)

## v2.5.0
### IMPORTANT
- Added viewport-height dependent Background Image (full width) as default [#26](https://github.com/allink/allink-core-static/pull/26)
    - $content-section-bg-image-outer-height-min has to exist in project variables
    - $content-section-bg-image-outer-height-max has to exist in project variables
- Added fluid grid spacings [#28](https://github.com/allink/allink-core-static/pull/28)
- Updated grid breakpoints for two, three and four items per row.
    - Check layout in existing projects and overwrite styles where needed. [#24](https://github.com/allink/allink-core-static/pull/24)
- Removed onscreen effect [#27](https://github.com/allink/allink-core/pull/27)
    - Remove the file static/js/modules/onscreen.js in project
    - Remove the line `import './modules/onscreen';` in app.js
- Removed manual vendor prefixing and the following related mixins: opacity, user-select, box-shadow, reset-filter, box-sizing [#31](https://github.com/allink/allink-core/pull/31)

### NEW
- Added new variables and styles for video controls [#30](https://github.com/allink/allink-core/pull/30)
- Updated modal header [#35](https://github.com/allink/allink-core-static/pull/35)
- Updated browser check styles [#37](https://github.com/allink/allink-core-static/pull/37)
- Updated normalize to v8.0.1 [#38](https://github.com/allink/allink-core-static/pull/38)
- Updated form control styles [#39](https://github.com/allink/allink-core-static/pull/39)

### FIXES
- Fixed `button` tag in docs [#23](https://github.com/allink/allink-core-static/pull/23)
- Allow text in buttons to wrap and prevent link / button icon from scaling down [#25](https://github.com/allink/allink-core-static/pull/25)
- Removed infobox open delay [#29](https://github.com/allink/allink-core-static/pull/29)
- Fixed underline on multiline links [#32](https://github.com/allink/allink-core-static/pull/32)
- Fixed button mask padding [#34](https://github.com/allink/allink-core-static/pull/34)
- Fixed button mask border radius [#36](https://github.com/allink/allink-core-static/pull/36)

## v2.4.1 (next version)

## v2.4.0
### IMPORTANT
- we removed contact app from allink-core
- we removed newsletter app from allink-core

## v2.3.1
### FIXES
- Added font-cropping-disable option. In some places (e.g. body) where the `font-default` mixin is used, font-cropping doesn't make sense. Only on the text tags directly.<br>
    - Locally the typography mixins should be updated like this:<br>
        ```SCSS
                @mixin font-default($font-cropping-disabled: false) {
                letter-spacing: $font-default-letter-spacing;
                text-transform: $font-default-text-transform;
                font-family: $font-default-font-family;
                font-weight: $font-default-font-weight;
                @include font-size($font-default-font-sizes);
                @include hyphens();
                @if $font-cropping-disabled == false {
                    @include text-crop($font-default-crop-top, $font-default-crop-bottom);
                }
                @if $font-default-antialiased-enabled == true {
                    @include antialiased();
                }
            }
        ```

        Usage:

        ```SCSS
        @include font-default($font-cropping-disabled: true);
        ```

## v2.3.0

### IMPORTANT
- UPDATE REQUIRED: allink-core v2.3.0
- Added font-cropping to default font mixins
    - Add default font-cropping values in local variables file: `scss/base/variables/_typography.scss`
        ```SCSS
        $font-default-crop-top:                      0em;
        $font-default-crop-bottom:                   0em;

        $font-small-crop-top:                        0em;
        $font-small-crop-bottom:                     0em;

        $font-lead-crop-top:                         0em;
        $font-lead-crop-bottom:                      0em;

        $font-h1-crop-top:                           0em;
        $font-h1-crop-bottom:                        0em;

        $font-h2-crop-top:                           0em;
        $font-h2-crop-bottom:                        0em;

        $font-h3-crop-top:                           0em;
        $font-h3-crop-bottom:                        0em;

        $font-h4-crop-top:                           0em;
        $font-h4-crop-bottom:                        0em;

        $font-h5-crop-top:                           0em;
        $font-h5-crop-bottom:                        0em;

        $font-h6-crop-top:                           0em;
        $font-h6-crop-bottom:                        0em;
        ```

### FIXES
- Updated quote-plugin styles
- Updated npm scripts: Don't automatically create a new release on Github
- Updated browser-check styles, code cleanup, added js translations
- Fixed browser recognition
- Set grid-items to same height within row


## v2.2.1
### FIXES
- Fixed button masking effect jiggle when mask has borders, updated base button variables
    - Note: some subpixel rendering issues may occur on certain screens (i.e. non-retina) when hover state has a border: https://www.chenhuijing.com/blog/about-subpxiel-rendering-in-browsers

## v2.2.0
### IMPORTANT
- UPDATE REQUIRED: allink-core v2.2.0
## NEW
- Video-Plugin:
    - Added autoplay option for mobile devices
    - Linting file video.js

## v2.1.0
### IMPORTANT
- UPDATE REQUIRED: allink-core v2.1.0
- Refactored button styles:
    - Moved button variables into separate file `scss/base/variables/_buttons.scss`
    - Added new mixins to style your buttons with animations (available on project basis)
        - Text links:
            ```SCSS
            @include link-style();
            @include link-background-effect();
            ```
        - Buttons:
            ```SCSS
            @include button-base();
            @include button-variation('default');
            @include button-mask-effect('default');
            ```
    - Removed unused button styles
### NEW
- Added allink_quote plugin
### FIXES
- Fixed invalid form field focus
- Updated button markup and styles

## v2.0.0
### IMPORTANT
- Removed `softpage-variation`. There is only one type of softpage now.
- Removed the following modules:
    - to-the-top
    - masonry
    - mailchimp
    - instagram
    - grid-dynamic
    - members
- Replaced a lot of fixed spacing styles with fluid spacings, merged variables.
- Removed old column mixins.
- Removed content-section first- & last-child spacings
- Removed `col-5` and `col-6` grid layouts
- Removed `$max-width-xl`. Now scaling is more fluid.
- Removed parallax effect from content plugin.
- Removed `font-display-1` mixin and styles.
- Removed bootstrap-sass dependency. Moved relevant styles and mixins into core-static files.
- Split `_variables.scss` file up into multiple files.
- Replaced standard mediaqueries with more readable mixins (`scss/mixins/_breakpoints.scss`)
- Added new default breakpoints (`scss/mixins/_breakpoints.scss`):
    ```SCSS
        // All breakpoints that we use are defined here
        $grid-breakpoints: (
            // Default breakpoints for general usage:

            // Extra small screen / phone
            xs: 320px,
            // Small screen / tablet
            sm: 560px,
            // Medium screen / desktop
            md: 800px,
            // Large screen / wide desktop
            lg: 1040px,
            // Extra Large screen / wide desktop
            xl: 1280px,
            // Extra Large screen / wide desktop
            xxl: 1760px,

            // Fine-grainded breakpoints for specific usage:
            0: 0px,
            1: 320px,
            2: 400px,
            3: 480px,
            4: 560px,
            5: 640px,
            6: 720px,
            7: 800px,
            8: 880px,
            9: 960px,
            10: 1040px,
            11: 1120px,
            12: 1200px,
            13: 1280px,
            14: 1360px,
            15: 1440px,
            16: 1520px,
            17: 1600px,
            18: 1680px,
            19: 1760px,
        );
    ```
- Added eslint with default config.
### NEW
- The mixin make-container now uses fluid paddings.
- Added script for browser recognition/suggestions:
    import `'./modules/browser-recognition';` to app.js
    include `'includes/browser-check.html'` to your base_root template

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
- Added Page padding and grid-gutter-width for small devices (`scss/base/_grid.scss`):
    ```SCSS
        //** Number of columns in the grid.
        $grid-columns:               24;
        //** Padding between columns. Gets divided in half for the left and right.

        $grid-gutter-width-xs:       1.25rem;
        $grid-gutter-width:          3.75rem;

        $page-padding-width-xs:      1.5625rem;
        $page-padding-width:         5rem;
    ```
- Added sticky footer styles.
- Added new overlay menu module and nav-toggle. It is now decoupled from modals. Styles are available on project basis.
- Added DjangoCMS Modules:
    - Each modules creates a css-class from its title: `cms-module-<module-slug>`
- Added SEO Accordion plugin.
    - SCSS Variables: `scss/base/variables/_seo-accordion.scss`
    - SCSS Default Styles: `scss/plugins/_seo-accordion.scss`
    - JS: `js/modules/seo-accordion.js`
- Added `spacings-size` mixin. Sizes available in (`scss/base/variables/_spacings.scss`):
    Example:

    ```SCSS
    .container {
        @include spacings-size(spacing-scale-1, margin-top);
    }
    ```
- Introduced 16px as root font-size (`scss/typography/_global.scss`)
- Added default icons for softpage and external links.
- Added text link background animation (`scss/base/variables/_links.scss`).
- Added flex-based grid mixins (`scss/mixins/_grid.scss`)
### FIXES
- Typofix `spacing-gutter-width` spacing
- Improved softpage transition
- Fixed modal-header layout
- Fixed various vulnerabilities
- Fixed swiper autoplay options
- Applied `cms-content-refresh` event to modules:
    - Default Modal
    - Form Modal
    - Image Modal
    - Softpage
- Applied spacings-sizes to some styles.
- Layout fixes in .tingle-modal-header.
- Made nav-toggle and modal header close button use fluid-size and correct positioning.
- Made `spacings-size` mixin more generic for more properties (i.e. height), only provide property shorthand for margin and padding.
- Added `hypens` mixin to all typography mixins
- Cleanup app-content template styles
- Reorganzied button styles
- Updated default swiper layout and swiper content change event.
- Updated softpage layout, improved nav-toggle styles.
- Moved dev-dependencies from core-static into project.
