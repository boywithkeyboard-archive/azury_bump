import urlRegex from 'https://esm.sh/url-regex@5.0.0'
import { files } from './files.ts'
import type { Imports } from './Imports.d.ts'

export const getImports = async (dir: string, ignore: string[]): Promise<Imports> => {
  const imports = []
  
  for await (const file of files(dir)) {
    if ((!file.endsWith('.ts') && !file.endsWith('.json')) || ignore.includes(file)) continue

    const content = await Deno.readTextFile(file)

    , urls = content.match(urlRegex())

    if (!urls)
      continue

    for (let url of urls) {
      url = url.replace('\'', '')

      if (
        (
          url.startsWith('https://esm.sh') ||
          url.startsWith('https://deno.gg') ||
          url.startsWith('https://deno.land')
        )
        && !url.includes('${')
        && !url.includes(')')
        && url !== 'https://esm.sh'
        && url !== 'https://deno.gg'
        && url !== 'https://deno.land'
        && url !== 'https://deno.land/x'
      )
        imports.push({
          url,
          file
        })
    }
  }

  return imports
}
