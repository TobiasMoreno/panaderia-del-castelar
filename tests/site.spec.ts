import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { business } from "../config/business";

const widths = [320, 360, 390, 430, 768, 1024, 1440, 1920];
for (const route of ["/", "/productos"]) {
  for (const width of widths) {
    test(`${route} responsive ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      // Scroll every viewport so lazy images are actually requested before checking them.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 750) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 70));
        }
      });
      await expect
        .poll(
          () =>
            page
              .locator("img")
              .evaluateAll((images) =>
                images.every(
                  (img) =>
                    img instanceof HTMLImageElement &&
                    img.complete &&
                    img.naturalWidth > 0,
                ),
              ),
          { timeout: 15000 },
        )
        .toBe(true);
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.screenshot({
        path: `.qa/${route === "/" ? "home" : "productos"}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: `.qa/${route === "/" ? "home" : "productos"}-viewport-${width}.png`,
          animations: "disabled",
        });
      expect(errors).toEqual([]);
    });
  }
}

test("category links, all filters, history and reload", async ({ page }) => {
  await page.goto("/");
  await page.locator(".featured-item--1 a").click();
  await expect(page).toHaveURL(/categoria=facturas/);
  await expect(page.locator(".catalog-product")).toHaveCount(1);
  for (const name of [
    "Panificados",
    "Pastelería",
    "Tortas",
    "Dulces",
    "Salados",
    "Café",
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".catalog-product")).toHaveCount(1);
    await expect(
      page.getByRole("button", { name, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Café", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /Todos/ }).click();
  await expect(page.locator(".catalog-product")).toHaveCount(7);
  await page.goBack();
  await expect(page.locator(".catalog-product")).toHaveCount(1);
  await expect(page.locator(".catalog-product h2")).toHaveText("Café");
  await page.goto("/productos?categoria=inexistente");
  await expect(page.locator(".catalog-product")).toHaveCount(7);
});

test("mobile menu traps focus, Escape restores focus, navigation works", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Abrir menú" });
  await open.click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await page.screenshot({ path: ".qa/menu-390.png", animations: "disabled" });
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await menu.getByRole("link", { name: /Local/ }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#local/);
  await open.click();
  await menu.getByRole("link", { name: /Productos/ }).click();
  await expect(page).toHaveURL(/productos/);
  await expect(menu).not.toBeVisible();
});

test("local business links, schema and metadata", async ({ page, request }) => {
  await page.goto("/");
  const schema = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(schema["@type"]).toBe("Bakery");
  expect(schema.telephone).toBe(business.phoneInternational);
  expect(schema.openingHoursSpecification).toHaveLength(5);
  await expect(
    page.locator('a[href^="https://wa.me/"]').first(),
  ).toHaveAttribute("href", business.whatsapp);
  await expect(
    page.getByRole("link", { name: /Cómo llegar/ }).first(),
  ).toHaveAttribute("href", business.maps);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "es_AR",
  );
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Ver mapa interactivo" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    business.mapEmbed,
  );
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
  expect((await request.get("/no-existe")).status()).toBe(404);
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!))) {
    await expect(page.locator(href)).toHaveCount(1);
  }
});

for (const route of ["/", "/productos"]) {
  test(`accessibility ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("reduced motion and initial layout stability", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const state = window as unknown as { testCLS: number };
    state.testCLS = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput) state.testCLS += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-photo")).toHaveCSS("animation-name", "none");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.waitForTimeout(1500);
  const cls = await page.evaluate(
    () => (window as unknown as { testCLS: number }).testCLS,
  );
  console.log(`Initial CLS: ${cls}`);
  expect(cls).toBeLessThan(0.1);
});
