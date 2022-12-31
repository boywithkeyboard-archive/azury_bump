import { getImports } from './getImports.ts'
import { fetchUpdates } from './fetchUpdates.ts'
import log from './log.ts'
import { join } from 'https://deno.land/std@v0.167.0/path/mod.ts'
import { updateImports } from './updateImports.ts'
import { createMarkdown } from './createMarkdown.ts'

const bump = async () => {
  await log('determining imports...')
  const imports = await getImports(Deno.cwd())

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
