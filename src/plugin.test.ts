import test from "ava"

import type {Config} from "tailwindcss"

import {withTransform} from "./__macro__/withTransform.js"

import {variants} from "./variants.js"
import {entries} from "./entries.js"

test("Applies device variants", withTransform, async (transform, html, css) => {
  const config: Config = {
    content: [
      {
        raw: html`
          <div class="device-touch:bg-transparent"></div>
          <div class="device-desktop:bg-transparent"></div>
          <div class="device-desktop-touch:bg-transparent"></div>
          <div class="device-desktop-any:bg-transparent"></div>
        `
      }
    ],
    corePlugins: {
      preflight: false
    }
  }

  const input = css`
    @tailwind utilities;
  `

  return {
    actual: await transform(input, config),
    expected: entries(variants).map(([name, params]) => ({name, params}))
  }
})
