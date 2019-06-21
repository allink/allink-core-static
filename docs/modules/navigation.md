# Navigation

When we started working on our Django CMS setup, the requirements of how navigations are supposed to look like were very different from what they are today.

In the past we provided several different types of navigations. Now we only work with `static_placeholder`s instead (in which we place our plugins) which are accessible in a modal via the hamburger

Basically, you have to decide on a project basis, what type of navigation toggle makes most sense for desktop.

Without going into great detail, here is the default approache on how to display a markup rich navigation:

In our `header.html` we have the trigger:

```HTML
<div class="nav-toggle__container">
    <a
        href="#"
        class="nav-toggle"
    >
        <span class="sr-only">{% trans "Toggle navigation" %}</span>
        <div class="nav-toggle__box">
            <div class="nav-toggle__line"></div>
            <div class="nav-toggle__line"></div>
        </div>
    </a>
</div>
```

...and the overlay-menu container:

```HTML
{# overlay menu with duplicated site-header #}
<div id="overlay-menu" class="overlay-menu">
    {% include "includes/header/header-overlay.html" %}
    <div class="overlay-menu__content">
        {% static_placeholder "overlay_menu" %}
    </div>
</div>
```

Which can then be styled in `static/scss/navigation/_overlay-menu.scss`:

```SCSS
.overlay-menu { {
    ...
}
```

## Toggling the desktop navigation's visibility manually

In our `static/js/modules/navigation.js` you can add your own toggle logic if desired.
