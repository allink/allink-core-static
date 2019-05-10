# Navigation

When we started working on our Django CMS setup, the requirements of how navigations are supposed to look like were very different from what they are today.

In the past we provided several different types of navigations. Now we only work with `static_placeholder`s instead (in which we place our plugins) which are accessible in a modal via the hamburger

Basically, you have to decide on a project basis, what type of navigation toggle makes most sense for desktop.

Without going into great detail, here are two approaches on how to display a markup rich navigation:

## Using the `default` modal

In our `base.html` we have the trigger...

```HTML
<a
  href="#"
  class="hamburger overlay-menu-toggle"
    data-trigger-default-modal
    data-modal-escape-close-method-enabled="true"
    data-modal-overlay-close-method-enabled="true"
    data-default-modal-variation="overlay-menu"
    data-default-modal-content-container-id="overlay-menu"
  >
    <span class="sr-only">{% trans "Toggle navigation" %}</span>
    <span class="hamburger-box">
        <span class="hamburger-inner"></span>
    </span>
</a>
<a href="#" class="overlay-menu-toggle" >
```

...and the softpage container:

```HTML
{# overlay menu that gets in a modal #}
<div id="overlay-menu" class="overlay-menu" style="display: none;">
    {% static_placeholder "overlay_menu" %}
</div>
```

This will open a softpage with an additional `data` attribute:

```HTML
<div class="tingle-modal default-modal tingle-modal--visible" data-default-modal-variation="overlay-menu">
  ...
</div>
```

Which can then be styled in `static/scss/modals/_default.scss`:

```SCSS
.default {
    // project specific variations
    &[data-default-variation="default-menu"] {
        ...
    }
}
```

## Toggling the desktop navigation's visibility manually

In our `static/js/modules/navigation.js` you can add your own toggle logic if desired.
