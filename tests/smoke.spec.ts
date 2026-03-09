import { test, expect } from "@playwright/test";

// ─── Locale routing ───────────────────────────────────────────────────────────

test("/ redirects to /vi", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/vi/);
});

test("/vi loads hero section", async ({ page }) => {
  await page.goto("/vi");
  // Hero section has id="home"
  await expect(page.locator("#home")).toBeVisible();
  // h1 uses dangerouslySetInnerHTML with the locale text
  await expect(page.locator("h1#heroHeading")).toBeVisible();
});

test("/en loads English content", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("#home")).toBeVisible();
  // Verify locale is set correctly on the <html> element
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

// ─── Language switcher ────────────────────────────────────────────────────────

test("lang switcher: vi → en switches locale in URL", async ({ page }) => {
  await page.goto("/vi");
  // aria-label is "Switch to English" (from vi.json nav.lang.label)
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en/);
});

test("lang switcher: en → vi switches locale in URL", async ({ page }) => {
  await page.goto("/en");
  // Find the lang button by its visible text "VI" (shown when current locale is en)
  await page
    .locator('nav[aria-label="Main navigation"] button', { hasText: "VI" })
    .click();
  await expect(page).toHaveURL(/\/vi/);
});

// ─── Room modal ───────────────────────────────────────────────────────────────

test("room card click opens modal", async ({ page }) => {
  await page.goto("/vi");
  // Room cards are <article role="button"> — pick first interactive one
  const roomCard = page.locator('#rooms article[role="button"]').first();
  await roomCard.click();
  // Wait for a dialog with aria-hidden="false" (the open room modal)
  await expect(
    page.locator('[role="dialog"][aria-hidden="false"]')
  ).toBeVisible();
});

test("room modal closes on Escape", async ({ page }) => {
  await page.goto("/vi");
  const roomCard = page.locator('#rooms article[role="button"]').first();
  await roomCard.click();
  await page.waitForSelector('[role="dialog"][aria-hidden="false"]');
  await page.keyboard.press("Escape");
  // RoomModal renders null when closed — no open dialog should remain
  await expect(
    page.locator('[role="dialog"][aria-hidden="false"]')
  ).toHaveCount(0);
});

// ─── FAQ accordion ────────────────────────────────────────────────────────────

test("FAQ details element opens and closes", async ({ page }) => {
  await page.goto("/vi");
  const faqItem = page.locator("#faq details").first();
  await expect(faqItem).not.toHaveAttribute("open");
  await faqItem.locator("summary").click();
  await expect(faqItem).toHaveAttribute("open", "");
  await faqItem.locator("summary").click();
  await expect(faqItem).not.toHaveAttribute("open");
});

// ─── Explore filter tabs ──────────────────────────────────────────────────────

test("explore filter: selecting 'running' hides non-running cards", async ({
  page,
}) => {
  await page.goto("/vi");
  await page
    .locator('[role="tablist"] [role="tab"]')
    .filter({ hasText: /chạy|running/i })
    .click();
  const hiddenCards = page.locator('#explore article[aria-hidden="true"]');
  await expect(hiddenCards).not.toHaveCount(0);
});

test("explore filter: selecting 'all' shows all cards", async ({ page }) => {
  await page.goto("/vi");
  await page
    .locator('[role="tablist"] [role="tab"]')
    .filter({ hasText: /chạy|running/i })
    .click();
  await page
    .locator('[role="tablist"] [role="tab"]')
    .filter({ hasText: /tất cả|all/i })
    .click();
  const hiddenCards = page.locator('#explore article[aria-hidden="true"]');
  await expect(hiddenCards).toHaveCount(0);
});
