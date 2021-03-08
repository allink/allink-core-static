# Properties order

We encourage the following order how the CSS should be organized inside a file / selector.

1. Mixins
2. Alphabetical CSS properties order
3. Pseudo classes
4. Media-Queries from small to big / down to up

# Units

Use rems over pixels for everything regarding sizes (i.e. font-size, margin, padding, height, width, etc.).
Rems are based of [16px (root size)](../stylesheets/typography.md#adjusting-font-settings).

Working with rems is easy using the `to-rem` SCSS function. It allows you to work with pixels but converts the values to rem.

```SCSS
.example-module {
  margin-top: to-rem(20px);
}
```

# BEM methodology

There are many methodologies out there that help making SCSS files more maintainable and performant.

Most of our `allink-core` templates have been updated to the [BEM methodology](http://getbem.com/).

## Basic example: Markup and SCSS

```HTML
<div class="example-module">
  <header class="example-module__header">
    ...
  </header>
  <div class="example-module__content">
      ...
  </div>
  <footer class="example-module__footer">
      ...
  </footer>
</div>
```

This can then be styled using SCSS:

```SCSS
.example-module {
  &__header {}
  &__content {}
  &__footer {}
}
```
