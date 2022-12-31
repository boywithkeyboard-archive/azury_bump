import urlRegex from 'https://esm.sh/url-regex@5.0.0'
import { files } from './files.ts'
import { join } from 'https://deno.land/std@0.167.0/path/mod.ts'
import type { Imports } from './Imports.d.ts'

export const getImports = async (dir: string, ignore: string[]): Promise<Imports> => {
  const imports = []
  
  for await (const file of files(dir)) {
    if (!file.endsWith('.ts') || ignore.includes(join(dir, ignore))) continue

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
