# Grid

One of the very few [bootstrap](bootstrap.md) features we use are the <strong>grid mixins</strong>, which we extended with additional breakpoints and column paddings.

<strong>NEVER</strong> use CSS classes in the markup, only use the Sass mixins provided.

## Using the Sass mixins

A basic example of how to create a two column grid would look like this:

### Markup

```HTML
<div class="example-module">
  <div class="example-module__col-container">
    <div class="example-module__col example-module__col-1">
      ...
    </div>
    <div class="example-module__col example-module__col-2">
      ...
    </div>
  </div>
</div>
```

### SCSS

```SCSS
.example-module {
    &__col-container {
      // adds negative margin to the container
      @include make-row();
      // on XS and SM we have a smaller column padding
      @include make-row-sm-max();
  }
  &__col {
      // Make the element grid-ready (applying everything but the width)
      @include make-col-ready();
  }
  &__col-1 {
      @include media-breakpoint-up(xs) {
          @include make-col(24);
      }
      @include media-breakpoint-up(sm) {
          @include make-col(12);
      }
      @include media-breakpoint-up(lg) {
          @include make-col(8);
      }
  }
  &__col-2 {
      @include media-breakpoint-up(xs) {
          @include make-col(24);
      }
      @include media-breakpoint-up(sm) {
          @include make-col(12);
      }
      @include media-breakpoint-up(lg) {
          @include make-col(16);
      }
  }
}
```

## Defining `$grid-gutter-width`

At the beginning of a project we have to define the gutter width of our grid. This can be done in `static/scss/base/_grid.scss`.

## Defining `$grid-columns`

We use a `24` column grid. This setting should not be changed.

Should you require a `5` column layout (which is tricky with `24`), simply do the following:

```SCSS
.example-module {
  ...
  &__col {
    ...
    @include media-breakpoint-up(xs) {
          @include make-col(24);
    }
    @include media-breakpoint-up(sm) {
        @include make-col(12);
    }
    @include media-breakpoint-up(lg) {
        width: 20%;
    }
  }
}
```
