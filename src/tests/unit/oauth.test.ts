import { expect, test } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

test("oauth", async ({ page }) => {
  await test.step("should disable the upvote icon when logged out", async () => {
    await page.goto("/blog/barebones-approach-to-continuous-integration");

    await expect(page.getByTestId("upvote-icon")).toHaveAttribute("aria-disabled", "true");
    await expect(page.getByTestId("upvote-count")).toHaveText("0");
  });

  await test.step("should login through github", async () => {
    await page.getByText("login with github").click();
    await page.waitForURL("**/github.com/login?*");

    if (!process.env.PLAYWRIGHT_OAUTH_EMAIL) {
      throw new Error("Can't read PLAYWRIGHT_OAUTH_EMAIL");
    }
    await page.getByLabel("Username or email address").fill(process.env.PLAYWRIGHT_OAUTH_EMAIL);

    if (!process.env.PLAYWRIGHT_OAUTH_PASSWORD) {
      throw new Error("Can't read PLAYWRIGHT_OAUTH_EMAIL");
    }
    await page.getByLabel("Password").fill(process.env.PLAYWRIGHT_OAUTH_PASSWORD);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    await page.waitForURL("**/blog/barebones-approach-to-continuous-integration");
  });

  await test.step("should upvote", async () => {
    await expect(page.getByTestId("upvote-icon")).toHaveAttribute("aria-disabled", "false");
    await expect(page.getByTestId("upvote-count")).toHaveText("0");

    await page.getByTestId("upvote-icon").click();
    await expect(page.getByTestId("upvote-count")).toHaveText("1");

    await page.reload();
    await expect(page.getByTestId("upvote-count")).toHaveText("1");

    await page.getByTestId("upvote-icon").click();
    await expect(page.getByTestId("upvote-count")).toHaveText("0");

    await page.getByTestId("upvote-icon").click();
    await expect(page.getByTestId("upvote-count")).toHaveText("1");
  });

  await test.step("should logout", async () => {
    await page.getByText("logout").click();

    await expect(page.getByTestId("upvote-icon")).toHaveAttribute("aria-disabled", "true");
    await expect(page.getByTestId("upvote-count")).toHaveText("1");

    await page.reload();
    await expect(page.getByTestId("upvote-count")).toHaveText("1");
  });
});
