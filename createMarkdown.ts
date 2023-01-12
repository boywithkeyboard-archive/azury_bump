import { lte } from 'https://deno.land/std@v0.171.0/semver/mod.ts'
import registries from './registries.ts'
import type { Update } from './Update.d.ts'

export async function createMarkdown(updates: AsyncIterableIterator<Update>) {
  let markdown = '### bump:\n'

  const sortedUpdates: Record<string, Update[]> = {}

  for await (const update of updates)
    sortedUpdates[update.registry].push(update)

  // filter out duplicates
  for (const updates of Object.values(sortedUpdates)) {
    const filteredUpdates: Update[] = []

    for (const update of updates) {
      const exists = filteredUpdates.find(item => item.package === update.package)

      if ((exists && !lte(exists.fromVersion.replace('v', ''), update.fromVersion.replace('v', ''))) || !exists)
        filteredUpdates.push(update)
    }
  }

  // sort packages alphabetically
  for (const [key, value] of Object.entries(sortedUpdates))
    sortedUpdates[key] = value.sort((a, b) => a.package.localeCompare(b.package))

  // create markdown
  for (const [registryName, updates] of Object.entries(sortedUpdates)) {
    markdown += `\n- **${registryName}**\n\n`

    const registry = registries.filter(registry => registry.name === registryName)[0]

    for (const update of updates)
      markdown += `  - [**${update.package}**](${registry.getPackageUrl(update.package)}) × [\`${update.fromVersion}\`](${registry.getCurrentVersionUrl(update.package, update.fromVersion)}) » [\`${update.toVersion}\`](${registry.getNextVersionUrl(update.package, update.toVersion)}) ${update.breaking ? '⚠️' : ''}\n`
  }

  return markdown
}
