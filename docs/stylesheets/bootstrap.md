# Bootstrap

When we first started with the `allink-core-static`, we didn't start entirely from scratch, but re-used some tools and logics from the old setup.

This is why we still use some features of `bootstrap v3` & `bootstrap v4 (Grid)` and copied all necessary styles and mixins directly into `allink-core-static`.

## How to use these features

Generally, we try to do everything with CSS, rather than setting classes in the markup.

### Features we use

- The main feature we use on a regular basis is the [grid](grid.md).
- We are using the [bootstrap-select](../modules/bootstrap-select.md) library, which is obviously based on bootstrap.

### SEO: Making text invisible but still crawlable

The only exception I can come up when it is okay to directly set a CSS class in the markup is with the `sr-only` utilility class (which stands for <strong>ScreenReader only</strong>).

Let's say you have a clickable icon, then I would recommend the following markup:

```HTML
<a class="example-module__link">
  <span class="sr-only">Example Text</span>
</a>
```

