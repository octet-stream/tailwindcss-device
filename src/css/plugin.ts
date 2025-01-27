import postcss from "postcss"

import {entries} from "../entries.ts"
import {withPrefix} from "../prefix.ts"
import {variants} from "../variants.ts"
import {createVariantMediaQuery} from "./media.ts"

export const plugin = postcss
  .root({raws: {indent: "  ", after: "\r"}})
  .append({
    text: "\r * This plugin is generated for tailwindcss 4.\r *\r * Do not use the plugin outside of it.\r"
  })
  .append(
    entries(variants).map(([name, params]) => {
      const variant = postcss.atRule({
        name: "custom-variant", // Creates @custom-variant directive. See: https://tailwindcss.com/docs/functions-and-directives#custom-variant-directive
        params: withPrefix(name)
      })

      const media = createVariantMediaQuery(params)
      const slot = postcss.atRule({name: "slot"}) // Creates @slot directive

      media.append(slot)
      variant.append(media)

      return variant
    })
  )
  .toString()
