import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Vite + React")).toBeVisible()
  await expect(page).toHaveScreenshot("00-my-first-screenshot.png")
})
