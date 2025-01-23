/// <reference types="@vitest/browser/providers/playwright" />
import {defineWorkspace} from "vitest/config"

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      name: "unit",
      environment: "node",
      include: ["tests/unit/**/*.test.ts"]
    }
  }
  // {
  //   extends: "vitest.config.ts",
  //   test: {
  //     include: ["tests/browser/**/*.test.ts"],
  //     browser: {
  //       enabled: true,
  //       headless: true,
  //       provider: "playwright", // https://vitest.dev/guide/browser/playwright
  //       instances: [
  //         {
  //           browser: "chromium"
  //         }
  //       ]
  //     }
  //   }
  // }
])
