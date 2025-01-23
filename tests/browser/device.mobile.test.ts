import {expect} from "vitest"

import {test} from "../fixtures/browser.js"
import {html} from "../utils/templates.js"

test("displays element on mobile device", async ({render}) => {
  const locator = render(html`
    <div class="device-touch:block hidden">
      Hello from mobile!
    </div>
  `)

  await expect.element(locator.getByText("Hello from mobile!")).toBeVisible()
})
