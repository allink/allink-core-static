# Content Plugin (`allink_core/core_apps/allink_content`)

Our `Content Plugin` is basically the backbone of our page structure. It contains at least one `column` in which `plugins` (text, images, app plugins, ...) can be placed into.

Over the past year the options and features have evolved and been adjusted to meet most of our designer's requirements.

## Adding additional CSS classes to a `content-section`

In our `settings.py`, we have a tuple called `CONTENT_CSS_CLASSES`. As soon as it contains values, a new section `Predefined CSS Classes` will appear in the `Advanced Settings` block of a `Content Plugin`.

These classes are meant for reusable `content-section` styles across the entire site.

```Python
CONTENT_CSS_CLASSES = (
    ('example-class', 'This text will be used for the checkbox label'),
)
```

When selecting this option, our markup will be extended:

```HTML
<div class="content-section example-class">
  ...
</div>
```

In our `static/scss/content-sections/_content-section.scss` we can then add the following:

```SCSS
.content-section {
  ...
  &.example-class {
    // in here we can overwrite existing or add new styles
  }
}
```

## Adding additional templates

Many ways lead to Rome. Most of the time, an additional CSS class as described above will do the job. But sometimes, especially when unusual column widths are required, then it makes sense to add a new column template.

In our `settings.py` we have a tuple called `ADDITIONAL_CONTENT_PLUGIN_TEMPLATES`. Here's an example:

```Python
ADDITIONAL_CONTENT_PLUGIN_TEMPLATES = (
    ('col-2-variation', '2 Columns (Footer)', 2, 'col-1-of-3'),
)
```

### Explanation

- <strong>col-2-variation</strong>: The class that will be added to the template.
- <strong>2 Columns (Footer)</strong>: The human friendly label text for the template dropdown.
- <strong>2</strong>: Amount of `Column Plugin`s that will automatically be created.
- <strong>col-1-of-3</strong>: The thumbnail width alias that per default is used for any images that are placed into a column. Note: This setting is not ideally solved, as there is no way define the width per column. Check out [allink_image_tags](../templates/image.md) for more details on how to add custom thumbnail width aliases.

### Adding styles

Now we can do what ever we like with this custom template:

```SCSS
.content-section {
    &__template__col-2-variation {
      ...
    }
```

It might help to check out the default column styles in `node_modules/allink-core-static/scss/content-sections/_content-section.scss` in the section `Column Definitions`.

## Global spacings between content sections

Should you want to adjust the spacings of content sections, open `static/scss/base/_variables.scss`, search for `=section` to jump to the section and update the spacings for each breakpoint as desired.

The rest is already being taken care of in the `allink-core-static` repository.

## Hiding the features/options that are not required

This can help to reduce confusion among editors. The less they can do, the better. Keep it simple.

Currently, the only way to hide form fields is by using CSS. Open the file `static/scss/djangocms-custom-admin-style.scss` and add the following lines:

```SCSS
// hide unused fields
.field-overlay_enabled,
.field-full_height_enabled,
.field-ignore_in_pdf {
    display: none;
}
```

Please note: This is just an example. Make sure to only hide fields that are not in use for your project.

### How to figure out the name of the field

1. Browse the `allink-core` version defined in your `requirements.in` on github, open the file `allink_core/core_apps/allink_content/models.py` and copy the desired model field names.
2. Create a new `Content Plugin` or edit an existing one, and inspect the desired form element with a DevTool and copy the class name.

