# Buttons

We copied bootstrap's concept, but tailored it to our needs.

## Styling button variations

Setting the button styles is done in `static/scss/base/variables/_forms.scss`. Search for `=button`.

This is pretty self-explaining.

## Usage

IMPORTANT: Never use the default bootstrap classes.

<strong>We define button styles in SCSS only.</strong> Why? Flexibility!

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
    @include button-variation('primary');
    // when in inverted-colors context, change variation
    .inverted-colors & {
      @include button-variation('secondary');
    }
  }
}
```

## Features

### Masking Effect

Via the variables `static/scss/base/variables/_forms.scss` you can enable and adjust an effect which animates the background color like a mask:

#### SCSS

```SCSS
$btn-mask-transition-enabled:                       true;
$btn-mask-transition-duration:                      ease;
$btn-mask-transition-timing-function:               300ms;
$btn-mask-transition-direction-starting-point:      'bottom'; // top, right, bottom or left
```

#### Markup

For the masking effect to work you need to add the `.btn__text--mask` markup to your button:

```HTML
<a href="" class="button-link-plugin__link">
    <span class="button-link-plugin__text">
        Read more
    </span>
    <span class="btn__text--mask">
        <span class="btn__text--mask__inner">
            Read more
        </span>
    </span>
</a>
```


### Default Icons

There are 2 default icons pre-defined for buttons:

- Plus for softpage links
- Arrow for external links

These icons can be changed in `static/scss/base/variables/_forms.scss`.
Additional icons must be added on a project basis in `static/scss/form/_buttons.scss`:

```SCSS
button {
    @include button-base();
    @include button-variation('default');
    // Button Softpage
    &[data-softpage-variation] {
        @include button-icon($icon:'plus');

    }
    &[target=_blank] {
        @include button-icon($icon:'arrow');
    }
}
```

## ButtonLinkPlugin: Make only styled buttons available

When adding a link via our ButtonLinkPlugin, you can choose between button variations.

Usually a project has only 1 or 2 variations, so we don't want to make inactive button styles available.

To achieve this, we have a `$available-btn-variations` map defined in `sstatic/scss/base/variables/_forms.scss`, in which the keywords of the available button variations are defined.

For example: If our project only uses the `default` button variation:

```SCSS
$available-btn-variations: (
    'default',
);
```
