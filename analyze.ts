import regex from 'https://esm.sh/url-regex@5.0.0'
import { readFiles } from './readFiles.ts'
import registries from './registries.ts'
import type { Import } from './Import.d.ts'

export async function* analyze(directory: string, ignore: string[]): AsyncIterableIterator<Import> {
  for await (const file of readFiles(directory)) {
    if (!file.endsWith('.ts') && !file.endsWith('.json') || ignore.includes(file))
      continue

    const content = await Deno.readTextFile(file)

    for (let url of content.match(regex()) ?? []) {
      url = url.replace('\'', '')

      if (url.includes('${'))
        continue

      for (const registry of registries)
        if (url === `https://${registry.prefix}`)
          continue

      if (!registries.some(registry => url.startsWith(`https://${registry}`)))
        continue

      yield {
        url,
        file
      }
    }
  }
}
