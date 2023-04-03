import plugin from "tailwindcss/plugin.js"
import postcss from "postcss"

import {entries} from "./entries.js"
import {variants} from "./variants.js"
import {withPrefix} from "./prefix.js"

export interface PluginDeviceOptions {
  /**
   * Prefix for `device` plugin variants.
   *
   * Defaults to `device`
   */
  prefix?: string
}

/**
 * Adds variants allowing to specify input device type.
 *
 * It when wraps followed styles with `@media` query accordingly to the variant.
 *
 * @api public
 *
 * @example
 *
 * 1. Add plugin to your `tailwind.config.js` plugins section:
 *
 * ```ts
 * const {device} = require("tailwindcss-device")
 *
 * module.exports = {
 *   plugins: [
 *     device
 *     // ...
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
export const device = plugin.withOptions<PluginDeviceOptions>(
  (options = {}) => ({addVariant}) => {
    entries(variants).forEach(([name, params]) => addVariant(
      withPrefix(name, options.prefix),

      postcss.atRule({name: "media", params}).toString()
    ))
  }
)

export default device
