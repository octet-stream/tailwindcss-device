import postcss from "postcss"

import {entries} from "../entries.ts"
import {withPrefix} from "../prefix.ts"
import {variants} from "../variants.ts"
import {indent} from "./format.ts"
import {createVariantMediaQuery} from "./media.ts"

export const plugin = postcss
  .root({raws: {indent, after: "\r"}})
  .append({
    text: "\n * This plugin is generated for tailwindcss 4.\n *\n * Do not use the plugin outside of it.\n"
  })
  .append(
    entries(variants).map(([name, params], index) => {
      const variant = postcss.atRule({
        name: "custom-variant", // Creates `@custom-variant` directive. See: https://tailwindcss.com/docs/functions-and-directives#custom-variant-directive
        params: withPrefix(name),
        raws: {
          before: index === 0 ? "\n" : "\n".repeat(2)
        }
      })

      const media = createVariantMediaQuery(params)

      media.append({name: "slot", raws: {before: `\n${indent.repeat(2)}`}}) // Add `@slot` directive within `@media`
      variant.append(media)

      return variant
    })
  )
  .toString()
