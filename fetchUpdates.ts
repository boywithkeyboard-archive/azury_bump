import { difference } from 'https://deno.land/std@v0.171.0/semver/mod.ts'
import registries from './registries.ts'
import type { Import } from './Import.d.ts'
import type { Update } from './Update.d.ts'

export async function* fetchUpdates(iterator: AsyncIterableIterator<Import>): AsyncIterableIterator<Update> {
  for await (const item of iterator) {
    try {
      const registry = registries.filter(registry => item.url.startsWith(registry.prefix))[0]

      if (!registry)
        continue

      const url = item.url.replace('https://', '')

      , name = await registry.getName(url)
      , fromVersion = await registry.getCurrentVersion(url)
      , toVersion = await registry.getNextVersion(url)

      , breaking = difference(fromVersion.replace('v', ''), toVersion.replace('v', ''))

      yield {
        registry: registry.name,
        package: name,
        file: item.file,
        fromVersion,
        toVersion,
        url: item.url,
        breaking: breaking === 'major'
      }
    } catch (_err) {
      continue
    }
  }
}
