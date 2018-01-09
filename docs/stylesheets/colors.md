# Colors

Only use colors that are defined as variables in `static/scss/base/_colors.scss`.

## Color variable names

Research and our own experience has shown that the following approach on how to name color variables works best in most cases:

```SCSS
$brand-green:                #some-green-hex-value;
$brand-green-light:          lighten($brand-green,5%);
$brand-green-dark:           darken($brand-green,5%);

$brand-blue:                 #some-blue-hex-value;
$brand-blue-light:           lighten($brand-blue,5%);
$brand-blue-dark:            darken($brand-blue,5%);
```

### Explanation

1. The prefix `$brand-` indicates it is a color related to the project's brand identity.
2. The name of the color is according to its main color group (such as green, red, blue, ...) and is therefore memorable. This approach works well as long as you don't have two tones of the same color group.
3. The variations `-light` and `-dark` are useful for hover effects or borders.

## The `$project-colors` map

Some colors that are defined in CSS are used as e.g. `content-section` background colors.

How to define the colors in CSS:

```SCSS
$project-colors: (
    1: $brand-black,
    2: $brand-grey,
    3: $brand-blue,
);
```

And then, we have to adjust the tuple `PROJECT_COLORS` in our `settings.py` in the <strong>exact</strong> same order:

```Python
PROJECT_COLORS = {
    '#353535': 'project-color-1',  # black
    '#d9d9d9': 'project-color-2',  # grey
    '#4c7caa': 'project-color-3',  # blue
}
```

### Important to note

Unfortunately, we have to define the color's hex value both as a variable and in our settings. So make sure that the hex values you are using are approved from the designer before making them available to the editor.

The reason for this double definition is that our color picker library requires a hex string, that as then stored in the database.

## The `inverted-colors` modifier class

Usually, the default color scheme is <strong>dark text on a bright background</strong>.

When ever the opposite is the case, we refer to this as <strong>inverted colors</strong>.

Standard text, links and most form elements's have variables for both situations. An example:

```SCSS
// default text color
$body-color:              $black;
// inverted text on dark background
$body-inverted-color:     $white;
```

All you have to do is either setting the option `Activate "inverted text colors"` in a [Content Plugin](../plugins/content-plugin.md)'s admin form, or do it manually in a custom template:

```HTML
<div class="example-module">
  default colors applied
</div>
<div class="example-module inverted-colors">
  inverted colors applied
</div>
```
