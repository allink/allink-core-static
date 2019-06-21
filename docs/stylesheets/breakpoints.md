# Breakpoints

The available breakpoints are defined in `static/scss/base/_grid.scss`.

We provide 6 basic breakpoints (`xs` to `xxl`) for general usage.
In total there are 18 breakpoints (split into 80px gaps) to have the ability to fine-tune layouts in together with the design team.<br>
It is not recommended to change these breakpoints, for our [render_image](../templates/image.md) tag uses the exact same ones.<br>
Because the breakpoints are defined in a map, it's possible to calculate minimal and maximum sizes between given breakpoints. Between each breakpoint there is a gap of `0.02px`.

## Media queries

We provide the 4 mixins to media queries with the pre-defined breakpoints.

### Usage

```SCSS
@include media-breakpoint-up(lg) {
  color: $brand-color;
}
```

### media-breakpoint-up

Equivalent to `min-width`: from the given breakpoint and wider.

```SCSS
@include media-breakpoint-up(lg) {
  ...
}
```

### media-breakpoint-down

Equivalent to `max-width`: from the given breakpoint and narrower.

```SCSS
@include media-breakpoint-down(lg) {
  ...
}
```

### media-breakpoint-between

Only between the given breakpoints.

```SCSS
@include media-breakpoint-between(md, lg) {
  ...
}
```

### media-breakpoint-only

Only to the given breakpoint, not viewports any wider or narrower.

```SCSS
@include media-breakpoint-only(lg) {
  ...
}
```

## Custom breakpoints

Should you require a custom breakpoint, feel free define a new variable or to create one on the spot:

```SCSS
// reusable variable
$custom-breakpoint: 500px;
@media (min-width:$custom-breakpoint) {
  ...
}
// on the spot
@media (min-width: 500px) {
  ...
}
```
