# Changelog

Each release is divided into the following main categories:

- IMPORTANT: These changes might not be backward compatible and require updating existing code.
- NEW: New features or plugins
- FIXES: General bugfixes

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
