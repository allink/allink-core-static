# allink-core-static repository

Note: We moved the [changelog](CHANGELOG.md) to a separate file.


## Documentation

We maintain documentation for several versions of the project. Key versions is:

[v2.x.x](http://allink-core-static.readthedocs.io/en/v2.x.x/)

### Install mkdocs

`pip install mkdocs==0.16.3`

### Run mkdocs

`mkdocs serve -a localhost:4000`

## Release conventions

### Major
v.0.x.x, v.1.x.x and v.2.x.x are not compatible with each other. We never migrated from one to an other and doing so would be a be a lot of manual work, as there have been a lot of database changes. We try to minimize the need for a new major version. The decision if v3.x.x will be compatible with v.2.x.x has yet to be made.

### Minor
When you make changes that affect both the [backend](https://github.com/allink/allink-core) and the [frontend](https://github.com/allink/allink-core-static) the project dependencies need to be updated at the same time. To quickly see which releases belong together you should make a `minor` release in both repositories.

#### Example
A new CMS plugin together with styles has been added to the core. Release a new `minor` version:

- `allink-core==v2.3.0`
- `allink-core-static@v2.3.0`

### Patch
Changes that only affect a single repo should be tagged with a `patch` release. Usually needed for small adjustments and bugfixes.

#### Example
A bugfix has been made in allink-core. Release a new `patch` version:

- `allink-core-static@v2.3.2`

## Development

When making changes in `allink-core-static` while directly working in project you can use [npm link](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557). All changes on `allink-core-static` are then automatically mirrored to its repository. You then don't have to copy & paste the changes manually from the project `node_modules` directory to the `allink-core-static` repository.<br>
Be aware that when using `npm link` custom jQuery event triggers don't really work. And when some `allink-core-static` dependencies are missing you have to run `npm install` inside `allink-core-static` again.
