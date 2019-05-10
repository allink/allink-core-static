# Introduction

This doc specifies the concept of how `allink-core-static`'s available front-end tools are set up and how to use and/or modify them.

The `allink-core-static` dependens on our `allink-core` (which provides the markup), but there are many options to add and/or modify templates on a project basis.

## The idea behind `allink-core-static`

`allink-core-static` was implemented to create a standardized ecosystem for applications developed at [allink AG](https://www.allink.ch). Amongst other things it contains mostly django apps and django-cms plugins to provide patterns to solve recurring problems and usecases. The underlying question when developing on core functionallity should always be "Is it going to be reused again?"

## A growing project

With the introduction of Django CMS at the end of 2016 we had the chance to use a functioning and modern system. We soon realised, though, that the default apps and plugins are not intirebly suitable for our usecaes. So we started developing the `allink-core` and `allink-core-static` from scratch, but combing all the frontend tools we collected up to that point.

Towards the end of 2017 things have changed a lot and so we decided to create `v1.0` from both the `allink-core` and `allink-core-static` in order to clean up and to optimize our setup.

Both the `allink-core` and `allink-core-static` have matured in the last two years but some things became stale and have not been used in a long time. In the spring of 2019 we decided to create a new major version `2.0` because new standards have been developed and unused parts have been removed.
The goal is to have a solid foundation of essentials that can easily be overwritten and/or extended but will not provide endless options.
