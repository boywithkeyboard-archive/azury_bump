export class Registry {
  public name
  public prefix
  public getName
  public getCurrentVersion
  public getNextVersion

  constructor(opts: {
    name: string
    prefix?: string
    getName: (url: string) => Promise<string> | string
    getCurrentVersion: (url: string) => Promise<string> | string
    getNextVersion: (name: string) => Promise<string> | string
  }) {
    this.name = opts.name
    this.prefix = opts.prefix ?? opts.name
    this.getName = opts.getName
    this.getCurrentVersion = opts.getCurrentVersion
    this.getNextVersion = opts.getNextVersion
  }
}
