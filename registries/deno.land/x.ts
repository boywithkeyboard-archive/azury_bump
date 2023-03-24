import { Registry } from '../../Registry.d.ts'

export default <Registry> {
  displayName: 'deno.land',
  prefix: 'https://deno.land/x',
  name({ url }) {
    return url.split('/')[2].split('@')[0]
  },
  currentVersion({ url }) {
    return url.split('/')[2].split('@')[1]
  },
  async nextVersion({ name }) {
    const res = await fetch(`https://apiland.deno.dev/v2/modules/${name}`)

    if (!res.ok) {
      throw new Error('deno.land/x fetch error')
    }

    const json = await res.json()

    return json.latest_version.startsWith('v')
      ? json.latest_version
      : `v${json.latest_version}`
  },
  currentVersionUrl({ name, version }) {
    return `https://deno.land/x/${name}@${version}`
  },
  nextVersionUrl({ name, version }) {
    return `https://deno.land/x/${name}@${version}`
  },
}
