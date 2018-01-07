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
