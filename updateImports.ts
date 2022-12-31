import type { Updates } from './Updates.d.ts'

export const updateImports = async (updates: Updates) => {
  for (const update of updates) {
    let content = await Deno.readTextFile(update.file)

    content = content.replace(update.fromUrl, update.toUrl)

    await Deno.writeTextFile(update.file, content)
  }
}
