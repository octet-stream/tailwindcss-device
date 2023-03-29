import {fileURLToPath} from "node:url"
import {resolve} from "node:path"

import type {Result} from "postcss"
import type {Config} from "tailwindcss"

import test from "ava"

import postcss, {AtRule} from "postcss"

import tailwind from "tailwindcss"

import plugin from "../plugin.js"

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

export const withTransform = test.macro(async (t, impl: Implementation) => {
  const css = String.raw
  const html = String.raw

  const transform: Transform = (input, config) => {
    config.plugins = [...(config.plugins ?? []), plugin]

    return postcss(tailwind(config))
      .process(input, {
        from: `${resolve(fileURLToPath(import.meta.url))}?test=${t.title}`
      })
  }

  const {expected, actual} = await impl(transform, html, css)

  t.plan(expected.length * 5)
  for (const [index, node] of actual.root.nodes.entries()) {
    if (!(node instanceof AtRule)) {
      return t.fail(`Expected at-rule node. Got: ${node.type}`)
    }

    const expectations = expected[index]

    t.is(node.name, "media")
    t.is(node.params, expectations.params)

    const raws = node.raws.tailwind as TailwindRaws

    t.is(raws.layer, "variants")
    t.is(raws.parentLayer, "utilities")
    t.is(raws.candidate.split(":")[0], `device-${expectations.name}`)
  }
})
