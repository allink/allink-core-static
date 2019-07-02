# allink-core-static repository

Note: We moved the [changelog](CHANGELOG.md) to a separate file.


## Documentation

We maintain documentation for several versions of the project. Key versions is:

[v2.0.x](http://allink-core-static.readthedocs.io/en/v2.0.x/)

### Install mkdocs

`pip install mkdocs==0.16.3`

### Run mkdocs

`mkdocs serve -a localhost:4000`

## Development

When making changes in `allink-core-static` while directly working in project you can use [npm link](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557). All changes on `allink-core-static` are then automatically mirrored to its repository. You then don't have to copy & paste the changes manually from the project `node_modules` directory to the `allink-core-static` repository.<br>
Be aware that when using `npm link` custom jQuery event triggers don't really work. And when some `allink-core-static` dependencies are missing you have to run `npm install` inside `allink-core-static` again.
