import {expect, test} from "vitest"

import {AtRule, parse} from "postcss"

import {plugin} from "../../../src/css/plugin.ts"
import {entries} from "../../../src/entries.ts"
import {withPrefix} from "../../../src/prefix.ts"
import {variants} from "../../../src/variants.ts"
import {css} from "../../utils/templates.ts"

test("includes every variant", () => {
  const expected = entries(variants).map(([name]) => withPrefix(name))

  const actual = parse(plugin)
    .nodes.filter(node => node instanceof AtRule)
    .map(({params}) => params)

  expect(actual).toEqual(expected)
})

test("matches snapshot", () => {
  expect(plugin).toMatchInlineSnapshot(css`
    "/* 
     * This plugin is generated for tailwindcss 4.
     *
     * Do not use the plugin outside of it.
     */
    @custom-variant device-touch {
      @media (pointer: coarse) {
        @slot;
      }
    }

    @custom-variant device-desktop {
      @media (pointer: fine) or (pointer: none) {
        @slot;
      }
    }

    @custom-variant device-desktop-touch {
      @media (pointer: fine) and (any-pointer: coarse) {
        @slot;
      }
    }

    @custom-variant device-desktop-any {
      @media ((pointer: fine) or (pointer: none)) or ((pointer: fine) and (any-pointer: coarse)) {
        @slot;
      }
    }
    "
  `)
})
