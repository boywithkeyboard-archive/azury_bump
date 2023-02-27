import { difference, valid } from 'https://deno.land/std@v0.178.0/semver/mod.ts'
import { gray, white, strikethrough, italic, brightGreen, brightBlue } from 'https://deno.land/std@v0.178.0/fmt/colors.ts'
import { log } from 'https://deno.land/x/drgn@v0.10.1/mod.ts'
import registries from './registries.ts'
import type { Update } from './Update.d.ts'
import type { Import } from './Import.d.ts'

export async function createUpdates(imports: AsyncIterableIterator<Import>): Promise<Update[]> {
  const cache = new Map<string, string>()
  , updates: Update[] = []

  for await (const item of imports) {
    try {
      const registry = registries.filter(registry => item.url.startsWith(`https://${registry.prefix}`))[0]

      if (!registry)
        continue

      const url = item.url.replace('https://', '')

      , name = await registry.getName(url)
      , fromVersion = await registry.getCurrentVersion(url)

      if (!valid(fromVersion.replace('v', '')))
        continue

      const toVersion = cache.get(`${registry.name}:${name}`) ?? await registry.getNextVersion(name, url)

      if (!cache.has(`${registry.name}:${name}`))
        cache.set(`${registry.name}:${name}`, toVersion)

      if (
        fromVersion.replace('v', '') === toVersion.replace('v', '') ||
        toVersion.includes('rc') ||
        toVersion.includes('alpha') ||
        toVersion.includes('beta') ||
        toVersion.includes('unstable') ||
        toVersion.includes('canary') ||
        toVersion.includes('nightly')
      ) {
        await log(gray(`${white(name)} × ${toVersion} ${italic(brightBlue('(skipped)'))}\n`))

        continue
      }

      const breaking = difference(fromVersion.replace('v', ''), toVersion.replace('v', ''))

      await log(gray(`${white(name)} × ${strikethrough(fromVersion)} → ${brightGreen(toVersion)}\n`))

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
    } catch (err) {
      console.error(err)

      continue
    }
  }

  return updates
}
