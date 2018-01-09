# Navigation

When we started working on our Django CMS setup, the requirements of how navigations are supposed to look like very different from what they are today.

Pretending to be able to predict all future navigations, we created plenty of variables in our `static/scss/base/_variables.scss` that in the meanwhile are not really in use anymore (but are still there, just in case), for we mainly work with `static_placeholder`s instead (in which we place our plugins).

Basically, you have to decide on a project basis, what type of navigation toggle makes most sense for desktop.

Without going into great detail, here are two approaches on how to display a markup rich navigation:

## Using the `softpage` modal

In our `base.html` we have the trigger...

```HTML
<a
  href="#"
  class="hamburger desktop-menu-toggle"
  data-trigger-softpage
  data-softpage-content-id="softpage-menu"
  data-softpage-variation="softpage-menu"
  >
    <span class="sr-only">{% trans "Toggle navigation" %}</span>
    <span class="hamburger-box">
        <span class="hamburger-inner"></span>
    </span>
</a>
<a href="#" class="softpage-menu-toggle" >
```

...and the softpage container:

```HTML
{# the softpage menus that get loaded in the softpage #}
<div id="softpage-menu" style="display: none;">
    {% static_placeholder "softpage_menu" %}
</div>
```

This will open a softpage with an additional `data` attribute:

```HTML
<div class="tingle-modal softpage tingle-modal--visible" data-softpage-variation="softpage-menu">
  ...
</div>
```

Which can then be styled in `static/scss/modals/_softpage.scss`:

```SCSS
.softpage {
    // project specific variations
    &[data-softpage-variation="softpage-menu"] {
        ...
    }
}
```

## Toggling the desktop navigation's visibility manually

In our `static/js/modules/navigation.js` you can add your own toggle logic if desired.
