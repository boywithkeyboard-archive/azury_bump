export type Updates = {
  registry: string
  package: string
  file: string
  fromVersion: string
  toVersion: string
  fromUrl: string
  toUrl: string
  breaking: boolean
}[]
