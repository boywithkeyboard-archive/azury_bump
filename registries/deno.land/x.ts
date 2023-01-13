import { Registry } from '../../Registry.ts'

export default new Registry({
  name: 'deno.land',
  prefix: 'deno.land/x',
  getName(url) {
    return url.split('/')[2].split('@')[0]
  },
  getCurrentVersion(url) {
    return url.split('/')[2].split('@')[1]
  },
  async getNextVersion(name) {
    const res = await fetch(`https://apiland.deno.dev/v2/modules/${name}`)

    if (!res.ok)
      throw new Error()

    const json = await res.json()

    return json.latest_version.startsWith('v') ? json.latest_version : `v${json.latest_version}`
  },
  getPackageUrl(name) {
    return `https://deno.land/x/${name}`
  },
  getCurrentVersionUrl(name, version) {
    return `https://deno.land/x/${name}@${version}`
  },
  getNextVersionUrl(name, version) {
    return `https://deno.land/x/${name}@${version}`
  }
})
