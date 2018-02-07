# Editor

Rich text is added via the `TinyMCE` editor. There are a few things to know when working with our setup:

## Settings

In our `settings.py` there is a variable called `CKEDITOR_SETTINGS` through which we configure the editor. Basically there's nothing to adjust here apart from `stylesSet`.

### Limit available heading sizes

The amount of available heading sizes varies from project to project. After defining the [typography](../stylesheets/typography.md) styles, make sure to comment all heading sizes that are NOT being used.

## Heading logic

According to SEO best practice there can only be one `<h1>` tag on a page. Since our setup already takes care of this `<h1>` tag, headings added via editor start with `<h2>` upwards.
