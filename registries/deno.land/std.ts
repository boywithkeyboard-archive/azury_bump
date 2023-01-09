import { Registry } from '../../Registry.ts'

export default new Registry({
  name: 'deno.land',
  prefix: 'deno.land/std',
  getName() {
    return 'std'
  },
  getCurrentVersion(url) {
    return url.split('/')[1].split('@')[1]
  },
  async getNextVersion() {
    const res = await fetch('https://apiland.deno.dev/v2/modules/std')

    if (!res.ok)
      throw new Error()

    const json = await res.json()

    return json.latest_version.startsWith('v') ? json.latest_version : `v${json.latest_version}`
  }
})