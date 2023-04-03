import test from "ava"

import type {Config} from "tailwindcss"

import {withTransform} from "./__macro__/withTransform.js"

import {variants} from "./variants.js"
import {withPrefix} from "./prefix.js"
import {entries} from "./entries.js"

test("Applies device variants", withTransform, async (transform, html, css) => {
  const config: Config = {
    content: [
      {
        raw: html`${entries(variants).map(([name]) => html`
          <div class="hidden ${withPrefix(name)}:block">
            Hello! I'm only visible with ${name} device variant!
          </div>
        `).join("")}`
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

test("Supports custom prefix", withTransform, async (transform, html, css) => {
  const prefix = "custom-device-prefix"

  const config: Config = {
    content: [
      {
        raw: html`${entries(variants).map(([name]) => html`
          <div class="hidden ${withPrefix(name, prefix)}:block">
            Hello! I'm only visible with ${name} device variant!
          </div>
        `).join("")}`
      }
    ],
    corePlugins: {
      preflight: false
    },
  }

  const input = css`
    @tailwind utilities;
  `

  return {
    prefix,
    actual: await transform(input, config, {prefix}),
    expected: entries(variants).map(([name, params]) => ({name, params}))
  }
})
