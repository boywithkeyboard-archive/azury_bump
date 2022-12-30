import bump from './mod.ts'

if (import.meta.main)
  bump(Deno.cwd())
