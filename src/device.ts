import plugin from "tailwindcss/plugin.js"
import postcss from "postcss"

import {entries} from "./entries.js"
import {variants} from "./variants.js"

/**
 * Adds variants allowing to specify input device type.
 *
 * It when wraps followed styles with `@media` query accordingly to the variant.
 *
 * @example
 *
 * 1. Add plugin to your `tailwind.config.js` plugins section:
 *
 * ```ts
 * import device from "tailwind-plugin-device"
 *
 * export default {
 *   plugins: [
 *     device
 *   ]
 * }
 * ```
 *
 * 2. And then prefix utilities using available variants:
 *
 * ```html
 * <div class="border border-black rounded-md device-touch:rounded-lg">
 *   <div class="hidden device-touch:block">
 *     Hello, I'm visible on smartphones and tables!
 *   </div>
 *   <div class="hidden device-desktop:block">
 *     Hello, I'm visible on computer with mouse!
 *   </div>
 * <div>
 * ```
 */
const device = plugin(({addVariant}) => {
  entries(variants).forEach(([name, params]) => addVariant(
    `device-${name}`,

    postcss.atRule({name: "media", params}).toString()
  ))
})

export default device
