# Webpack

We are currently using <strong>Webpack v1</strong>.

There are two commands that we use to compile our files (more details in the files `webpack.config.js` and `webpack/lib.js`):

1. Local development: `npm run dev`
  Only used when working locally. Never commit and deploy these files (as they are not mini- and uglified).
2. Production: `npm run build`
  Run this command every time before you commit and deploy updates. This makes sure the assets are always as small as possible in terms of file size.

## Special note regarding custom admin form static files

When ever you start a project in docker, the file `webpack-stats.json` will be read and used for the file includes in our custom admin forms.

This means: When ever you switch from `dev` to `build` or wise-versa you have to restart the local server in order to use the updated paths in `webpack-stats.json`.
