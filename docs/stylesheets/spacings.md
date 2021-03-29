# Spacings

In regards of inconsistencies and overusing of `$grid-gutter-width` we now use pre-defined spacings wherever possible and specified by the design.

In each design spec a styleguide is defined which contains all spacings used in the project. Most of the time it contains up to 10 different spacings which have a mobile size and a desktop size per default.

There are vertical and horizontal spacings. We differentiate them with the prefixes x and y.

They scale in the same way as the [fonts](../stylesheets/typography.md)

## Making the spacings available

Head over to `static/scss/base/variables/_spacings.scss` where you will find a default set of spacings.

## Fluid sizings

In our `$spacings-sizes` map we define a minimum and a maximum size for each spacing for the smallest and biggest breakpoint respectively (defined in `scss/base/_grid.scss`).
In between those two breakpoints the spacings are being calculated fluidly. Some spacings do not scale and therefore only use a min size.

Depending on a project the amount of spacings sizes vary. But here's an example:

```SCSS
$spacings-sizes: (
    'y-section-1': (
        min: to-rem(140px),
        max: to-rem(240px)
    ),
    'y-section-2': (
        min: to-rem(120px),
        max: to-rem(180px)
    ),
    ...
    'y-scale-1': (
        min: to-rem(60px),
        max: to-rem(80px)
    ),
    'y-scale-2': (
        min: to-rem(50px),
        max: to-rem(60px)
    ),
    ...
    'y-equal-1': (
        min: to-rem(50px)
    ),
    'y-equal-2': (
        min: to-rem(40px)
    ),
    ...
    'x-scale-1': (
        min: to-rem(35px),
        max: to-rem(50px)
    ),
    'x-scale-2': (
        min: to-rem(25px),
        max: to-rem(50px)
    ),
    ...
);
```

## Using the spacings with <strong>mixins</strong>

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
    @include spacings-size('y-scale-2', margin-top);
  }
}
```

## Spacings mixin options

The `spacings-size` mixin provides the following arguments:

- `spacing-name` The string from `$spacings-sizes` a custom map (i.e. (min: 1rem, max: 5rem)) or a pixel value
- `property-name` can be `property-top`, `property-bottom` or `property` for top and bottom. Best to use are `margin` and `padding`
- `$negative`: Default: `false`. If `true` given spacing property will be **negative**<br>(e.g. `@include spacings-size('y-scale-2', margin-top, $negative: true);`)

## Spacings as variables

In order to replace the usage of `$grid-gutter-width` it is now possible to set a spacing as a common spacing variables.

### Example app-content-plugin (`static/scss/base/variables/_app-content-plugin.scss`)

```SCSS
$app-detail-header-section-spacing-top:               'y-scale-2'; // pixel-value or spacing value. set to 'false' if no spacing should be used
$app-detail-header-section-spacing-bottom:            'y-scale-4'; // pixel-value or spacing value. set to 'false' if no spacing should be used
```

## Fluid spacing scaling

All spacings scale **fluidly** according to a similar formula as the [font-sizes](./typography.md):

### Important to note

This is still under development and maybe change in the future as we learn further how to best use spacings.
