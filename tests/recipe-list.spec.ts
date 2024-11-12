import { test, expect } from "@playwright/test";

test.describe("Recipe page result", () => {
    test("should open the created page in browser", async ({ page }) => {
        await page.goto("http://localhost:3000/recipe-list");
        await expect(page.locator("h1")).toHaveText("Recipe list");
    });
});
