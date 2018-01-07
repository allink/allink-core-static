# Setting up app plugin templates

Creating different templates to display entries from our core apps is straight forward.

In this example we will create a custom template for our `work` app (which is mainly used for projects and references).

## Quick overfiew: default templates

The most common templates that have been used again and again are ready to be downloaded/copied from the [allink-core repository (work templates)](https://github.com/allink/allink-core/tree/v1.0.x/allink_core/core/templates/allink_core/work/plugins).

All these templates work out of the box with the default model fields.

Quick explanation of the available templates:

1. `grid_dynamic`: A grid that uses `masonry` to fill the available vertical space with posts rather than row by row.
2. `grid_static`: The most common grid that displays entries row by row.
3. `list`: A simple vertical listing of entries.
4. `slider`: Basic markup that creates a slider with entries.
5. `table`: Displays the entries in a responsive table.

## Creating a project specifc version of a `work` template

Our `allink-boilerplate-v1.0` does not contain any plugin templates per default, as we only want to include the required files in order to keep it clean and maintainable.

So let's assume we want a custom version of the `grid_static` template. Here's one way to achieve this:

1. Pull the latest version of the `allink-core`.
2. Open the `allink-core` project and navigate to `/allink_core/core/templates/allink_core/` and copy/paste the entire `work` directory into your project's `/templates/` folder.
3. In the freshly pasted folder `work/plugins/` delete all templates that will not be used. For example all directories apart from `grid_static`.
4. This will leave you with `work_detail.html` and the `/plugins` folder that contains our `grid_static` and the two `no_results.html` templates.

## Registering the template

Next step we have to tell the work app plugin which templates are available:

1. Open `settings.py` and search for `WORK_PLUGIN_TEMPLATES`. In our case we have to adjust the tuple as followed:
  ```Python
  WORK_PLUGIN_TEMPLATES = (
      ('grid_static', 'Grid (Static)'),
  )
  ```
2. This is it. When placing a `work plugin` into a `column` the only option available will be our `grid_static`.

## Modifying the `grid_static` template

Now it's time modfy how a grid item should be displayed.

All you have to do is to open `/templates/work/plugins/grid_static/_items.html` and edit the markup within the `manage-spacings` element.

## Adding a new custom template

Should none of the default templates meet the project's requirements, then feel free to add a new folder within `work/plugins` and register the template in `settings.py`. It can be named anything, but keep in mind to use <strong>underscores</strong> instead of hyphens, since we are in a django environment.
