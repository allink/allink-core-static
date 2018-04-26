# Select

For our selects, we use `bootstrap-select`. Which per default uses the `default` button style.

If this is not what you want, feel free to comment the import in `static/js/app.js`, and add you own version:

```JS
// no need for the core version...
import 'allink-core-static/js/modules/bootstrap-select';
// ...we have our own
// no need for the core version
import './modules/bootstrap-select';
```

## `.selectpicker` and `.selectpicker-alt`

In most cases the default `.selectpicker` works perfectly fine to render a select.

But a problem we had is that the default selector also rendered content that was hidden (e.g. of the `default-modal`), which resultet in selects that look good but don't work at all. As a simple solution, we added an alternative selector `.selectpicker-alt` that does exactly the same thing as `.selectpicker`, but is left in peace by the library untill we call it.
