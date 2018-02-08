# "OnScreen" (Scroll Spy)

This module adds a class to content sections and any other element as soon as they enter the viewport.

We make use of the lightweight [OnScreen library](https://github.com/silvestreh/onScreen)

## Usage with our [Content Plugin](../plugins/content-plugin.md)

When creating a new content section you can define a `PREDIFINED ON SCREEN EFFECT` in the `Advanced Settings`.

Per default, the `default` effect is applied to all sections (with the option to set no effect). So as soon as this section is in the viewport, the class `on-screen-default` will be added.

### Adding custom `content-section` effects

In our `settings.py` we can define additional effects making us of the `CONTENT_ON_SCREEN_EFFECT_CHOICES` tuple.

Note: These effects will only be available for content sections.

IMPORTANT: Never change or remove the key `default`.

## Styling the effects

What ever is gonna happen when the effect class is added is defined in `static/scss/modules/_onscreen.scss`.

This could be:

- Don't do anything at all
- A simple fade in
- Transitioning columns from left and right towards the center
- ...

## Adding effect to any element

The OnScreen feature is not limitted to content sections, though.

If you want to add an `example-effect` to a custom module you can achieve this by defining the `data-scroll-spy` attribute:

```HTML
<div class="example-module" data-scroll-spy="example-effect">
  ...
</div>
```

So as soon as the element enters the viewport, the following class will be added:

```HTML
<div class="example-module on-screen-example-effect" ...>
  ...
</div>
```

Which can be styled like this:

```SCSS
.example-module {
  // initial styles: preparing the transition
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  // styles when element is in viewport
  &.on-screen-example-effect {
    opacity: 1;
  }
}
```

## Tweaking the `OnScreen` plugin

Open `static/js/modules/onscreen.js` and check out the available options.
