import deno_land_std from './registries/deno.land/std.ts'
import deno_land_x from './registries/deno.land/x.ts'
import esm_sh from './registries/esm.sh.ts'
import cdn_jsdelivr from './registries/cdn.jsdelivr.net.ts'
import cdn_skypack from './registries/cdn.skypack.dev.ts'
import raw_githubusercontent from './registries/raw.githubusercontent.com.ts'

export default [
  deno_land_std,
  deno_land_x,
  esm_sh,
  cdn_jsdelivr,
  cdn_skypack,
  raw_githubusercontent
]
