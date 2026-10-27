import { expect, test } from "@playwright/test";

const answers: Record<string, string> = {
  "q1a-alpha": "2,63",
  "q1b-y": "3289,5",
  "q1c-nx": "-259",
  "q1d-dy": "-157,9",
  "q2a-x1": "1000",
  "q2b-x2": "136,36",
  "q2c-x3": "1470",
  "q3a-s": "0,2",
  "q3a-sa": "-40",
  "q3b-c1400": "1160",
  "q3c-apc": "0,8235",
  "q4a-dmb": "20",
  "q4b-dm1": "333,33",
  "q4c-dres": "20",
  "q4d-dd": "333,33",
  "q5a-gdp": "3950",
  "q5b-cdp": "3830",
  "q5c-g": "870",
};

test("navigation from home to a topic works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Výpisky/ })).toBeVisible();
  await page.getByRole("link", { name: "Začít výkladem" }).click();
  await expect(page).toHaveURL(/\/vyklad$/);
  await page.getByRole("link", { name: /Model produkt–výdaje/ }).first().click();
  await expect(page).toHaveURL(/\/vyklad\/model-vydaje$/);
  await expect(
    page.getByRole("heading", { name: /Model produkt–výdaje/ }),
  ).toBeVisible();
  await expect(page.locator("#consumption-savings")).toBeVisible();
  await expect(page.locator("#keynesian-cross")).toBeVisible();
  expect(await page.locator(".formula-card").count()).toBeGreaterThan(10);
});

test("formula and graph pages render rich content", async ({ page }) => {
  await page.goto("/vzorce");
  await expect(page.getByRole("heading", { name: "Vzorce pro test" })).toBeVisible();
  expect(await page.locator(".formula-card").count()).toBeGreaterThan(25);
  expect(await page.locator(".katex").count()).toBeGreaterThan(20);

  await page.goto("/grafy");
  await expect(page.getByRole("heading", { name: "Grafy pro test" })).toBeVisible();
  await page.getByRole("link", { name: /Keynesiánský kříž/ }).click();
  await expect(page).toHaveURL(/\/grafy\/keynesian-cross$/);
  await expect(page.locator("#keynesian-cross")).toBeVisible();
  expect(await page.locator("#keynesian-cross svg").count()).toBeGreaterThan(0);
  await expect(page.getByText("Na co si dát pozor")).toBeVisible();
});

test("interactive test can be filled and scored", async ({ page }) => {
  await page.goto("/test");
  await expect(page.getByRole("heading", { name: "Vzorový test 1" })).toBeVisible();

  for (const [id, value] of Object.entries(answers)) {
    await page.locator(`#${id}`).fill(value);
  }

  const selfAssessment = page.getByRole("button", { name: "Umím" });
  const count = await selfAssessment.count();
  for (let index = 0; index < count; index += 1) {
    await selfAssessment.nth(index).click();
  }

  await page.getByRole("button", { name: "Vyhodnotit test" }).click();
  await expect(page.locator("#vysledek")).toContainText("25 / 25 b.");
  await expect(page.getByText("a) pokles s")).toBeVisible();
  await expect(page.getByText("A) SAS: zdražení dovozních vstupů")).toBeVisible();

  await page.getByRole("button", { name: "Zkusit znovu" }).click();
  await expect(page.getByText("25 bodů celkem")).toBeVisible();
});

test("mobile pages do not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    "/",
    "/vyklad/narodni-ucty",
    "/vyklad/model-vydaje",
    "/vyklad/penize",
    "/vyklad/ad-as",
    "/vyklad/cyklus",
    "/vzorce",
    "/grafy",
    "/grafy/keynesian-cross",
    "/test",
  ]) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
  }
});
