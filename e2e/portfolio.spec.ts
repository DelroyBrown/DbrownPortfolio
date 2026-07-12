import { expect, test } from "@playwright/test";

test.describe("portfolio", () => {
  test.beforeEach(async ({ page }) => {
    // Each test context is a fresh session; skip the intro sequence so
    // clicks aren't consumed by the loader overlay.
    await page.addInitScript(() => sessionStorage.setItem("djb-intro-seen", "1"));
  });

  test("the intro loader runs once on a first visit", async ({ page }) => {
    await page.addInitScript(() => sessionStorage.removeItem("djb-intro-seen"));
    await page.goto("/");
    await expect(page.getByText(/initialising interface|loading selected work/i)).toBeVisible();
    // resolves on its own and reveals the hero
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Delroy J.", {
      timeout: 10_000,
    });
  });

  test("homepage loads with no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Delroy J.");
    await expect(page.getByText("Open to roles & select projects")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("primary navigation reaches each section", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop nav is hidden on mobile — covered by the menu test");
    await page.goto("/");
    const nav = page.locator("header").getByRole("navigation", { name: "Primary" });
    await nav.getByRole("button", { name: "Work", exact: true }).click();
    await expect(page.locator("#work")).toBeInViewport();
    await nav.getByRole("button", { name: "Contact", exact: true }).click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only behaviour");
    await page.goto("/");
    await page.getByRole("button", { name: /menu/i }).click();
    const dialog = page.getByRole("dialog", { name: /site menu/i });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /about/i }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page.locator("#about")).toBeInViewport();
  });

  test("Pendulum case study opens with correct external links", async ({ page }) => {
    await page.goto("/experiments/pendulum");
    await expect(page.getByRole("heading", { level: 1, name: "Pendulum" })).toBeVisible();
    await expect(page.getByRole("link", { name: /play live/i })).toHaveAttribute(
      "href",
      "https://delroybrown.github.io/pendulum/",
    );
    await expect(page.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/DelroyBrown/pendulum",
    );
  });

  test("Thread case study opens with correct external links", async ({ page }) => {
    await page.goto("/experiments/thread");
    await expect(page.getByRole("heading", { level: 1, name: "Thread" })).toBeVisible();
    await expect(page.getByRole("link", { name: /play live/i })).toHaveAttribute(
      "href",
      "https://delroybrown.github.io/thread/",
    );
    await expect(page.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/DelroyBrown/thread",
    );
  });

  test("Invader Storm case study opens with correct external links", async ({ page }) => {
    await page.goto("/experiments/invader-storm");
    await expect(page.getByRole("heading", { level: 1, name: "Invader Storm" })).toBeVisible();
    await expect(page.getByRole("link", { name: /play live/i })).toHaveAttribute(
      "href",
      "https://delroybrown.github.io/Invader/",
    );
    await expect(page.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/DelroyBrown/Invader",
    );
  });

  test("play creates the live iframe and close tears it down", async ({ page }) => {
    await page.goto("/experiments/pendulum");
    await expect(page.locator("iframe")).toHaveCount(0);

    await page.getByRole("button", { name: /play inside the portfolio/i }).click();
    const iframe = page.locator('iframe[title="Play Pendulum"]');
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute("src", "https://delroybrown.github.io/pendulum/");

    await page.getByRole("button", { name: /close pendulum embed/i }).click();
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /play inside the portfolio/i }),
    ).toBeFocused();
  });

  test("code excerpts link to the real repositories", async ({ page }) => {
    await page.goto("/experiments/thread");
    const sourceLinks = page.getByRole("link", { name: /^source$/i });
    await expect(sourceLinks.first()).toHaveAttribute(
      "href",
      /github\.com\/DelroyBrown\/thread\/blob\/main\/.+#L\d+-L\d+/,
    );
  });

  test("keyboard: skip link appears first and focuses main content", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "keyboard navigation is a desktop concern");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("deep links survive a hard refresh (404 fallback)", async ({ page }) => {
    await page.goto("/approach");
    await page.reload();
    await expect(page.getByRole("heading", { name: /how i build/i })).toBeVisible();
  });
});
