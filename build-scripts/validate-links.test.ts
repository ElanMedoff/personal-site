import { test, expect, Page } from "@playwright/test";
import { fetchSlugs } from "src/utils/post";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

async function validateLinks(page: Page) {
  const pageURL = page.url();
  const anchorTagLocator = page.locator("a");
  const allAnchorTags = await anchorTagLocator.all();
  const allHrefs = await Promise.all(allAnchorTags.map((link) => link.getAttribute("href")));

  const normalizedHrefs = allHrefs
    .map((href) => {
      if (!href) return;
      if (href.startsWith("mailto:")) {
        return;
      }
      if (href.startsWith("#")) {
        return new URL(href, pageURL).href;
      }
      if (href.startsWith("/")) {
        return new URL(href, "http://localhost:3001").href;
      }
      return href;
    })
    .filter(notEmpty);

  const assertionPromises = normalizedHrefs.map(async (href) => {
    const response = await page.request.get(href);
    // console.log("href: ", href);
    expect(response.ok(), `${href} is a dead link!`).toBeTruthy();
  });

  await Promise.all(assertionPromises);
}

test("root", async ({ page }) => {
  await page.goto("/");
  await validateLinks(page);
});

test("blog", async ({ page }) => {
  await page.goto("/blog");
  await validateLinks(page);
});

const slugs = fetchSlugs();
slugs.forEach((slug) => {
  test(`blog.${slug}`, async ({ page }) => {
    await page.goto(`/blog/${slug}`);
    await validateLinks(page);
  });
});

test("bonus", async ({ page }) => {
  await page.goto("/bonus");
  await validateLinks(page);
});

test("resume", async ({ page }) => {
  await page.goto("/resume");
  await validateLinks(page);
});
