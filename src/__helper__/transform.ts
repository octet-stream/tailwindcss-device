import {resolve} from "node:path"
import {fileURLToPath} from "node:url"

import type {Result} from "postcss"
import type {Config} from "tailwindcss"

import postcss from "postcss"
import tailwind from "tailwindcss"

import device from "../device.js"

export interface Transform {
  /**
   * Transforms given CSS `input` using postcss with `tailwindcss` plugin
   *
   * @param title Current test title borroved from `t` object of the test. Needed for `from` option of the `postcss.process`
   * @param input CSS input to process
   * @param config TailwindCSS pugin config. The `device` plugin will be included for each call automatically
   * @param options Options for `device` plugin
   */
  (
    title: string,
    input: string,
    config: Config,
    options?: Parameters<typeof device>[0]
  ): Promise<Result>
}

export const css = String.raw
export const html = String.raw

export const transform: Transform = (title, input, config, options) => {
  config.plugins = [
    ...(config.plugins ?? []),

    options ? device(options) : device
  ]

  return postcss(tailwind(config)).process(input, {
    from: `${resolve(fileURLToPath(import.meta.url))}?test=${title}`
  })
}
