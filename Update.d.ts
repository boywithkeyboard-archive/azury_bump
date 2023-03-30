export type Update = {
  registry: string
  package: string
  file: string
  fromVersion: string
  toVersion: string
  url: string
  breaking: boolean
  fileCount: number
}
