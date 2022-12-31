import urlRegex from 'https://esm.sh/url-regex@5.0.0'
import { files } from './files.ts'
import type { Imports } from './Imports.d.ts'

export const getImports = async (dir: string): Promise<Imports> => {
  const imports = []
  
  for await (const file of files(dir)) {
    if (!file.endsWith('.ts')) continue

    const content = await Deno.readTextFile(file)

    , urls = content.match(urlRegex())

    if (!urls)
      continue

    for (const url of urls)
      if (
        (
          url.startsWith('https://esm.sh') ||
          url.startsWith('https://deno.gg') ||
          url.startsWith('https://deno.land')
        )
        && !url.includes('${')
      )
        imports.push({
          url: url.replace('\'', ''),
          file
        })
  }

  return imports
}
