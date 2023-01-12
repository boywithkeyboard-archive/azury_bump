import type { Update } from './Update.d.ts'

export async function update(updates: AsyncIterableIterator<Update>) {
  for await (const update of updates) {
    let content = await Deno.readTextFile(update.file)

    content = content.replace(update.url, update.url.replace(update.fromVersion, update.toVersion))

    await Deno.writeTextFile(update.file, content)
  }
}
