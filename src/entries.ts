type ObjectEntries<T extends object> = [keyof T, T[keyof T]][]

/**
 * Returns an array of key/values of the enumerable properties of an object.
 *
 * Unlike `Object.entries`, this function returns proper entries TypeScript type.
 *
 * @param value Object that contains properties and methods.
 *
 * @api private
 */
export const entries = <T extends object>(value: T) =>
  Object.entries(value) as ObjectEntries<T>
