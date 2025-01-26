// This file generates plugin code into .css files, so it can be consumed by TailwindCSS 4.
// Do not use it outside of Tailwind CSS

import {writeFile} from "node:fs/promises"
import {join} from "node:path"

import {plugin} from "./src/css.ts"

// Write plugin styles
await Promise.all(
  ["lib/device.css", "index.css"]
    .map(filename => join(import.meta.dirname, filename))
    .map(path => writeFile(path, plugin))
)
