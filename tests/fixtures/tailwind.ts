import postcss from "postcss"
import tailwind from "tailwindcss"

import type {Result} from "postcss"
import type {Config} from "tailwindcss"

import type plugin from "tailwindcss/plugin.js"
import {test} from "vitest"

import {css} from "../utils/templates.ts"

export type Plugin<TOptions extends Record<PropertyKey, unknown>> =
  | ReturnType<typeof plugin.withOptions<TOptions>>
  | ReturnType<ReturnType<typeof plugin.withOptions<TOptions>>>

export interface Transform {
  /**
   * Transforms given CSS `input` using postcss with `tailwindcss` plugin
   *
   * @param plugin Tailwind plugin to test
   * @param input HTML input to process
   */
  <TOptions extends Record<PropertyKey, unknown>>(
    plugin: Plugin<TOptions>,
    input: string
  ): Promise<Result>
}

interface PluginTestContext {
  transform: Transform
}

export const pluginTest = test.extend<PluginTestContext>({
  async transform({task}, use) {
    const transform: Transform = (plugin, input) => {
      const testConfig: Config = {
        corePlugins: {
          preflight: false
        },
        plugins: [plugin],
        content: [
          {
            raw: input
          }
        ]
      }

      return postcss(tailwind(testConfig)).process(
        css`
          @tailwind utilities;
        `,

        {
          from: `${task.file.filepath}?test=${task.name || task.id}`
        }
      )
    }

    await use(transform)
  }
})

export {pluginTest as test}
