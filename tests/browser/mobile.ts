import {expect} from "vitest"

import {test} from "../fixtures/browser.ts"
import {input} from "../fixtures/sharedHtmlInput.ts"

import {createSuite} from "./suite.ts"

createSuite(import.meta.url, () => {
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
})
