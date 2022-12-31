## bump

#### Add this workflow to your repository to bump your dependencies:

```
name: 'bump'

on:
  schedule:
    - cron: '0 12 * * *'

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
          deno run -A https://deno.gg/bump@v0.1.0
          echo "CHANGELOG=$(cat dependencies_changelog.md)" >> $GITHUB_ENV
          rm dependencies_changelog.md

      - name: 'create pull request'
        uses: 'peter-evans/create-pull-request@v4.2.3'
        with:
          title: 'bump dependencies'
          author: 'GitHub <noreply@github.com>'
          commit-message: 'bump dependencies'
          body: '${{ env.CHANGELOG }}'
          labels: 'dependencies'
          delete-branch: true
          branch: 'bump'
```

### Supported Registries:

  - [**deno.gg**](https://deno.gg)
  - [**deno.land**](https://deno.land)
  - [**esm.sh**](https://esm.sh)
