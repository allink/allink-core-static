# Custom Events

Because we can't touch the `allink-core-static` files, we work with <strong>custom events</strong>.

The available custom events are usually listed in the script block comment at the beginning of the document.

## Let's take our `site-overlay.js` for example:

By firing `hideSiteOverlay` from anywhere in one of our scripts, we call the function that closes the site overlay:

```JS
// project script: close the overlay
$(window).trigger('hideSiteOverlay');
// core: the event listener
$(window).on('hideSiteOverlay', function() {
    hideSiteOverlay();
});
```
