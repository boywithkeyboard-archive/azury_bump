import { difference } from 'https://deno.land/std@v0.171.0/semver/mod.ts'
import registries from './registries.ts'
import type { Update } from './Update.d.ts'
import type { Import } from './Import.d.ts'

export async function createUpdates(imports: AsyncIterableIterator<Import>): Promise<Update[]> {
  const updates: Update[] = []

  for await (const item of imports) {
    try {
      const registry = registries.filter(registry => item.url.startsWith(`https://${registry.prefix}`))[0]

      if (!registry)
        continue

      const url = item.url.replace('https://', '')

      , name = await registry.getName(url)
      , fromVersion = await registry.getCurrentVersion(url)
      , toVersion = await registry.getNextVersion(name)

      if (
        fromVersion.replace('v', '') === toVersion.replace('v', '') ||
        toVersion.includes('rc') ||
        toVersion.includes('alpha') ||
        toVersion.includes('beta')
      )
        continue

      const breaking = difference(fromVersion.replace('v', ''), toVersion.replace('v', ''))

      updates.push({
        registry: registry.name,
        package: name,
        file: item.file,
        fromVersion,
        toVersion,
        url: item.url,
        breaking: breaking === 'major',
        fileCount: 1
      })
    } catch (_err) {
      continue
    }
  }

  return updates
}
