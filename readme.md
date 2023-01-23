## bump

### Workflow

```yml
name: 'bump'

on:
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * *' # 6am, daily

jobs:
  bump:
    runs-on: 'ubuntu-latest'

    steps:
      - uses: 'actions/checkout@v3'

      - uses: 'denoland/setup-deno@v1'
        with:
          deno-version: 'v1.x'

      - name: 'bump dependencies'
        run: |
          deno run -A https://deno.gg/bump@v0
          CHANGELOG=$(cat dependencies_changelog.md)
          echo "CHANGELOG<<EOF" >> $GITHUB_ENV
          echo "$CHANGELOG" >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV
          rm dependencies_changelog.md

      - name: 'create pull request'
        uses: 'peter-evans/create-pull-request@v4'
        with:
          title: 'bump dependencies'
          author: 'GitHub <noreply@github.com>'
          commit-message: 'bump dependencies'
          body: '${{ env.CHANGELOG }}'
          labels: 'dependencies'
          delete-branch: true
          branch: 'bump'
```

### Registries

  - [**deno.gg**](https://deno.gg)
  - [**deno.land**](https://deno.land)
  - [**esm.sh**](https://esm.sh)
