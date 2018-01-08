# Buttons

To apply a button style to a link, it is allowed to either use the bootstrap classes, but preferably we use the button mixins provided to increase the flexibility:

```HTML
<!-- default button style using the button class in the markup -->
<a href="#" class="btn btn-default"></a>
<!-- this link will be styled using the mixins -->
<div class="example-module">
  <a href="#" class="example-module__link"></a>
</div>
```

In this is how to style the second button:

```SCSS
.example-module {
  &__link {
    @include button-base();
    @include button-variation('default');
  }
}
```

## Styling buttons

Head over to your `static/scss/base/_variables.scss` and search for `=button` and modify the color of the text, background and borders as defined in the styleguide.

## Enable only buttons that are being used

In the `$available-btn-variations` map, define which button styles can be selected when adding a link via our `Button Link Plugin`. An example:

```SCSS
$available-btn-variations: (
    'default',
);
```

Note: This does not affect the [styleguide](../templates/styleguide.md) buttons, as it can be used to style a button that afterwards will be available.
