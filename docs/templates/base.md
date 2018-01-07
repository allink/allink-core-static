# `base.html`

Starting from the `allink-boilerplate-1.0`, the only template we have at the beginning is `base.html`. It extends the `base_root.html` template which should not be necessary to be overwritten on a project basis.

## Adjust, but be careful

The basic template contains CSS `classes` and `data-attributes` that go hand-in-hand with our [stylesheets](stylesheets/concept.md) and [javascript](javascript/usage.md) files. It is therefore wise to check out the [SCSS variables](stylesheets/variables.md).

## Header

By adding the additional class `compact-mode-enabled` to our `site-header`, for example, we add the functionality that creates a smaller sized header when scrolling. This will trigger an additional class using javascript and resized the header and logo according to the CSS variables.

### Hamburger and Navigation

The website's navigation is made using a `static_placeholder` that is being displayed (triggered) in two different ways:

1. Mobile: A special container that has a specific transition.
2. Desktop: Per default we use our `softpage` to display the navigation, but the can be changed to anything on a project basis.

The styles for the hamburger can be changed in `static/scss/navigation/_nav-toggle.scss`.

## Content



## Footer

For our footer we use a `static_placeholder`, as it occurs across the entire website. That's why we put it in a separate `site-footer` container.

Ideally, our `Content Plugin` is used to build the footer's structure, for then all the logic, options and features are available.

## To the top

Our `to-the-top` element is also working and displayed per default. Should you want to hide it simply comment the entire block.

