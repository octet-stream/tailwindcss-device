import {fileURLToPath} from "node:url"
import {resolve} from "node:path"

import type {Result} from "postcss"
import type {Config} from "tailwindcss"

import test from "ava"

import postcss, {AtRule} from "postcss"

import tailwind from "tailwindcss"

import device from "../device.js"

import {variants} from "../variants.js"

type Variants = typeof variants

interface TailwindRaws {
  candidate: string,
  parentLayer: "utilities",
  layer: "variants"
}

interface Transform {
  (input: string, config: Config): Promise<Result>
}

interface Expectations {
  name: keyof Variants
  params: Variants[keyof Variants]
}

interface ImplementationResult {
  actual: Result
  expected: Expectations[]
}

type Implementation = (
  transform: Transform,
  html: typeof String.raw,
  css: typeof String.raw
) => Promise<ImplementationResult>

const isAtRule = (value: unknown): value is AtRule => value instanceof AtRule

export const withTransform = test.macro(async (t, impl: Implementation) => {
  const css = String.raw
  const html = String.raw

  const transform: Transform = (input, config) => {
    config.plugins = [...(config.plugins ?? []), device]

    return postcss(tailwind(config))
      .process(input, {
        from: `${resolve(fileURLToPath(import.meta.url))}?test=${t.title}`
      })
  }

  const {expected, actual} = await impl(transform, html, css)

  const nodes = [...actual.root.nodes].filter(isAtRule)

  t.plan(expected.length * 5)
  for (const [index, node] of nodes.entries()) {
    const expectations = expected[index]

    t.is(node.name, "media", "Variant must be applied as @media query")
    t.is(node.params, expectations.params, "Should apply params from variant")

    const raws = node.raws.tailwind as TailwindRaws

    t.is(raws.layer, "variants", "Should be applied to variants layer")
    t.is(raws.parentLayer, "utilities", "Should be at utilities parent layer")
    t.true(
      raws.candidate.startsWith(`device-${expectations.name}`),

      "Selector should start with device's variant name"
    )
  }
})
