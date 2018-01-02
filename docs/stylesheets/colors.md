# Colors

Only use colors that are defined as variables in `_colors.scss`.

## Color variable names

Research and our own experience has shown that the following approach on how to name colors variables works best in most cases:

```SCSS
$brand-green:                #some-green-hex-value;
$brand-green-light:          lighten($brand-green,5%);
$brand-green-dark:           darken($brand-green,5%);

$brand-blue:                 #some-blue-hex-value;
$brand-blue-light:           lighten($brand-blue,5%);
$brand-blue-dark:            darken($brand-blue,5%);
```

### Explanation

1. The prefix `$brand-` indicates it is only used for this project.
2. The name of the color is according to its main color group (such as green, red, blue, ...) and is therefore memorable.
3. The variations `-light` and `-dark` are useful for hover effects or borders.
