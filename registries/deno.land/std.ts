import { Registry } from '../../Registry.d.ts'

export default <Registry> {
  displayName: 'deno.land',
  prefix: 'https://deno.land/std',
  name() {
    return 'std'
  },
  currentVersion({ url }) {
    return url.split('/')[1].split('@')[1]
  },
  async nextVersion() {
    const res = await fetch('https://apiland.deno.dev/v2/modules/std')

    if (!res.ok) {
      throw new Error('deno.land/std fetch error')
    }

    const json = await res.json()

    return json.latest_version.startsWith('v')
      ? json.latest_version
      : `v${json.latest_version}`
  },
  currentVersionUrl({ version }) {
    return `https://deno.land/std@${version}`
  },
  nextVersionUrl({ version }) {
    return `https://deno.land/std@${version}`
  },
}
