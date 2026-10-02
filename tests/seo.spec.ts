import { test, expect } from "@playwright/test";

test("public content and metadata are available without JavaScript", async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const canonicalUrls: string[] = [];
  try {
    for (const route of ["/", "/productos"]) {
      await page.goto(`http://localhost:3000${route}`);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(
        page.locator('head meta[name="description"]'),
      ).toHaveAttribute("content", /Del Castelar/);
      const title = await page.title();
      expect(title).toContain("Del Castelar");
      expect(title).toContain("Córdoba");
      for (const selector of [
        'meta[property="og:title"]',
        'meta[name="twitter:title"]',
      ]) {
        await expect(page.locator(`head ${selector}`)).toHaveAttribute(
          "content",
          title,
        );
      }
      await expect(
        page.locator('head meta[name="twitter:card"]'),
      ).toHaveAttribute("content", "summary_large_image");
      const imageUrl = await page
        .locator('head meta[property="og:image"]')
        .getAttribute("content");
      expect(imageUrl).toMatch(/^https?:\/\//);
      const image = await request.get(new URL(imageUrl!).pathname);
      expect(image.ok()).toBe(true);
      expect(image.headers()["content-type"]).toContain("image/");
      const canonical = page.locator('head link[rel="canonical"]');
      if (await canonical.count()) {
        const href = (await canonical.getAttribute("href"))!;
        expect(new URL(href).pathname).toBe(route);
        await expect(
          page.locator('head meta[property="og:url"]'),
        ).toHaveAttribute("content", href);
        await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
          "content",
          "index, follow",
        );
        canonicalUrls.push(href);
      } else {
        await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
          "content",
          /noindex/,
        );
      }
      const missingAlt = await page
        .locator("main img")
        .evaluateAll(
          (images) =>
            images.filter((image) => !image.getAttribute("alt")?.trim()).length,
        );
      expect(missingAlt).toBe(0);
      if (route === "/productos") {
        await expect(page.locator(".catalog-product")).toHaveCount(7);
        await expect(page.locator(".catalog-product h2")).toContainText([
          "Facturas",
          "Panificados",
          "Pastelería",
          "Tortas",
          "Masas y cosas dulces",
          "Salados",
          "Café",
        ]);
      } else {
        await expect(page.locator("main")).toContainText("Potosí 908");
        const schema = JSON.parse(
          await page.locator('script[type="application/ld+json"]').innerText(),
        );
        expect(schema["@type"]).toBe("Bakery");
        if (canonicalUrls.length)
          expect(schema["@id"]).toBe(`${canonicalUrls[0]}/#panaderia`);
      }
    }
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(
      [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
    ).toEqual(canonicalUrls);
    expect(sitemap).not.toContain("categoria=");
    const robots = await (await request.get("/robots.txt")).text();
    if (canonicalUrls.length) {
      expect(robots).toContain("Allow: /");
      expect(robots).toContain(
        `${new URL(canonicalUrls[0]).origin}/sitemap.xml`,
      );
    } else {
      expect(robots).toContain("Disallow: /");
    }
  } finally {
    await context.close();
  }
});

test("catalog filters retain the public canonical and errors remain noindex", async ({
  page,
  request,
}) => {
  await page.goto("/productos");
  const canonicalLink = page.locator('link[rel="canonical"]');
  const canonical = (await canonicalLink.count())
    ? await canonicalLink.getAttribute("href")
    : null;
  await page.getByRole("button", { name: "Facturas", exact: true }).click();
  await expect(page).toHaveURL(/categoria=facturas/);
  if (canonical) await expect(canonicalLink).toHaveAttribute("href", canonical);
  await page.reload();
  if (canonical) await expect(canonicalLink).toHaveAttribute("href", canonical);
  for (const route of ["/no-existe", "/_not-found"]) {
    const response = await request.get(route);
    if (route === "/no-existe") expect(response.status()).toBe(404);
    await page.goto(route);
    await expect(page).toHaveTitle("Página no encontrada | Del Castelar");
    const rules = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("content")),
      );
    expect(rules.some((rule) => rule?.includes("noindex"))).toBe(true);
    expect(rules.some((rule) => rule?.split(/[, ]+/).includes("index"))).toBe(
      false,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});
