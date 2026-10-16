import { expect, test, type Page } from '@playwright/test';

const selectLang = (page: Page, lang: string) =>
  page.selectOption('select[aria-label="Langue"]', lang);

/** Normalized scroll position from the inline-start edge (0 = start), direction-aware. */
const scrollerPos = (page: Page) =>
  page.locator('.scroller').evaluate((node) => {
    const el = node as HTMLElement;
    const rtl = getComputedStyle(el).direction === 'rtl';
    return rtl ? -el.scrollLeft : el.scrollLeft;
  });

/* ------------------------------------------------------------------ */
/* 1. No document-level horizontal overflow in any locale/viewport     */
/* ------------------------------------------------------------------ */
for (const lang of ['fr', 'en', 'ar'] as const) {
  test(`no horizontal overflow — ${lang}`, async ({ page }) => {
    await page.goto('/');
    await selectLang(page, lang);
    await page.waitForTimeout(500);

    const info = await page.evaluate(() => {
      const de = document.documentElement;
      return { dir: de.dir, clientWidth: de.clientWidth, scrollWidth: de.scrollWidth };
    });

    console.log(`[${lang}]`, JSON.stringify(info));
    expect(info.dir).toBe(lang === 'ar' ? 'rtl' : 'ltr');
    expect(info.scrollWidth, `document must not overflow horizontally (${lang})`).toBeLessThanOrEqual(info.clientWidth + 1);
  });
}

/* ------------------------------------------------------------------ */
/* 2. Mobile drawer: correct side per direction + closes on lang switch*/
/* ------------------------------------------------------------------ */
test('mobile drawer mirrors correctly and closes on language change', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile only');

  await page.goto('/');
  await selectLang(page, 'fr');
  await page.waitForTimeout(400);

  const drawer = page.locator('nav.nav-links');
  await page.locator('.menu-btn').click();
  await expect(drawer).toHaveClass(/open/);
  await page.waitForTimeout(600);

  const ltrBox = await drawer.boundingBox();
  expect(ltrBox, 'LTR drawer should be attached to the left edge').not.toBeNull();
  expect(ltrBox!.x).toBeLessThanOrEqual(2);

  // switching language must close the drawer
  await selectLang(page, 'ar');
  await page.waitForTimeout(500);
  await expect(drawer).not.toHaveClass(/open/);

  // reopen in RTL: drawer must be attached to the right edge
  await page.locator('.menu-btn').click();
  await expect(drawer).toHaveClass(/open/);
  await page.waitForTimeout(600);

  const vw = page.viewportSize()!.width;
  const rtlBox = await drawer.boundingBox();
  expect(rtlBox, 'RTL drawer should be attached to the right edge').not.toBeNull();
  expect(rtlBox!.x + rtlBox!.width).toBeGreaterThanOrEqual(vw - 2);

  // and still no overflow while open
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
  );
  expect(overflow).toBe(true);
});

/* ------------------------------------------------------------------ */
/* 3. Product scroller direction in RTL                                */
/* ------------------------------------------------------------------ */
test('RTL product scroller: next/previous move in the right direction', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop only');

  await page.goto('/');
  await selectLang(page, 'ar');
  await page.waitForTimeout(500);

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

  const prevBtn = page.locator('.scroller-nav .round-btn').first();
  const nextBtn = page.locator('.scroller-nav .round-btn').nth(1);

  // at the inline-start, "previous" is disabled
  await expect(prevBtn).toBeDisabled();

  const start = await scrollerPos(page);
  await nextBtn.click();
  await page.waitForTimeout(900);
  const afterNext = await scrollerPos(page);
  expect(afterNext, 'next should advance toward the end (inline-end)').toBeGreaterThan(start);

  await prevBtn.click();
  await page.waitForTimeout(900);
  const afterPrev = await scrollerPos(page);
  expect(afterPrev, 'previous should return toward the start').toBeLessThan(afterNext);
});
