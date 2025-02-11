// This file generates plugin code into .css files,
// so it can be consumed by Tailwindcss 4 via the `@import` directive.

import {writeFile} from "node:fs/promises"
import {dirname, join} from "node:path"
import {fileURLToPath} from "node:url"

import colors from "picocolors"

import {plugin} from "./src/css/plugin.ts"

// Write plugin styles
await Promise.all(
  ["lib/device.css", "index.css"].map(async filename => {
    const path = join(dirname(fileURLToPath(import.meta.url)), filename)

    console.log(`${colors.blue("PLUGIN")} Writing CSS output to ${path}`)

    await writeFile(path, plugin)
  })
)
