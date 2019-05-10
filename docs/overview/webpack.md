# Webpack

We are currently using **[Webpack v4 with webpack-dev-server](https://webpack.js.org/)**.

There are two commands that we use to compile our files (more details in the files `webpack/webpack.common.js`, `webpack/webpack.dev.js` and `webpack/webpack.prod.js`):

1. Local development: `npm run dev`
  Only used when working locally.<br>
  **Currently it's necessary to run this command parallel to the backend on your machine.** Otherwise you won't have any static assets available. It's easiest to run this in a separate terminal window.<br>
  It starts webpack-dev-server which automatically hot reloads all changes in the browser.
2. Production: `npm run build`
  Run this command when you want to preview the production build. During the deployment Docker runs this command automatically to compile the production build of all assets.

## Special note regarding custom admin form static files

When ever you start a project in docker, the file `webpack-stats.json` will be read and used for the file includes in our custom admin forms.
