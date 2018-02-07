# Usage

In general, we have two separate SCSS files that are being minified and autoprefixed using [Webpack](../overview/webpack.md):

1. `static/scss/style.scss`: Includes all libraries and styles that are required for the <strong>website</strong>.
2. `static/scss/djangocms-custom-admin-style.scss`: Includes all styles that are required for the <strong>admin form</strong> of our plugins.

## Read the comments

Most stylesheets are farely well documented in the code.

## When the `allink-core-static` styles don't do what's required

Unlike with [Javascript](../javascript/usage.md), we grouped SCSS partials and import only the `_base.scss` of each group. This approach helped as when introducing a new module within a group, which would then automatically be imported, too.

The following example imports all available [modal](../modules/modals.md) styles:

```SCSS
@import '~allink-core-static/scss/modals/base';
```

So should you want to make adjustments to e.g. the `form-modal` styles, then you would have make them in a project specifc `static/scss/modals/_form.scss`, which has to be imported <strong>after</strong> the standard styles, in order to overwrite the core styles.
