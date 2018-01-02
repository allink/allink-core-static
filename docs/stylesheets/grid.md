# Grid

One of the only bootstrap features we use are the <strong>grid mixins</strong>.

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
    // clearing due to float
    @include clearfix();
    // adds negative margin to the container
    @include make-row();
    // on XS and SM we have a smaller column padding
    @include make-row-sm-max();
  }
  &__col {
    // add smaller column padding on XS and SM
    @include column-padding-sm-max();
  }
  &__col-1 {
    @include make-xs-column(24);
    @include make-sm-column(12);
    @include make-lg-column(8);
  }
  &__col-2 {
    @include make-xs-column(24);
    @include make-sm-column(12);
    @include make-lg-column(16);
  }
}
```
