import { Registry } from '../Registry.ts'

export default new Registry({
  name: 'deno.gg',
  getName(url) {
    return url.split('/')[1].split('@')[0]
  },
  getCurrentVersion(url) {
    return url.split('/')[1].split('@')[1]
  },
  async getNextVersion(name) {
    const res = await fetch(`https://deno.gg/registry/${name}`)

    if (!res.ok)
      throw new Error()

    return (await res.json()).latestVersion
  }
})
