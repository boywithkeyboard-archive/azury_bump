import { parse } from 'https://deno.land/std@v0.172.0/flags/mod.ts'
import { join } from 'https://deno.land/std@v0.172.0/path/mod.ts'
import { analyze } from './analyze.ts'
import { createMarkdown } from './createMarkdown.ts'
import { createUpdates } from './createUpdates.ts'
import { update } from './update.ts'

async function cli() {
  const args = parse(Deno.args)

  , ignore = args.i ? args.i.split(',').map((i: string) => join(Deno.cwd(), i)) : []

  , imports = analyze(Deno.cwd(), ignore)
  , updates = await createUpdates(imports)

  await update(updates)

  await Deno.create(join(Deno.cwd(), './dependencies_changelog.md'))
  await Deno.writeTextFile(join(Deno.cwd(), './dependencies_changelog.md'), await createMarkdown(updates))

  Deno.exit()
}

if (import.meta.main)
  cli()
