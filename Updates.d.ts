export type Update = {
  registry: string
  package: string
  file: string
  fromVersion: string
  toVersion: string
  fromUrl: string
  toUrl: string
  breaking: boolean
}

export type Updates = Update[]
