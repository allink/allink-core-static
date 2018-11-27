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

### Passing the instance of e.g. a datepicker as a paremeter

```JS
// trigger custom event and pass instance
$(window).trigger('datepicker:ready', [instance]);
// listen to event and get value
$(window).on('datepicker:ready', function (event, instance) {
    console.log(instance);
}
```
