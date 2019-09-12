# Important notes

Every single time you're about the modify javascript or stylesheet files, make sure to:

1. Pull the latest changes running `git pull`
2. Run `npm link allink-core-static` in your current project
3. Add your changes
4. Commit your changes to the "allink-core-static" repo
5. Copy the latest `allink-core-static` commit hash and paste in the current project's `package.json`
6. Run `npm install`
7. If you added new variables or default settings, make sure to add them in the boilerplate project as well
