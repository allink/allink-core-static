# Spacings

In regards of inconsistencies and overusing of `$grid-gutter-width` we know use pre-defined spacings wherever possible and specified by the design.

In each design spec a styleguide is defined which contains all spacings used in the project. Most of the time it contains up to 10 different spacings which have a mobile size and a desktop size per default.

They scale in the same way as the [fonts](../stylesheets/typography.md)

## Making the spacings available

Head over to `static/scss/base/variables/_spacings.scss` where you will find a default set of spacings.

## Font breakpoints

In our `$spacings-breakpoints` map we define available breakpoints at which a spacing can change. They are identical to our grid breakpoints, but custom breakpoints can be added when desired.

Depending on a project the amount of spacings sizes vary. But here's an example:

```SCSS
$spacings-sizes: (
    spacing-section-1: (
        null:   6.25rem, // 100px
        lg:     11.25rem, // 180px
    ),
    spacing-section-2-1: (
        null:   5rem, // 80px
        lg:     6.25rem, // 100px
    ),
    spacing-scale-2: (
        null:   2.5rem, // 40px
        lg:     3.75rem, // 60px
    ),
    ...
);
```

## Using the spacings using <strong>mixins</strong>

And this is how you would apply the spacings styles:

```HTML
<div class="example-module">
  <h3 class="example-module__heading">
    Example Heading Text
  </h3>
  <div class="example-module__image">
      <img src="...">
  </div>
</div>
```

And now let's define how this spacing between the `heading` and the `image` should look like:

```SCSS
.example-module {
  &__heading {
    @include font-h1();
  }
  &__image {
    @include spacings-size('spacing-scale-2', margin-top);
  }
}
```

## Spacings mixin options

The `spacings-size` mixin provides the following arguments:

- `spacing-name` The string from `$spacings-sizes` or a pixel value
- `property-name` can be `property-top`, `property-bottom` or `property` for top and bottom. Best to use are `margin` and `padding`
- `$negative`: Default: `false`. If `true` given spacing property will be **negative**<br>(e.g. `@include spacings-size('spacing-scale-2', margin-top, $negative: true);`)

## Spacings as variables

In order to replace the usage of `$grid-gutter-width` it is now possible to set a spacing as a common spacing variables.

### Example app-content-plugin (`static/scss/base/variables/_app-content-plugin.scss`)

```SCSS
$app-detail-header-section-spacing-top:               'spacing-scale-2'; // pixel-value or spacing value. set to 'false' if no spacing should be used
$app-detail-header-section-spacing-bottom:            'spacing-scale-4'; // pixel-value or spacing value. set to 'false' if no spacing should be used
```

## Fluid spacing scaling

All spacings scale **fluidly** according to the same formula as the [font-sizes](./typography.md):

### Important to note

This is still under development and maybe change in the future as we learn further how to best use spacings.
