# Typography

We researched and tested quite a few approaches, and this is the result that has been proven to be very flexible and easy to manage/use.

## Loading web fonts

Web fonts can either be added as a direct include in the `<head>` (which sometimes is the only way), but also using `@import`. When ever possible, add a web font using `@import` (when using a font service) or via `@font-face` (when font is self-hosted) in the file `static/scss/typography/_global.scss`.

This makes the web font available in the CMS [editor](editor.md), which increases the look and feel for editors, and the feeling for text length is more accurate.

## Making the fonts available

Head over to `static/scss/base/_variables.scss` and search for `=typo`, which will bring you to the typography section.

Depending on a project the amount of font styles varies. But here's en example:

```SCSS
$font-family-primary:                   'example-font', Helvetica Neue Regular, Arial, serif;
$font-family-bold:                      'example-font-bold', Helvetica Neue Bold, Arial, serif;
$font-family-italic:                    'example-font-italic', Helvetica Neue Italic, Arial, serif;
```

## Font breakpoints

In our `$font-size-breakpoints` map we define available breakpoints at which a font size can change. They are identical to our grid breakpoints, but custom breakpoints can be added when desired.

## Adjusting font settings

Let's have a look at the `h1` settings:

```SCSS
// h1
$font-h1-font-sizes: (
    null: (4.5rem, 1),
    md: 5.5rem,
    xxl: 5.7rem,
);
$font-h1-text-transform:                     none;
$font-h1-letter-spacing:                     0;
$font-h1-antialiased-enabled:                true;
$font-h1-font-weight:                        normal;
$font-h1-font-family:                        $font-family-secondary;
```

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
