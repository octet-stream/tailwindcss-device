import {expect, devices} from "@playwright/test"

import {test, setup, teardown} from "./__helper__/hooks.js"

test.use({
  ...devices["Desktop Chrome"],
  ...devices["Desktop Edge"],
  ...devices["Desktop Firefox"],
  ...devices["Desktop Safari"]
})

test.beforeAll(setup)

test.afterAll(teardown)

test("1st <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on touchscreen device!")

  await expect(element).toBeHidden()
})

test("2nd <div> element is visible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on desktop with mouse!")

  await expect(element).toBeVisible()
})

test("3rd <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on desktop with touchscreen!")

  await expect(element).toBeHidden()
})
