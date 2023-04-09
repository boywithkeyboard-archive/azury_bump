## v0.3.2

* do not add a `v` before semver for deno.land/x registry to prevent invalid release tags

## v0.3.0

* add option to set a token to look for updates for private repositories

## v0.2.11

* make sure to update `?pin` query parameter in **esm.sh** imports

## v0.2.10

* ignore releases that contain the words **canary**, **unstable** or **nightly**

## v0.2.9

* remove `v` from version tags in **cdn.skypack.dev** imports because they seem to cause a redirect

## v0.2.8

* remove footer line in changelog

## v0.2.6

* revert addition of `test` option

## v0.2.4

* add missing registry imports
* fix handling of cdn.skypack.dev imports

## v0.2.3

* add `assignees` option to workflow

## v0.2.2

* change license to *Apache-2.0*

## v0.2.0

* add **cdn.jsdelivr.net** registry
* add **cdn.skypack.dev** registry
* add **esm.run** registry
* add **raw.githubusercontent.com** registry
* add support for *config file*
* add *reusable GitHub workflow*
