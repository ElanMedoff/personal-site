import { expect, test } from "@playwright/test";

test.describe("blog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("has collections, blog posts", async ({ page }) => {
    await expect(page.getByText("collections")).toBeVisible();
    await page.getByText("Lessons From Reading a Thousand Comics: An Intro").click();
    await expect(page).toHaveURL("blog/lessons-from-reading-a-thousand-comics");
  });

  test("has blog posts", async ({ page }) => {
    await expect(page.getByText("blog posts")).toBeVisible();
    await page.getByText("A Barebones Approach to Continuous Integration").click();
    await expect(page).toHaveURL("blog/barebones-approach-to-continuous-integration");
  });

  test.describe("tags", () => {
    test("has tags", async ({ page }) => {
      await expect(page.getByText("tags")).toBeVisible();
      await expect(page.getByText("filter method")).toBeVisible();
      await expect(page.getByTestId("sidebar").getByText("comics")).toBeVisible();
      await expect(page.getByText("union")).toBeVisible();
      await expect(page.getByText("intersection")).toBeVisible();
    });

    test("clicking a tag should filter the posts", async ({ page }) => {
      async function isHighlighted(text: string) {
        await expect(page.getByTestId("sidebar").getByText(text)).toHaveClass(
          /(^|\s)bg-secondary(\s|$)/,
          {
            timeout: 30_000,
          },
        );
      }
      async function isNotHighlighted(text: string) {
        await expect(page.getByTestId("sidebar").getByText(text)).not.toHaveClass(
          /(^|\s)bg-secondary(\s|$)/,
          {
            timeout: 30_000,
          },
        );
      }

      await isHighlighted("union");

      await page.getByTestId("sidebar").getByText("comics").click();
      await isHighlighted("comics");

      await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeHidden();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro"),
      ).toBeVisible();

      await page.getByTestId("sidebar").getByText("devops").click();
      await isHighlighted("devops");
      await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeVisible();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro"),
      ).toBeVisible();

      await page.getByTestId("sidebar").getByText("intersection").click();
      await isHighlighted("intersection");

      await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeHidden();
      await expect(page.getByText("Lessons From Reading a Thousand Comics: An Intro")).toBeHidden();

      await page.getByText("reset all").click();
      await isNotHighlighted("union");
      await isNotHighlighted("comics");
      await isNotHighlighted("devops");
      await isHighlighted("intersection");

      await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeVisible();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro"),
      ).toBeVisible();
    });
  });

  test("fuzzy searching should filter the posts", async ({ page }) => {
    await expect(page.getByText("React Suspense in three different architectures")).toBeVisible();
    await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeVisible();

    await page.getByPlaceholder("fuzzy search").fill("asdf");
    await expect(page.getByText("React Suspense in three different architectures")).toBeVisible();
    await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeHidden();
  });
});
