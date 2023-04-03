export const DEFAULT_PREFIX = "device"

/**
 * Adds a `prefix` before given `name` argument
 *
 * @api private
 */
export const withPrefix = (
  name: string,
  prefix: string = DEFAULT_PREFIX
): string => `${prefix}-${name}`
