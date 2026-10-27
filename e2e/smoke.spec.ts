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

test("subject hub opens the macro subject and its explanation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Uč se/ })).toBeVisible();
  await expect(page.getByText("Připravujeme")).toBeVisible();

  await page.getByRole("link", { name: /Makro 204/ }).first().click();
  await expect(page).toHaveURL(/\/makro-204$/);
  await expect(page.getByRole("heading", { name: /Výpisky/ })).toBeVisible();

  await page.getByRole("link", { name: "Začít výkladem" }).click();
  await expect(page).toHaveURL(/\/makro-204\/vyklad$/);

  await page.getByRole("link", { name: /Model produkt–výdaje/ }).first().click();
  await expect(page).toHaveURL(/\/makro-204\/vyklad\/model-vydaje$/);
  await expect(
    page.getByRole("heading", { name: /Model produkt–výdaje/ }),
  ).toBeVisible();
  await expect(page.locator("#consumption-savings")).toBeVisible();
  await expect(page.locator("#keynesian-cross")).toBeVisible();
  expect(await page.locator(".formula-card").count()).toBeGreaterThan(10);
});

test("formula and graph pages render rich content", async ({ page }) => {
  await page.goto("/makro-204/vzorce");
  await expect(page.getByRole("heading", { name: "Vzorce" })).toBeVisible();
  expect(await page.locator(".formula-card").count()).toBeGreaterThan(25);
  expect(await page.locator(".katex").count()).toBeGreaterThan(20);

  await page.goto("/makro-204/grafy");
  await expect(page.getByRole("heading", { name: "Grafy" })).toBeVisible();
  await page.getByRole("link", { name: /Keynesiánský kříž/ }).click();
  await expect(page).toHaveURL(/\/makro-204\/grafy\/keynesian-cross$/);
  await expect(page.locator("#keynesian-cross")).toBeVisible();
  expect(await page.locator("#keynesian-cross svg").count()).toBeGreaterThan(0);
  await expect(page.getByText("Na co si dát pozor")).toBeVisible();
});

test("interactive test can be filled and scored", async ({ page }) => {
  await page.goto("/makro-204/test");
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

test("old URLs redirect to the macro subject", async ({ page }) => {
  await page.goto("/vyklad/model-vydaje");
  await expect(page).toHaveURL(/\/makro-204\/vyklad\/model-vydaje$/);

  await page.goto("/vzorce");
  await expect(page).toHaveURL(/\/makro-204\/vzorce$/);

  await page.goto("/grafy/keynesian-cross");
  await expect(page).toHaveURL(/\/makro-204\/grafy\/keynesian-cross$/);

  await page.goto("/test");
  await expect(page).toHaveURL(/\/makro-204\/test$/);
});

test("mobile pages do not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    "/",
    "/makro-204",
    "/makro-204/vyklad/narodni-ucty",
    "/makro-204/vyklad/model-vydaje",
    "/makro-204/vyklad/penize",
    "/makro-204/vyklad/ad-as",
    "/makro-204/vyklad/cyklus",
    "/makro-204/vzorce",
    "/makro-204/grafy",
    "/makro-204/grafy/keynesian-cross",
    "/makro-204/test",
  ]) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
  }
});
