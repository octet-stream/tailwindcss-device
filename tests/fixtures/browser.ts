import {type Locator, page} from "@vitest/browser/context"
import {test} from "vitest"

import {parse} from "../utils/parse.ts"

interface RenderFuction {
  (html: string): Locator
}

interface BrowserTestContext {
  render: RenderFuction
}

export const browserTest = test.extend<BrowserTestContext>({
  async render({onTestFinished}, use) {
    onTestFinished(() => {
      document.body.innerHTML = "" // Cleanup to avoid conflicts
    })

    const render: RenderFuction = html => {
      document.body.append(parse(html))

      return page.elementLocator(document.body)
    }

    await use(render)
  }
})

export {browserTest as test}
