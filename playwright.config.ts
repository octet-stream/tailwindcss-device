import {defineConfig, devices} from "@playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "e2e",
  testIgnore: ["e2e/**/__fixture__/**", "e2e/**/__helper__/**"],
  outputDir: ".e2e-results",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "Mobile Chrome",
      testMatch: "touch.test.ts",
      use: {
        ...devices["Pixel 5"]
      }
    },
    {
      name: "Mobile Safari",
      testMatch: "touch.test.ts",
      use: {
        ...devices["iPhone 12 Pro"]
      }
    },

    {
      name: "Desktop Chrome",
      testMatch: "desktop.test.ts",
      use: {
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "Desktop Safari",
      testMatch: "desktop.test.ts",
      use: {
        ...devices["Desktop Safari"]
      }
    },
    {
      name: "Desktop Firefox",
      testMatch: "desktop.test.ts",
      use: {
        ...devices["Desktop Firefox"]
      }
    },
    {
      name: "Desktop Edge",
      testMatch: "desktop.test.ts",
      use: {
        ...devices["Desktop Edge"]
      }
    }
  ]
})
