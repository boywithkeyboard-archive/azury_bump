import { getImports } from './getImports.ts'
import { fetchUpdates } from './fetchUpdates.ts'
import log from './log.ts'
import { join } from 'https://deno.land/std@v0.170.0/path/mod.ts'
import { updateImports } from './updateImports.ts'
import { createMarkdown } from './createMarkdown.ts'
import { parse } from 'https://deno.land/std@v0.170.0/flags/mod.ts'

const bump = async () => {
  const args = parse(Deno.args)

  let ignore: string[] = []

  if (args.i)
    ignore = args.i.split(',')

  ignore = ignore.map(i => join(Deno.cwd(), i))

  await log('determining imports...')
  const imports = await getImports(Deno.cwd(), ignore)

  await log('fetching updates...')
  const updates = await fetchUpdates(imports)
  
  await log('updating imports...')
  await updateImports(updates)

  await log('generating changelog...')
  await Deno.create(join(Deno.cwd(), './dependencies_changelog.md'))
  await Deno.writeTextFile(join(Deno.cwd(), './dependencies_changelog.md'), createMarkdown(updates))

  Deno.exit()
}

if (import.meta.main)
  bump()
