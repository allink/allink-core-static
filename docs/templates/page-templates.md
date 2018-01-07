# Setting up page templates

In our `settings.py` we can define page templates. Per default, we have the `default.html` template that we can copy from the [allink-core template folder](https://github.com/allink/allink-core/tree/v1.0.x/templates/).

## Adding a template

Once we copied the `default.html`, we can dublicate and rename the file to e.g. `no-header.html` and add this option to `CMS_TEMPLATES`:

```Python
CMS_TEMPLATES = (
    ('default.html', _('Standard')),
    ('no-header.html', _('No header')),
)
```

In the file `no-header.html` we can then overwrite any blocks from either `base_root.html` or `base.html`.
