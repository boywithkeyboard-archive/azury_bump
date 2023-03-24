import { Registry } from '../Registry.d.ts'

export default <Registry> {
  displayName: 'raw.githubusercontent.com',
  prefix: 'https://raw.githubusercontent.com',
  name({ url }) {
    return url.split('/')[1] + '/' + url.split('/')[2] // org/repo
  },
  currentVersion({ url }) {
    return url.split('/')[3]
  },
  async nextVersion({ name }) {
    const res = await fetch(`https://api.github.com/repos/${name}/releases`)

    if (!res.ok) {
      throw new Error('raw.githubusercontent.com fetch error')
    }

    return (await res.json())[0].tag_name
  },
  currentVersionUrl({ name, version }) {
    return `https://github.com/${name}/releases/tag/${version}`
  },
  nextVersionUrl({ name, version }) {
    return `https://github.com/${name}/releases/tag/${version}`
  },
}
