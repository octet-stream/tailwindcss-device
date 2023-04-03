/* eslint-disable no-shadow */

import type {Result} from "postcss"

import test from "ava"

import {AtRule} from "postcss"
import type {Config} from "tailwindcss"

import {transform} from "../__helper__/transform.js"

import type {PluginDeviceOptions} from "../device.js"
import {withPrefix} from "../prefix.js"
import {variants} from "../variants.js"

type Variants = typeof variants

interface TailwindRaws {
  candidate: string,
  parentLayer: "utilities",
  layer: "variants"
}

interface Expectations {
  name: keyof Variants
  params: Variants[keyof Variants]
}

interface ImplementationResult {
  actual: Result
  expected: Expectations[]
  prefix?: string
}

interface Transform {
  (
    input: string,
    config: Config,
    options?: PluginDeviceOptions
  ): Promise<Result>
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

  const transformWithTitle: Transform = (
    input,
    config,
    options
  ) => transform(t.title, input, config, options)

  const {expected, actual, prefix} = await impl(transformWithTitle, html, css)

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
      raws.candidate.startsWith(`${withPrefix(expectations.name, prefix)}`),

      "Selector should start with device's variant name"
    )
  }
})
