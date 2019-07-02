# Teaser Plugin

This plugin is used whenever content is being linked to another page (i.e. product entry, news post, other cms page).

## Elements

It can be composed of the following elements:

- Emotional Title (i.e. article Title, product title)
- Technical Title (i.e. date, price)
- Image
- Lead Text
- CTA Button

## Templates

There are several default templates to display a teaser plugin (defined in `allink_core/core_apps/allink_teaser/templates/allink_teaser/`).

### Full witdh (parallax)

Spans across the entire content section with a background-image and the contents above it.
It also comes in a parallax version (`fullwidth_parallax`).

### Tile / Grid item

Displays the teaser with an image at the top and all contents below. Intendend to be used in a multi-col layout. It is also used as the default `grid_static` template for [app-content-plugins](../plugins/app-content-plugin.md).

### List

Displays the teaser in a multi-col layout: Image in the left column and the contents in the right column (can be changed if needed). Intendend be used in a single-col content-section.

### Custom templates

If you need to add or change a template you can override it like any other template. If you need to change the `grid_static` template of a app you need to first override the `grid_static` and change the path to the new `tile` template.

## SCSS

The teaser plugin styles are defined on a project basis: `static/scss/plugins/_teaser.scss`.
There are some default styles for the image, title, link etc. followed by the individual template styles. Those styles can be freely changed in each project.

## Settings

The templates are defined in `settings.py`. Additional templates can be added here:

```Python
TEASER_PLUGIN_TEMPLATES = (
    ('tile', 'Tile'),
    ('list', 'List'),
    ('fullwidth', 'Full Width'),
    ('fullwidth_parallax', 'Full Width (Parallax)'),
)
```
