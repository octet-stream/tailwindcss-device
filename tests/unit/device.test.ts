import {expect, test} from "vitest"

import postcss from "postcss"
import type createPlugin from "tailwindcss/plugin"

import plugin from "../../src/device.ts"

import {entries} from "../../src/entries.ts"
import {withPrefix} from "../../src/prefix.ts"
import {variants} from "../../src/variants.ts"

// biome-ignore lint/suspicious/noExplicitAny: Disabled for noop function
const noop = (): any => {}

type PluginAPI = Parameters<Parameters<typeof createPlugin>[0]>[0]

const noopPluginApi: PluginAPI = {
  addBase: noop,
  addComponents: noop,
  addUtilities: noop,
  theme: noop,
  matchComponents: noop,
  matchUtilities: noop,
  matchVariant: noop,
  config: noop,
  prefix: noop,
  addVariant() {
    throw new Error("Provide actual implementation for tests")
  }
}

test("adds variants", () => {
  const expected = entries(variants).map(([name, params]) => [
    withPrefix(name),
    postcss.atRule({name: "media", params}).toString()
  ])

  const actual: [name: string, atRule: string][] = []

  plugin().handler({
    ...noopPluginApi,
    addVariant(name, variant) {
      actual.push([name, variant as string])
    }
  })

  expect(actual).toEqual(expected)
})

test("supports custom prefix", () => {
  const prefix = "test"

  const expected = entries(variants).map(([name, params]) => [
    withPrefix(name, prefix),
    postcss.atRule({name: "media", params}).toString()
  ])

  const actual: [name: string, atRule: string][] = []

  plugin({prefix}).handler({
    ...noopPluginApi,
    addVariant(name, variant) {
      actual.push([name, variant as string])
    }
  })

  expect(actual).toEqual(expected)
})
