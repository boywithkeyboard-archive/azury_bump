import { resolve } from 'https://deno.land/std@v0.170.0/path/mod.ts'

export async function* files(dir: string): AsyncIterableIterator<string> {
  const dirents = Deno.readDir(dir)
  
  for await (const dirent of dirents) {
    const res = resolve(dir, dirent.name)

    if (dirent.isDirectory)
      yield* files(res)
    else
      yield res
  }
}
