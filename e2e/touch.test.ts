import {expect} from "@playwright/test"

import {test, setup, teardown} from "./__helper__/hooks.js"

test.beforeAll(setup)

test.afterAll(teardown)

test("1st <div> element is visible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on touchscreen device!")

  await expect(element).toHaveCSS("display", "block")
})

test("2nd <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on desktop with mouse!")

  await expect(element).toHaveCSS("display", "none")
})

test("3rd <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText(
    "Hello! I'm visible on desktop with touchscreen!"
  )

  await expect(element).toHaveCSS("display", "none")
})

test("4th <div> element is invisible on touchscreen device", async ({page}) => {
  const element = page.getByText("Hello! I'm visible on any desktop!")

  await expect(element).toHaveCSS("display", "none")
})
