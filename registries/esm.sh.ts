import { Registry } from '../Registry.d.ts'

export default <Registry> {
  displayName: 'esm.sh',
  prefix: 'https://esm.sh',
  name({ url }) {
    const packageName = url
      .split('/')[1]
      .split('@')[0]

    if (packageName.length > 0) {
      return packageName
    }

    return url.split('/')[1] + '/' + url.split('/')[2].split('@')[0]
  },
  currentVersion({ url }) {
    const scopedPackage = url.split('/')[1].split('@')[0].length === 0

    return scopedPackage
      ? (
        url.split('/')[2].split('@')[1]
      )
      : (
        url.split('/')[1].split('@')[1]
      )
  },
  async nextVersion({ name }) {
    const res = await fetch(`https://registry.npmjs.org/${name}`)

    if (!res.ok) {
      throw new Error('esm.sh fetch error')
    }

    return (await res.json())['dist-tags'].latest
  },
  currentVersionUrl({ name, version }) {
    return `https://npmjs.com/package/${name}/v/${version}`
  },
  nextVersionUrl({ name, version }) {
    return `https://npmjs.com/package/${name}/v/${version}`
  },
}
