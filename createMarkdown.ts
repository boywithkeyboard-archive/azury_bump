import { registries } from './registries.ts'
import type { Updates } from './Updates.d.ts'

export const createMarkdown = (updates: Updates) => {
  const packages: string[] = []

  let markdown = '### bump:\n'

  for (const registry of registries) {
    if (updates.filter(update => update.registry === registry).length === 0)
      continue

    markdown += `\n- **${registry}**\n\n`

    for (const update of updates.filter(update => update.registry === registry).sort((a, b) => a.package.localeCompare(b.package))) {
      if (packages.includes(update.package))
        continue

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

      packages.push(update.package)
    }
  }

  return markdown
}
