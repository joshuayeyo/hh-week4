import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('1. 애플리케이션 초기화 및 기본 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬 스토리지 초기화
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('페이지 접속 시 로딩 상태가 표시되고 상품 목록이 정상적으로 로드된다', async ({
    page,
  }) => {
    const helpers = new E2EHelpers(page);

    // 로딩 상태 확인
    await expect(page.locator('text=카테고리 로딩 중...')).toBeVisible();

    // 상품 목록 로드 완료 대기
    await helpers.waitForPageLoad();

    // 상품 개수 확인 (340개)
    await expect(page.locator('text=340개')).toBeVisible();

    // 기본 UI 요소들 존재 확인
    await expect(page.locator('#search-input')).toBeVisible();
    await expect(page.locator('#cart-icon-btn')).toBeVisible();
    await expect(page.locator('#limit-select')).toBeVisible();
    await expect(page.locator('#sort-select')).toBeVisible();
  });

  test('상품 카드에 기본 정보가 올바르게 표시된다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 첫 번째 상품 카드 확인
    const firstProductCard = page.locator('.product-card').first();

    // 상품 이미지 존재 확인
    await expect(firstProductCard.locator('img')).toBeVisible();

    // 상품명 확인
    await expect(firstProductCard).toContainText(
      /pvc 투명 젤리 쇼핑백|고양이 난간 안전망/i
    );

    // 가격 정보 확인 (숫자 + 원)
    await expect(firstProductCard).toContainText(/\d{1,3}(,\d{3})*원/);

    // 장바구니 버튼 확인
    await expect(firstProductCard.locator('.add-to-cart-btn')).toBeVisible();
  });
});
