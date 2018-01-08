# Image

Over time we created an intelligent and extendable template tag called `render_image`. It works dynamically for any kind of image that has been added via an image field. The final output is a `<picture>` tag that delivers the correct image source according to the screen's size and pixel density.

## How to use the `allink_image_tags`

First of all we have to load `allink_image_tags`:

```HTML
{% load allink_image_tags %}
```

And then we can pass an image object and optional parameters to our template tag `render_image`:

```HTML
{% render_image image=object.preview_image %}
```

### Optional parameters

- `ratio`: Default value is `3-2`. This can be any ratio on the fly e.g. `5-3`, `16-9`
- `width_alias`: Images placed into a `Column` and images added with any of the `App Plugin`s (e.g. when using the Grid (Static) template for the `Work` app) are sized automatically, for `render_image` knows in which context it is being used. But should you require a specific size or ratio, then you can add any of the default `THUMBNAIL_WIDTH_ALIASES` defined in `settings.py`, are add your own (described below).
- `icon_disabled`: Default is `false`. Disables the loading animation.
- `bg_disabled`: Default is `false`. Disables the images background (useful with transparent PNGs).
- `bg_color`: Default is `false`. Replaces the default background color with any of the colors defined in `PROJECT_COLORS` in your `settings.py`. Important: Only use the number e.g. `1`, `2`, NOT the entire value `project-color-1`. More details in the [color](../stylesheets/colors.md) section.

## Add your own `width_alias`

Let's say you require an image that is square (`1-1`) on mobile and rectangular (e.g. `2-1`) on desktop.

Open `settings.py`, find the `THUMBNAIL_WIDTH_ALIASES` tuple and add your own. For example:

```Python
THUMBNAIL_WIDTH_ALIASES = {
  ...
  'example-width-alias': {
      'xs': {'width': 450, 'ratio': '1-1'},
      'sm': {'width': 400, 'ratio': '2-1'},
      'xl': {'width': 400, 'ratio': '2-1'}
  }
}
```

And here's how to use it:

```HTML
{% render_image image=object.preview_image width_alias="example-width-alias" %}
```
