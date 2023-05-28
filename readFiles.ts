import { resolve } from 'https://deno.land/std@0.189.0/path/mod.ts'

export async function* readFiles(dir: string): AsyncIterableIterator<string> {
  const dirents = Deno.readDir(dir)
  
  for await (const dirent of dirents) {
    const res = resolve(dir, dirent.name)

    if (dirent.isDirectory)
      yield* readFiles(res)
    else
      yield res
  }
}
