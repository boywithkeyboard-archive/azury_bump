import { Registry } from '../Registry.ts'

export default new Registry({
  name: 'esm.sh',
  getName(url) {
    const packageName = url
      .split('/')[1]
      .split('@')[0]

    if (packageName.length > 0)
      return packageName

    return url.split('/')[1] + '/' + url.split('/')[2].split('@')[0]
  },
  getCurrentVersion(url) {
    const scopedPackage = url.split('/')[1].split('@')[0].length === 0

    const version = scopedPackage ? (
      url.split('/')[2].split('@')[1]
    ) : (
      url.split('/')[1].split('@')[1]
    )

    return version
  },
  async getNextVersion(name) {
    const res = await fetch(`https://registry.npmjs.org/${name}`)
      
    if (!res.ok)
      throw new Error()

    return (await res.json())['dist-tags'].latest
  }
})
