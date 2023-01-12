export class Registry {
  public name
  public prefix
  // parse package name from url (used by createUpdates())
  public getName
  // parse current version from url (used by createUpdates())
  public getCurrentVersion
  // parse next version from url (used by createUpdates())
  public getNextVersion
  // create package url (used by createMarkdown())
  public getPackageUrl
  // create current version url (used by createMarkdown())
  public getCurrentVersionUrl
  // create next version url (used by createMarkdown())
  public getNextVersionUrl

  constructor(opts: {
    name: string
    prefix?: string
    getName: (url: string) => Promise<string> | string
    getCurrentVersion: (url: string) => Promise<string> | string
    getNextVersion: (name: string) => Promise<string> | string
    getPackageUrl: (name: string) => string
    getCurrentVersionUrl: (name: string, version: string) => string
    getNextVersionUrl: (name: string, version: string) => string
  }) {
    this.name = opts.name
    this.prefix = opts.prefix ?? opts.name
    this.getName = opts.getName
    this.getCurrentVersion = opts.getCurrentVersion
    this.getNextVersion = opts.getNextVersion
    this.getPackageUrl = opts.getPackageUrl
    this.getCurrentVersionUrl = opts.getCurrentVersionUrl
    this.getNextVersionUrl = opts.getNextVersionUrl
  }
}
