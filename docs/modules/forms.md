# Forms

Standard forms are styled and work out of the box.

## Style variables

In our `static/scss/base/_variables.scss` we have variables for all our form elements.

Here's a list of search commands that bring you to the desired section:

- Form (general): `=form`
- Fieldset and legend: `=fieldset`, `=legend`
- Text input: `=field`
- Text input (inverted colors): `=fieldinv`
- Checkbox: `=checkboxes`
- Radio: `=radio`
- Buttons: `=buttons`
- Select: `=select`
- Dropdown: `=dropdown`
- File upload: `=file`
- Datepicker: `=datepicker`

Note: As you see, not all elements have inverted colors variables, as there was no requirement so far, but this can easily be added on a project basis.

## Markup

The markup is defined in our `allink-core`.

## Available form variations

### default: stacked

Per default our forms groups (made up from label and form element) are stacked vertically. If that's what you want, you don't have to do anything further.

### `side-by-side`

Should you want the label and form element displayed horizontally, then add the class `side-by-side` to the form:

```HTML
<form action="#" class="form-default side-by-side">
  ...
</form>
```

Now head over to `static/scss/base/_variables.scss` and search for `=side` to find the section with available variables.

### `placeholder-enabled`

Should you want the label to be hidden and to use the placeholder attribute instead, add the class `placeholder-enabled` to the form:

```HTML
<form action="#" class="form-default placeholder-enabled">
  ...
</form>
```

Now head over to `static/scss/base/_variables.scss` and search for `=placeholder` to find the section with available variables.
