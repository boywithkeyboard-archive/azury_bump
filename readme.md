## bump

> **Note**: Please take a look at [#20](https://github.com/azurystudio/bump/issues/20) to learn more about the future of bump.

### Workflow

```yml
name: 'bump'

on:
  workflow_dispatch:
  schedule:
    - cron: '0 4 * * *' # 4am, daily

jobs:
  bump:
    uses: 'azurystudio/bump/.github/workflows/bump.yml@v0'
    with:
      assignees: 'USERNAME' # optional
      reviewers: 'USERNAME'
    secrets:
      token: '${{ secrets.GITHUB_TOKEN }}'
      tokens: '${{ secrets.TOKEN }}@raw.githubusercontent.com' # optional (for private github repositories)
```

*`assignees` and `reviewers` options are the same as defined in [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request).*

### Registries

  - [**cdn.jsdelivr.net**](https://cdn.jsdelivr.net)

    ```
    https://cdn.jsdelivr.net/npm/@scope/package@v0.0.0/...
    ```
    ```
    https://cdn.jsdelivr.net/npm/package@v0.0.0/...
    ```
    ```
    https://cdn.jsdelivr.net/gh/org/repo@v0.0.0/...
    ```

  - [**cdn.skypack.dev**](https://cdn.skypack.dev)

    ```
    https://cdn.skypack.dev/@scope/package@0.0.0/...
    ```
    ```
    https://cdn.skypack.dev/package@0.0.0/...
    ```

  - [**deno.land**](https://deno.land)

    ```
    https://deno.land/std@v0.0.0/...
    ```
    ```
    https://deno.land/x/package@v0.0.0/...
    ```

  - [**esm.run**](https://esm.run)

    ```
    https://esm.run/@scope/package@v0.0.0/...
    ```
    ```
    https://esm.run/package@v0.0.0/...
    ```

  - [**esm.sh**](https://esm.sh)

    ```
    https://esm.sh/@scope/package@v0.0.0/...
    ```
    ```
    https://esm.sh/package@v0.0.0/...
    ```

  - [**raw.githubusercontent.com**](https://raw.githubusercontent.com)

    ```
    https://raw.githubusercontent.com/org/repo/tag/...
    ```
