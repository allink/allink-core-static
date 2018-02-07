# Usage

In general, we have two separate javascript files that are being uglified and minified using [Webpack](../overview/webpack.md):

1. `static/js/app.js`: Includes all libraries and tools that are required for the <strong>website</strong>.
2. `static/js/djangocms-custom-admin-scripts.js`: Includes all libraries and tools that are required for the <strong>admin form</strong> of our plugins.

## jQuery vs. Vanilla JS

Since these scripts and libraries are a collection of existing tools, we now have a bit of a mix of coding styles. We tried to unify the code as much as time allowed us to.

Feel free to use what ever coding style you prefer.

## Read the comments

All scripts are farely well documented in the code, and most of them have a block comment at the beginning of the file that explains its usage and options.

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
