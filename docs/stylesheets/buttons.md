# Buttons

We copied bootstrap's concept, but tailored it to our needs.

## Styling button variations

Setting the button styles is done in `static/scss/base/variables/_buttons.scss`.

This is pretty self-explaining.

## Template partial options

There are several options available to customize a link when including the template partial:

  - URL: `link_url="https://allink.ch"`
  - Label: `link_label="Button"`
  - CSS classes: `link_classes="my-button"`
  - HTML attributes: `link_attributes="data-softpage data-trigger-softpage"`
  - SVG Icon: `icon="softpage"`
  - ID: `link_id="test-1"`
  - Modal header title: `modal_header_title="Latest news"` (Default: `link_label`)

## Usage

Here's an example of a module that is used in a default section and in the `inverted-colors` context:

### Markup

```HTML
<!-- content-section: default -->
<div class="content-section">
  <div class="example-module">
    {% include "partials/buttons/link.html" with link_url="https://allink.ch" link_label="allink AG" link_classes="example-module__link" %}
  </div>
</div>
<!-- content-section: inverted-colors -->
<div class="content-section inverted-colors">
  <div class="example-module">
    {% include "partials/buttons/link.html" with link_url="https://allink.ch" link_label="allink AG" link_classes="example-module__link" %}
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

### Softpage links

If you need to create a softpage link directly in the markup add `link_attributes="data-softpage data-trigger-softpage"` as a argument to the include tag. To change `modal-header-markup` from the default link_label add the `modal_header_title="Title"` argument.

### Masking Effect

The masking effect is depended upon a button variation. Here's an example on how to activate the effect in:

```SCSS
.example-module {
  &__link {
    // adds the global button styles
    @include button-base();
    // adds the variation styles
    @include button-variation('default');
    @include button-mask-effect('default');
  }
}
```

Via the variables `static/scss/base/variables/_forms.scss` you can adjust an effect which animates the background color like a mask:

#### SCSS

```SCSS
$btn-mask-transition-duration:                      ease;
$btn-mask-transition-timing-function:               300ms;
$btn-mask-transition-direction-starting-point:      'bottom'; // top, right, bottom or left
```


### Default Icons

There are 2 default icons pre-defined for buttons:

- 'Plus' for softpage links
- 'Arrow' for external links

These icons can be changed in `static/scss/base/variables/_buttons.scss`.
Additional icons must be added on a project basis in `static/scss/form/_buttons.scss` and the corresponding SVG file must exist in `static/icons`.

To activate an icon on a button you need to the icon property on the `link` partial include:
```HTML
{% include "partials/buttons/link.html" with ... icon='softpage' %}
```

```SCSS
button {
    @include button-base();
    @include button-variation('default');
    // Button Softpage
    &[data-softpage] {
        @include icon-softpage();

    }
    &[target=_blank] {
        @include icon-external-link();
    }
}
```

The icon position (left or right) must be defined within the icon mixin. By default the icon is hidden and you have to enable it like this:

```SCSS
@mixin icon-external-link() {
    &:hover,
    &:focus {
        .link-icon {
            transform: rotate(45deg);
            transition-property: transform;
        }
    }
    .link-icon {
        &--right {
            display: inline-flex;
        }
    }
}
```


## ButtonLinkPlugin: Make only styled buttons available

When adding a link via our ButtonLinkPlugin, you can choose between button variations.
<br>
Usually a project has only 1 or 2 variations, so we don't want to make inactive button styles available.
<br><br>
To achieve this, we have a `BUTTON_CONTEXT_CHOICES` map defined in `settings.py`, in which the keywords of the available button variations are defined. The default variation is always available.

```python
BUTTON_CONTEXT_CHOICES = (
    ('primary', 'Primary',),
)
```
