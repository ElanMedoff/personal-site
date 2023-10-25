import { test, expect } from "@playwright/test";

test.describe("blog", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("has collections", async ({ page }) => {
    await expect(page.getByText("collections")).toBeVisible();
    await page
      .getByText("Lessons From Reading a Thousand Comics: An Intro")
      .click();
    await expect(page).toHaveURL("blog/lessons-from-reading-a-thousand-comics");
  });

  test("has blog posts", async ({ page }) => {
    await expect(page.getByText("blog posts")).toBeVisible();
    await page
      .getByText("A Barebones Approach to Continuous Integration")
      .click();
    await expect(page).toHaveURL(
      "blog/barebones-approach-to-continuous-integration"
    );
  });

  test.describe("tags", async () => {
    test("has tags", async ({ page }) => {
      await expect(page.getByText("tags")).toBeVisible();
      await expect(page.getByText("filter method")).toBeVisible();
      await expect(
        page.getByTestId("sidebar").getByText("comics")
      ).toBeVisible();
      await expect(page.getByText("union")).toBeVisible();
      await expect(page.getByText("intersection")).toBeVisible();
    });

    test("clicking a tag should filter the posts", async ({ page }) => {
      async function isHighlighted(text: string) {
        return (await page
          .getByTestId("sidebar")
          .getByText(text)
          .getAttribute("class"))!.includes("bg-secondary");
      }

      expect(await isHighlighted("union")).toBeTruthy();

      await page.getByTestId("sidebar").getByText("comics").click();
      expect(await isHighlighted("comics")).toBeTruthy();

      await expect(
        page.getByText("A Barebones Approach to Continuous Integration")
      ).toBeHidden();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro")
      ).toBeVisible();

      await page.getByTestId("sidebar").getByText("devops").click();
      expect(await isHighlighted("devops")).toBeTruthy();
      await expect(
        page.getByText("A Barebones Approach to Continuous Integration")
      ).toBeVisible();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro")
      ).toBeVisible();

      await page.getByTestId("sidebar").getByText("intersection").click();
      expect(await isHighlighted("intersection")).toBeTruthy();

      await expect(
        page.getByText("A Barebones Approach to Continuous Integration")
      ).toBeHidden();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro")
      ).toBeHidden();

      await page.getByText("reset all").click();
      expect(await isHighlighted("union")).toBeFalsy();
      expect(await isHighlighted("comics")).toBeFalsy();
      expect(await isHighlighted("devops")).toBeFalsy();
      expect(await isHighlighted("intersection")).toBeTruthy();

      await expect(
        page.getByText("A Barebones Approach to Continuous Integration")
      ).toBeVisible();
      await expect(
        page.getByText("Lessons From Reading a Thousand Comics: An Intro")
      ).toBeVisible();
    });
  });

  test("fuzzy searching should filter the posts", async ({ page }) => {
    await expect(
      page.getByText("React Suspense in three different architectures")
    ).toBeVisible();
    await expect(
      page.getByText("A Barebones Approach to Continuous Integration")
    ).toBeVisible();

    await page.getByPlaceholder("fuzzy search").type("asdf");
    await expect(
      page.getByText("React Suspense in three different architectures")
    ).toBeVisible();
    await expect(
      page.getByText("A Barebones Approach to Continuous Integration")
    ).toBeHidden();
  });
});
