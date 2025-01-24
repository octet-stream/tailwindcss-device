import {expect} from "vitest"

import {pluginTest} from "../fixtures/tailwind.ts"
import {isAtRule} from "../utils/isAtRule.ts"
import {html} from "../utils/templates.ts"

import {entries} from "../../src/entries.ts"
import {withPrefix} from "../../src/prefix.ts"
import {variants} from "../../src/variants.ts"

import plugin from "../../src/device.ts"

const variantsEntries = entries(variants)
const variantsWithPrefix = Object.fromEntries(
  variantsEntries.map(([name, value]) => [withPrefix(name), value])
)

interface TailwindRaws {
  candidate: string
  parentLayer: "utilities"
  layer: "variants"
}

pluginTest("applies variants", async ({transform}) => {
  expect.assertions(variantsEntries.length)

  const results = await Promise.all(
    variantsEntries.map(([variant]) =>
      transform(
        plugin,

        html`
        <div class="hidden ${withPrefix(variant)}:block">
          Hello! I'm only visible with ${variant} device variant!
        </div>
      `
      )
    )
  )

  results
    .flatMap(result => result.root.nodes.filter(isAtRule))
    .forEach(actual => {
      const [name] = (actual.raws.tailwind as TailwindRaws).candidate.split(":")
      const expected = variantsWithPrefix[name]

      expect(actual.params).toBe(expected)
    })
})

pluginTest("supports custom prefix", async ({transform}) => {
  const expected = "custom-device-prefix"

  const input = html`
    <div class="hidden ${withPrefix("touch", expected)}:block">Test</div>
  `

  const result = await transform(plugin({prefix: expected}), input)

  const [rule] = result.root.nodes.filter(isAtRule)

  const actual = (rule?.raws?.tailwind as TailwindRaws)?.candidate

  expect(actual?.startsWith(expected)).toBe(true)
})
