import type { Update } from './Update.d.ts'

async function fetchLatestEsmShVersion() {
  const res = await fetch('https://api.github.com/repos/ije/esm.sh/releases')
      
  if (!res.ok)
    throw new Error('esm.sh fetch error')

  return (await res.json())[0].tag_name
}

export async function update(updates: Update[]) {
  let esmVersion

  for (const update of updates) {
    let content = await Deno.readTextFile(update.file)

    if (update.registry === 'esm.sh') {
      const url = new URL(update.url)

      if (url.searchParams.has('pin')) {
        if (!esmVersion)
          esmVersion = await fetchLatestEsmShVersion()

        url.searchParams.set('pin', esmVersion)
      }

      update.url = url.toString()
    }

    content = content.replace(update.url, update.url.replace(update.fromVersion, update.toVersion))

    await Deno.writeTextFile(update.file, content)
  }
}
