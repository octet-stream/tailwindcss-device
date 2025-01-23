import {expect} from "vitest"

import {test} from "../fixtures/browser.js"
import {input} from "../fixtures/sharedHtmlInput.js"

test("displays element on mobile device", async ({render}) => {
  const locator = render(input)

  await expect
    .element(locator.getByText("Hello from mobile", {exact: true}))
    .toBeVisible()
})

test("does not display element with desktop variant", async ({render}) => {
  const locator = render(input)

  await expect
    .element(locator.getByText("Hello from desktop", {exact: true}))
    .not.toBeVisible()
})
