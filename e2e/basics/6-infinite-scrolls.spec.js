import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('6. 무한 스크롤 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('페이지 하단 스크롤 시 추가 상품이 로드된다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 초기 상품 카드 수 확인
    const initialCards = await page.locator('.product-card').count();
    expect(initialCards).toBe(20);

    // 페이지 하단으로 스크롤
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // 로딩 인디케이터 확인
    await expect(page.locator('text=상품을 불러오는 중...')).toBeVisible();

    // 추가 상품 로드 대기
    await page.waitForFunction(
      () => {
        return document.querySelectorAll('.product-card').length > 20;
      },
      { timeout: 5000 }
    );

    // 상품 수가 증가했는지 확인
    const updatedCards = await page.locator('.product-card').count();
    expect(updatedCards).toBeGreaterThan(initialCards);
  });
});
