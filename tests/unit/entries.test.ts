import {expect, test} from "vitest"

import {entries} from "../../src/entries.ts"

const input = {
  name: "John Doe",
  age: 32
} as const

test("returns correct entries", () => {
  expect(entries(input)).toEqual(Object.entries(input))
})
