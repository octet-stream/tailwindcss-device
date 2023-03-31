import {expect, devices} from "@playwright/test"

import {test, setup, teardown} from "./__helper__/hooks.js"

test.use({
  ...devices["iPhone 12 Pro"],
  ...devices["Pixel 5"],
  ...devices["iPad Pro 11"]
})

test.beforeAll(setup)

test.afterAll(teardown)

test("1st <div> element is visible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on touchscreen device!")

  await expect(element).toBeVisible()
})

test("2nd <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on desktop with mouse!")

  await expect(element).toBeHidden()
})

test("3rd <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on desktop with touchscreen!")

  await expect(element).toBeHidden()
})
