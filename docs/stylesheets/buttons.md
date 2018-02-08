# Buttons

We copied bootstrap's concept, but tailored it to our needs.

## Styling button variations

Setting the button styles is done in `static/scss/base/_variables.scss`. Search for `=button`.

This is pretty self-explaining.

## Usage

IMPORTANT: Never use the default bootstrap classes. We define button styles in SCSS only. Why? Flexibility!

Here's an example of a module that is used in a default section and in the `inverted-colors` context:

### Markup

```HTML
<!-- content-section: default -->
<div class="content-section">
  <div class="example-module">
    <a href="#" class="example-module__link">
      Link Text
    </a>
  </div>
</div>
<!-- content-section: inverted-colors -->
<div class="content-section inverted-colors">
  <div class="example-module">
    <a href="#" class="example-module__link">
      Link Text
    </a>
  </div>
</div>
```

### SCSS

```SCSS
.example-module {
  &__link {
    // adds the global button styles
    @include button-base();
    // adds the variation styles
    @include button-variation('default');
    // when in inverted-colors context, change styles
    .inverted-colors & {
      @include button-variation('primary');
    }
  }
}
```

## ButtonLinkPlugin: Make only styled buttons available

When adding a link via our ButtonLinkPlugin, you can choose between button variations.

Usually a project has only 1 or 2 variations, so we don't want to make inactive button styles available.

To achieve this, we have a `$available-btn-variations` map defined in `static/scss/base/_variables.scss`, in which the keywords of the available button variations are defined.

For example: If our project only uses the `default` button variation:

```SCSS
$available-btn-variations: (
    'default',
);
```
