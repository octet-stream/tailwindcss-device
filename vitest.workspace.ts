/// <reference types="@vitest/browser/providers/playwright" />

import {devices} from "playwright"
import {defineWorkspace} from "vitest/config"

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      name: "unit",
      include: ["tests/unit/**/*.test.ts"]
    }
  },
  {
    extends: "vitest.config.ts",
    test: {
      name: "mobile",
      include: ["tests/browser/**/*.mobile.test.ts"],
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright", // https://vitest.dev/guide/browser/playwright
        instances: [
          {
            browser: "chromium",
            name: "Pixel 5",
            context: devices["Pixel 5"]
          },
          {
            browser: "chromium",
            name: "iPhone 12 Pro",
            context: devices["iPhone 12 Pro"]
          }
        ]
      }
    }
  },
  {
    extends: "vitest.config.ts",
    test: {
      name: "desktop",
      include: ["tests/browser/**/*.desktop.test.ts"],
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        instances: [
          {
            browser: "chromium"
          },
          {
            browser: "firefox"
          },
          {
            browser: "webkit"
          }
        ]
      }
    }
  }
])
