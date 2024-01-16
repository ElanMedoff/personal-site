import { test } from "@playwright/test";

test.describe("root", async () => {
  test("takes screenshot", async ({ page }) => {
    await page.emulateMedia({ media: "print" });
    await page.goto("/resume");
    await page.pdf({
      path: "public/resume.pdf",
      format: "A3",
      printBackground: true,
    });
  });
});
