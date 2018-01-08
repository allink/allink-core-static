# Variables Overview

In case you worked with bootstrap before, you will notice that our `static/scss/base/_variables.scss` feels familliar.

But since our setup has different requirements, the available variables are optimized to our needs.

## Limitations

Creating a variable for every available CSS property of all our modules is simply impossible and can be (as we learned) a waste of time.

So this is why there is only variables for the most common settings (usually colors, icons and spacings) that are kept reoccuring in our projects.

## How to find your way around

We implemented a typo logic working with the "=" character. That makes it easy-ish to navigate through the file using the find command (`Cmd + F`).

Let's say we want to tweak our <strong>button</strong> styles: Simply search for `=button` (`=bu` is actually enough alrady).
Similarly, look for `=checkbox` to get to the <strong>checkbox</strong> settings (`=ch` is actually enough alrady).

You get the idea..

The sections are usually named after the module.

## Can't find what you're looking for?

In case there is no variable, create a new one where it makes sense or simply define the CSS properties within the specific module's CSS file directly.
