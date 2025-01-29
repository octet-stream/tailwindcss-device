import {describe} from "vitest"

type SuiteFn = () => void

/**
 * Naive filename extraction for test suite
 */
const getName = (url: string) => {
  const parts = url.split(/(\\|\/)/)

  return parts[parts.length - 1].split(".")[0]
}

export const createSuite = (url: string, fn: SuiteFn) =>
  describe(getName(url), fn)
