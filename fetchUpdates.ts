import { difference } from 'https://deno.land/std@v0.170.0/semver/mod.ts'
import type { Imports } from './Imports.d.ts'
import type { Updates } from './Updates.d.ts'

export const fetchUpdates = async (imports: Imports): Promise<Updates> => {
  const updates: Updates = []

  for (const i of imports) {
    const url = i.url.replace('https://', '')

    if (i.url.startsWith('https://esm.sh')) {
      let packageName = url
        .split('/')[1]
        .split('@')[0]

      const scopedPackage = packageName.length === 0

      const fromVersion = scopedPackage ? (
        url.split('/')[2].split('@')[1]
      ) : (
        url.split('/')[1].split('@')[1]
      )

      if (scopedPackage)
        packageName = url.split('/')[1] + '/' + url.split('/')[2].split('@')[0]

      const res = await fetch(`https://registry.npmjs.org/${packageName}`)
      
      if (!res.ok)
        continue
      
      const json = await res.json()

      const toVersion = json['dist-tags'].latest

      if (fromVersion === toVersion)
        continue

      const toUrl = i.url
        .replace(`https://esm.sh/${packageName}@${fromVersion}`, `https://esm.sh/${packageName}@${toVersion}`)

      const breaking = difference(fromVersion, toVersion)

      updates.push({
        registry: 'esm.sh',
        package: packageName,
        file: i.file,
        fromVersion,
        toVersion,
        fromUrl: i.url,
        toUrl,
        breaking: breaking === 'major'
      })
    } else if (i.url.startsWith('https://deno.gg')) {
      const packageName = url
        .split('/')[1]
        .split('@')[0]

      const fromVersion = url
        .split('/')[1]
        .split('@')[1]

      const res = await fetch(`https://deno.gg/registry/${packageName}`)

      if (!res.ok)
        continue

      const json = await res.json()

      const toVersion = json.latestVersion

      if (fromVersion === toVersion)
        continue

      const toUrl = i.url
        .replace(`https://deno.gg/${packageName}@${fromVersion}`, `https://deno.gg/${packageName}@${toVersion}`)

      const breaking = difference(fromVersion.replace('v', ''), toVersion.replace('v', ''))

      updates.push({
        registry: 'deno.gg',
        package: packageName,
        file: i.file,
        fromVersion,
        toVersion: toVersion,
        fromUrl: i.url,
        toUrl,
        breaking: breaking === 'major'
      })
    } else if (i.url.startsWith('https://deno.land/x')) {
      const packageName = url
        .split('/')[2]
        .split('@')[0]

      const fromVersion = url
        .split('/')[2]
        .split('@')[1]

      const res = await fetch(`https://apiland.deno.dev/v2/modules/${packageName}`)

      if (!res.ok)
        continue

      const json = await res.json()

      const toVersion = json.latest_version.startsWith('v') ? json.latest_version : `v${json.latest_version}`

      if (fromVersion === toVersion)
        continue

      const toUrl = i.url
        .replace(`https://deno.land/x/${packageName}@${fromVersion}`, `https://deno.land/x/${packageName}@${toVersion}`)

      const breaking = difference(fromVersion.replace('v', ''), toVersion.replace('v', ''))

      updates.push({
        registry: 'deno.land',
        package: packageName,
        file: i.file,
        fromVersion,
        toVersion: toVersion,
        fromUrl: i.url,
        toUrl,
        breaking: breaking === 'major'
      })
    } else if (i.url.startsWith('https://deno.land/std')) {
      const packageName = 'std'

      const fromVersion = url
        .split('/')[1]
        .split('@')[1]

      const res = await fetch(`https://apiland.deno.dev/v2/modules/${packageName}`)

      if (!res.ok)
        continue

      const json = await res.json()

      const toVersion = json.latest_version.startsWith('v') ? json.latest_version : `v${json.latest_version}`

      if (fromVersion === toVersion)
        continue

      const toUrl = i.url
        .replace(`https://deno.land/${packageName}@${fromVersion}`, `https://deno.land/${packageName}@${toVersion}`)

      const breaking = difference(fromVersion.replace('v', ''), toVersion.replace('v', ''))

      updates.push({
        registry: 'deno.land',
        package: packageName,
        file: i.file,
        fromVersion,
        toVersion: toVersion,
        fromUrl: i.url,
        toUrl,
        breaking: breaking === 'major'
      })
    }
  }

  return updates
}
