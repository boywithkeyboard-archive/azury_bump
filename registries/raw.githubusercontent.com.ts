import { Registry } from '../Registry.ts'
import { parseTokens } from '../parseTokens.ts'

export default new Registry({
  name: 'raw.githubusercontent.com',
  getName(url) {
    return url.split('/')[1] + '/' + url.split('/')[2] // org/repo
  },
  getCurrentVersion(url) {
    return url.split('/')[3]
  },
  async getNextVersion(name) {
    const token = parseTokens()['raw.githubusercontent.com']

    const res = await fetch(`https://api.github.com/repos/${name}/releases`, {
      ...(token && {
        headers: {
          authorization: `bearer ${token}`
        }
      })
    })
      
    if (!res.ok)
      throw new Error('raw.githubusercontent.com fetch error')

    return (await res.json())[0].tag_name
  },
  getCurrentVersionUrl(name, version) {
    return `https://github.com/${name}/releases/tag/${version}`
  },
  getNextVersionUrl(name, version) {
    return `https://github.com/${name}/releases/tag/${version}`
  },
  getRepository(name) {
    return `https://github.com/${name}`
  }
})
