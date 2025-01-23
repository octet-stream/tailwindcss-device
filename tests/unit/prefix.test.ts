import {expect, test} from "vitest"

import {DEFAULT_PREFIX, withPrefix} from "../../src/prefix.js"

test("adds default prefix", () => {
  expect(withPrefix("test")).toBe(`${DEFAULT_PREFIX}-test`)
})

test("adds given prefix", () => {
  expect(withPrefix("test", "my-prefix")).toBe("my-prefix-test")
})
