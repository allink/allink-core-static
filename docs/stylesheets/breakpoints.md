# Breakpoints

The available breakpoints are defined in `static/scss/base/_grid.scss`.

It is not recommended to change these breakpoints, for our [render_image](../templates/image.md) tag uses the exact same ones.

## Custom breakpoints

Should you require a custom breakpoint, feel free define a new variable or to create one on the spot:

```SCSS
// reusable variable
$custom-breakpoint: 31.25rem; // 500px;
@media (min-width:$custom-breakpoint) {
  ...
}
// on the spot
@media (min-width: 31.25rem) {
  ...
}
```
