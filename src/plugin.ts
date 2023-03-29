import plugin from "tailwindcss/plugin.js"
import postcss from "postcss"

import {entries} from "./entries.js"
import {variants} from "./variants.js"

/**
 * Adds variants to specify input device type and applies `@media` query accordingly to the variant.
 */
const device = plugin(({addVariant}) => {
  entries(variants).forEach(([name, params]) => addVariant(
    `device-${name}`,

    postcss.atRule({name: "media", params}).toString()
  ))
})

export default device
