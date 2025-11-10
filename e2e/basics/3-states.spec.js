import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('3. 상태 유지 및 복원', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('장바구니 내용이 localStorage에 저장되고 복원된다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 상품을 장바구니에 추가
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');

    // 장바구니 아이콘에 개수 표시 확인
    await expect(page.locator('#cart-icon-btn span')).toBeVisible();

    // localStorage에 저장되었는지 확인
    const cartData = await page.evaluate(() =>
      localStorage.getItem('shopping_cart')
    );
    expect(cartData).toBeTruthy();

    // 페이지 새로고침
    await page.reload();
    await helpers.waitForPageLoad();

    // 장바구니 아이콘에 여전히 개수가 표시되는지 확인
    await expect(page.locator('#cart-icon-btn span')).toBeVisible();
  });

  test('장바구니 아이콘에 상품 개수가 정확히 표시된다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 초기에는 개수 표시가 없어야 함
    await expect(page.locator('#cart-icon-btn span')).not.toBeVisible();

    // 첫 번째 상품 추가
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');
    await expect(page.locator('#cart-icon-btn span')).toHaveText('1');

    // 두 번째 상품 추가
    await helpers.addProductToCart('샷시 풍지판');
    await expect(page.locator('#cart-icon-btn span')).toHaveText('2');

    // 첫 번째 상품 한 번 더 추가
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');
    await expect(page.locator('#cart-icon-btn span')).toHaveText('2');
  });
});
