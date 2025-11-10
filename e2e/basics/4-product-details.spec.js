import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('4. 상품 상세 페이지', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬 스토리지 초기화
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('상품 클릭부터 관련 상품 이동까지 전체 플로우', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();
    await page.evaluate(() => {
      window.loadFlag = true;
    });

    // 상품 이미지 클릭하여 상세 페이지로 이동
    const productCard = page
      .locator('text=PVC 투명 젤리 쇼핑백')
      .locator('xpath=ancestor::*[contains(@class, "product-card")]');
    await productCard.locator('img').click();

    // 상세 페이지 로딩 확인
    await expect(page.locator('text=상품 상세')).toBeVisible();

    // h1 태그에 상품명 확인
    await expect(
      page.locator(
        'h1:text("PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장")'
      )
    ).toBeVisible();

    // 수량 조절 후 장바구니 담기
    await page.click('#quantity-increase');
    await expect(page.locator('#quantity-input')).toHaveValue('2');

    await page.click('#add-to-cart-btn');
    await expect(page.locator('text=장바구니에 추가되었습니다')).toBeVisible();

    // 관련 상품 섹션 확인
    await expect(page.locator('text=관련 상품')).toBeVisible();

    const relatedProducts = page.locator('.related-product-card');
    await expect(relatedProducts.first()).toBeVisible();

    // 첫 번째 관련 상품 클릭
    await relatedProducts.first().click();

    // 다른 상품의 상세 페이지로 이동했는지 확인
    await expect(
      page.locator(
        'h1:text("샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이")'
      )
    ).toBeVisible();

    await expect(await page.evaluate(() => window.loadFlag)).toBe(true);
  });
});
