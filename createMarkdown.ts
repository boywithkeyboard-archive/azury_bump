import { lte } from 'https://deno.land/std@v0.171.0/semver/mod.ts'
import registries from './registries.ts'
import type { Update } from './Update.d.ts'

export function createMarkdown(updates: Update[]) {
  let markdown = '### bump:\n'

  const sortedUpdates: Record<string, Update[]> = {}

  for (const registry of registries)
    sortedUpdates[registry.name] = []

  for (const update of updates)
    sortedUpdates[update.registry].push(update)

  // filter out duplicates
  for (const [key, updates] of Object.entries(sortedUpdates)) {
    const filteredUpdates: Update[] = []

    for (const update of updates) {
      const exists = filteredUpdates.find(item => item.package === update.package)

      if (exists) {
        update.fileCount = filteredUpdates[filteredUpdates.findIndex(item => item.package === update.package)].fileCount + 1
        update.fromVersion = lte(exists.fromVersion.replace('v', ''), update.fromVersion.replace('v', '')) ? exists.fromVersion : update.fromVersion // select the lowest version
        update.toVersion = lte(exists.fromVersion.replace('v', ''), update.fromVersion.replace('v', '')) ? update.toVersion : exists.toVersion // select the highest version

        filteredUpdates[filteredUpdates.findIndex(item => item.package === update.package)] = update
      } else {
        filteredUpdates.push(update)
      }
    }

    sortedUpdates[key] = filteredUpdates
  }

  // sort packages alphabetically
  for (const [key, value] of Object.entries(sortedUpdates))
    sortedUpdates[key] = value.sort((a, b) => a.package.localeCompare(b.package))

  // create markdown
  for (const [registryName, updates] of Object.entries(sortedUpdates)) {
    if (updates.length === 0)
      continue

    markdown += `\n- **${registryName}**\n\n`

    const registry = registries.filter(registry => registry.name === registryName)[0]

    for (const update of updates)
      markdown += `  - [**${update.package}**](${registry.getPackageUrl(update.package)}) × [\`${update.fromVersion}\`](${registry.getCurrentVersionUrl(update.package, update.fromVersion)}) » [\`${update.toVersion}\`](${registry.getNextVersionUrl(update.package, update.toVersion)}) ***(${update.fileCount} ${update.fileCount > 1 ? 'files' : 'file'})*** ${update.breaking ? '⚠️' : ''}\n`
  }

  return markdown
}
