# Site Overlay

All our [modals](../modules/modals.md) use the reusable <strong>site overlay</strong> element as defined in the `base_root.html` (part of `allink-core`):

```HTML
<div class="site-overlay"></div>
```

This approach has been chosen because of independent modal and site overlay layering requirements.

## Styles

Setting the overlay styles is done in `static/scss/base/_variables.scss`. Search for `=overlay`.

## Custom Events

There are custom event to trigger the `site-overlay`. More information in the comment section in `/allink-core-static/js/modules/site-overlay.js`.
