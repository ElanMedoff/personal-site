import { test } from "@playwright/test";

test.describe("root", async () => {
  test("takes screenshot", async ({ page }) => {
    await page.emulateMedia({ media: "print" });
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");
    // const image = page.getByAltText("resume profile image");
    // const imageSrc = await image.getAttribute("src");
    // if (imageSrc) {
    //   console.log({ imageSrc });
    //   const imageResponse = await page.waitForResponse(imageSrc);
    //   await imageResponse.finished();
    // }
    await page.pdf({
      path: "public/resume.pdf",
      format: "A3",
      printBackground: true,
    });
  });
});
