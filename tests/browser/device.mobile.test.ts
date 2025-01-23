import {expect} from "vitest"

import {test} from "../fixtures/browser.js"
import {input} from "../fixtures/sharedHtmlInput.js"

test("mobile element is visible", async ({render}) => {
  const locator = render(input)

  await expect.element(locator.getByText("Hello from mobile")).toBeVisible()
})

test("desktop element is hidden", async ({render}) => {
  const locator = render(input)

  await expect
    .element(locator.getByText("Hello from desktop"))
    .not.toBeVisible()
})
