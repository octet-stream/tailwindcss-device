import {writeFile, rm, copyFile, mkdir} from "node:fs/promises"
import {pathToFileURL} from "node:url"
import {randomUUID} from "node:crypto"
import {join, resolve} from "node:path"
import {tmpdir} from "node:os"

import type {Config} from "tailwindcss"

import tailwind from "tailwindcss"
import postcss from "postcss"

import device from "../../lib/device.mjs"

import {test as base} from "@playwright/test"

export const test = base.extend({
  async page({page}, use) {
    const {RUNTIME_FILES_ROOT} = process.env

    if (!RUNTIME_FILES_ROOT) {
      throw new TypeError(
        "Can't find RUNTIME_FILES_ROOT. Did you forgot setup hook?"
      )
    }

    const PAGE_PATH = pathToFileURL(join(RUNTIME_FILES_ROOT, "test.html")).href

    await page.goto(PAGE_PATH)
    await use(page)
  }
})

export async function setup() {
  const RUNTIME_FILES_ROOT = join(tmpdir(), randomUUID(), "e2e-runtime-files")
  process.env.RUNTIME_FILES_ROOT = RUNTIME_FILES_ROOT

  await mkdir(RUNTIME_FILES_ROOT, {recursive: true})

  await copyFile(
    resolve("e2e", "__fixture__", "test.html"),

    join(RUNTIME_FILES_ROOT, "test.html")
  )

  const css = String.raw

  const config: Config = {
    plugins: [device],
    content: [join(RUNTIME_FILES_ROOT, "test.html")]
  }

  const input = css`
    @tailwind utilities;
  `

  const result = await postcss(tailwind(config)).process(input, {from: undefined})

  await writeFile(join(RUNTIME_FILES_ROOT, "test.css"), result.css)
}

export async function teardown() {
  if (process.env.RUNTIME_FILES_ROOT) {
    await rm(process.env.RUNTIME_FILES_ROOT, {recursive: true, force: true})
  }
}
