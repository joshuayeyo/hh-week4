import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('5. 장바구니', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬 스토리지 초기화
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('여러 상품 추가, 수량 조절, 선택 삭제 전체 시나리오', async ({
    page,
  }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 첫 번째 상품 추가
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');

    // 두 번째 상품 추가
    await helpers.addProductToCart('샷시 풍지판');

    // 장바구니 아이콘에 개수 표시 확인 (2개)
    await expect(page.locator('#cart-icon-btn span')).toHaveText('2');

    // 장바구니 모달 열기
    await helpers.openCartModal();

    // 두 상품이 모두 있는지 확인
    await expect(page.locator('.cart-modal')).toContainText(
      'PVC 투명 젤리 쇼핑백'
    );
    await expect(page.locator('.cart-modal')).toContainText('샷시 풍지판');

    // 첫 번째 상품 수량 증가
    await page.locator('.quantity-increase-btn').first().click();

    // 총 금액 업데이트 확인
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - text: /총 금액 670원/
    - button "전체 비우기"
    - button "구매하기"
    `);

    // 첫 번째 상품만 선택
    await page.locator('.cart-item-checkbox').first().check();

    // 선택 삭제
    await page.click('#cart-modal-remove-selected-btn');

    // 첫 번째 상품만 삭제되고 두 번째 상품은 남아있는지 확인
    await expect(page.locator('.cart-modal')).not.toContainText(
      'PVC 투명 젤리 쇼핑백'
    );
    await expect(page.locator('.cart-modal')).toContainText('샷시 풍지판');

    // 장바구니 아이콘 개수 업데이트 확인 (1개)
    await expect(page.locator('#cart-icon-btn span')).toHaveText('1');
  });

  test('전체 선택 후 장바구니 비우기', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 여러 상품 추가
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');
    await helpers.addProductToCart('고양이 난간 안전망');

    // 장바구니 모달 열기
    await helpers.openCartModal();

    // 전체 선택
    await page.check('#cart-modal-select-all-checkbox');

    // 모든 상품이 선택되었는지 확인
    const checkboxes = page.locator('.cart-item-checkbox');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).toBeChecked();
    }

    // 장바구니 비우기
    await page.click('#cart-modal-clear-cart-btn');

    // 장바구니가 비어있는지 확인
    await expect(page.locator('text=장바구니가 비어있습니다')).toBeVisible();

    // 장바구니 아이콘에서 개수 표시가 사라졌는지 확인
    await expect(page.locator('#cart-icon-btn span')).not.toBeVisible();
  });
});
