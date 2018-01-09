# App Content Plugin

## Spacings

Over time we figured out a way to manage spacings across the site (that includes `content-section`'s, app plugin content and detail views). But it is important to stick to these helper classes.

### App Plugin (List View): `manage-spacings`

When e.g. `Grid (Static)` is used to list app entries, all the meta data (preview image, title, date, lead, "read on" link, ...) have to be children of a `manage-spacings` container:

```HTML
<div class="grid-item">
  <div class="manage-spacings">
    <div class="image-container">
      ...
    </div>
    <div class="heading-container">
      <h2 class="heading">
        ...
      </h2>
    </div>
    <div class="text-container">
      ...
    </div>
    <div class="link-container">
      ...
    </div>
  </div>
</div>
```

These spacings, among others, can be defined in `static/scss/base/_variables.scss`. Search for `=list` and look for e.g. `$manage-spacings-container-xs`.

### App Plugin (Detail View)

Currently, we are still in the process of defining a standard for the detail template of app content. Most project require custom adjustments, which makes it pretty much impossible to predict them all and providing variables for every solution.

So if default structure is used, then you can make use of the available variables in `static/scss/base/_variables.scss`. Search for `=detail`.
