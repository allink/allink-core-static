# Mixins

Here is a incomplete list of some helpful mixins:

## fluid-size

With this mixin you can make any sizing property (margins, spacing, height, width, etc) scale fluidly between a "min" and a "max" breakpoint.

Example:

```SCSS
@include fluid-size((min: 1rem, max: 5rem), margin-top);
```

