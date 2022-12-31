import { registries } from './registries.ts'
import type { Update, Updates } from './Updates.d.ts'
import { lte } from 'https://deno.land/std@0.167.0/semver/mod.ts'

export const createMarkdown = (updates: Updates) => {
  let markdown = '### bump:\n'

  for (const registry of registries) {
    if (updates.filter(update => update.registry === registry).length === 0)
      continue

    markdown += `\n- **${registry}**\n\n`

    const sortedUpdates = updates.filter(update => update.registry === registry).sort((a, b) => a.package.localeCompare(b.package))

    const filteredUpdates = new Map<string, Update>()

    for (const update of sortedUpdates) {
      const exists = filteredUpdates.get(update.package)

      console.log(update.fromVersion)

      if ((exists && !lte(exists.fromVersion.replace('v', ''), update.fromVersion.replace('v', ''))) || !exists)
        filteredUpdates.set(update.package, update)
    }

    for (const update of filteredUpdates.values()) {
      const packageLink = (registry === 'deno.land' && update.package === 'std')
        ? `https://deno.land/std`
        : registry === 'deno.land' ? `https://deno.land/x/${update.package}`
        : registry === 'deno.gg' ? `https://deno.gg/~${update.package}`
        : `https://npmjs.com/package/${update.package}`

      const fromVersionLink = (registry === 'deno.land' && update.package === 'std')
        ? `https://deno.land/std@${update.fromVersion}`
        : registry === 'deno.land' ? `https://deno.land/x/${update.package}@${update.fromVersion}`
        : registry === 'deno.gg' ? `https://deno.gg/~${update.package}@${update.fromVersion}`
        : `https://npmjs.com/package/${update.package}/v/${update.fromVersion}`

      const toVersionLink = (registry === 'deno.land' && update.package === 'std')
        ? `https://deno.land/std@${update.toVersion}`
        : registry === 'deno.land' ? `https://deno.land/x/${update.package}@${update.toVersion}`
        : registry === 'deno.gg' ? `https://deno.gg/~${update.package}@${update.toVersion}`
        : `https://npmjs.com/package/${update.package}/v/${update.toVersion}`

      markdown += `  - [**${update.package}**](${packageLink}) × [\`${update.fromVersion}\`](${fromVersionLink}) » [\`${update.toVersion}\`](${toVersionLink}) ${update.breaking ? '⚠️' : ''}\n`
    }
  }

  return markdown
}
