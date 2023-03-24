export interface Registry {
  displayName: string
  prefix: string
  name: (data: { url: string }) => Promise<string> | string
  currentVersion: (data: { url: string }) => Promise<string> | string
  nextVersion: (
    data: { name: string; url: string },
  ) => Promise<string> | string
  currentVersionUrl: (
    data: { name: string; version: string; url: string },
  ) => string
  nextVersionUrl: (
    data: { name: string; version: string; url: string },
  ) => string
}
