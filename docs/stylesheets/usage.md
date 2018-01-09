# Usage

In general, we have two separate CSS files that are being minified and autoprefixed using [Webpack](../overview/webpack.md):

1. `static/scss/style.scss`: Includes all libraries and styles that are required for the <strong>website</strong>.
2. `static/scss/djangocms-custom-admin-style.scss`: Includes all styles that are required for the <strong>admin form</strong> of our plugins.

## Read the comments

All stylesheets are farely well documented in the code.

## Customize, but think twice

Should a script miss a feature, a project specific version can be created and included while commenting the core include:

```JS
// allink-core-static includes
...
// import 'allink-core-static/js/modules/pagechooser';
...

// Project specifc includes
...
import './modules/pagechooser';
...
```

<strong>But remember:</strong> Before you add a project specifc version, ask yourself: Might this feature be reused and does it make more sense to update the `allink-core-static` instead? If in doubt or do you have a feature request, get in touch with the responsible person at allink.
