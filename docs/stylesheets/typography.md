# Typography

We researched and tested quite a few approaches, and this is the result that has been proven to be very flexible and easy to manage/use.

## Loading web fonts

Web fonts can either be added as a direct include in the `<head>` (which sometimes is the only way), but also using `@import`. When ever possible, add a web font using `@import` (when using a font service) or via `@font-face` (when font is self-hosted) in the file `static/scss/typography/_global.scss`.

This makes the web font available in the CMS [editor](../modules/editor.md), which increases the look and feel for editors, and the feeling for text length is more accurate.

## Making the fonts available

Head over to `static/scss/base/variables/_typography.scss` and search for `=typo`, which will bring you to the typography section.

Depending on a project the amount of font styles varies. But here's an example:

```SCSS
$font-family-primary:        'example-font', Helvetica Neue Regular, Arial, sans-serif;
$font-family-bold:           'example-font-bold', Helvetica Neue Bold, Arial, sans-serif;
$font-family-italic:         'example-font-italic', Helvetica Neue Italic, Arial, sans-serif;
```

## Font breakpoints

In our `$font-size-breakpoints` map we define available breakpoints at which a font size can change. They are identical to our grid breakpoints, but custom breakpoints can be added when desired.

## Adjusting font settings

The **root** font-size is `16px`.<br> This means that we have to divide the font-sizes from the design spec by `16`:<br><br>
**Size design spec**:    `20px`<br>
**Size rem**:            `1.25rem // 20/16`<br>

Let's have a look at the self-explaining `h1` settings:

```SCSS
// h1
$font-h1-font-sizes: (
    null: (2.25rem, 1.1em),
    lg: 3.75rem,
);
$font-h1-text-transform:                     none;
$font-h1-letter-spacing:                     0;
$font-h1-antialiased-enabled:                true;
$font-h1-font-weight:                        normal;
$font-h1-font-family:                        $font-family-secondary;
$font-h1-crop-top:                           0em;
$font-h1-crop-bottom:                        0em;
```

## Fluid font scaling

All font-sizes scale **fluidly** according to the following formula:

```SCSS
h1 {
    font-size: 2.25rem; // smallest font-size
    @media (min-width: 20rem) { // smallest breakpoint
        // font-size: calc(#{$smallest-font-size} + #{$biggest-font-size - $smallest-font-size} * (100vw - #{$smallest-breakpoint}) / 100);
        font-size: calc(2.25rem + (3.75rem - 2.25rem) * (100vw - 20rem / 100);
    }
    @media (min-width: 100rem) { // largest breakpoint
        font-size: 3.75rem;
    }
}
```

[Codepen Example](https://codepen.io/depone/pen/pEbOVm)

## Using the font settings using <strong>mixins</strong>

And this is how you would apply the font styles:

```HTML
<div class="example-module">
  <h3 class="example-module__heading">
    Example Heading Text
  </h3>
</div>
```

And now let's define how this heading should look like:

```SCSS
.example-module {
  &__heading {
    @include font-h1();
  }
}
```

### Important to note

Without any styles applied, the HTML-tag `<h3>` appears in the default body font style, but its semantic meaning (heading hierarchy) is important to a clear document structure.

So the mixin `@include font-h1();` doesn't have anything to do with the HTML-element `<h1>`. It is only a generic name that stands for the largest heading.

## Text Cropping

Text cropping helps to remove the space above and below a block of text caused by line height.

### Configuration

Because every font has different metrics, the cropping values must be configured on a project basis.
There are crop top and crop bottom variables for headings, lead, paragraph etc. Head over to `static/scss/base/variables/_typography.scss` to update these variables.

The [online tool](http://text-crop.eightshapes.com/) by EightShapes helps finding the correct values for your font.

### Mixin

Use the mixin `text-crop` to apply text cropping in specific cases or override defaults.

```SCSS
.special-title {
    @include text-crop($crop-top: 0.4em, $crop-bottom: 0.25em);
}
```
