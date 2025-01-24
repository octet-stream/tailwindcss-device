import {expect} from "vitest"

import {test} from "../fixtures/browser.ts"

import {input} from "../fixtures/sharedHtmlInput.ts"

test("desktop element is visible", async ({render}) => {
  const locator = render(input)

  await expect.element(locator.getByText("Hello from desktop")).toBeVisible()
})

test("mobile element is hidden", async ({render}) => {
  const locator = render(input)

  await expect.element(locator.getByText("Hello from mobile")).not.toBeVisible()
})
