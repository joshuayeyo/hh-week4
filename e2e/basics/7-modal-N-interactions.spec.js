import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('7. 모달 및 UI 인터랙션', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('장바구니 모달이 다양한 방법으로 열리고 닫힌다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 모달 열기
    await page.click('#cart-icon-btn');
    await expect(page.locator('.cart-modal-overlay')).toBeVisible();

    // ESC 키로 닫기
    await page.keyboard.press('Escape');
    await expect(page.locator('.cart-modal-overlay')).not.toBeVisible();

    // 다시 열기
    await page.click('#cart-icon-btn');
    await expect(page.locator('.cart-modal-overlay')).toBeVisible();

    // X 버튼으로 닫기
    await page.click('#cart-modal-close-btn');
    await expect(page.locator('.cart-modal-overlay')).not.toBeVisible();

    // 다시 열기
    await page.click('#cart-icon-btn');
    await expect(page.locator('.cart-modal-overlay')).toBeVisible();

    // 배경 클릭으로 닫기 (모달 내용이 아닌 오버레이 영역 클릭)
    await page
      .locator('.cart-modal-overlay')
      .click({ position: { x: 10, y: 10 } });
    await expect(page.locator('.cart-modal-overlay')).not.toBeVisible();
  });

  test('토스트 메시지 시스템이 올바르게 작동한다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 상품을 장바구니에 추가하여 토스트 메시지 트리거
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');

    // 토스트 메시지 표시 확인
    let toast = page.locator('text=장바구니에 추가되었습니다');
    await expect(toast).toBeVisible();

    // 닫기 버튼을 클릭하여 닫기 테스트
    await page.locator('#toast-close-btn').click();
    await expect(toast).not.toBeVisible();

    // 상품을 장바구니에 추가하여 토스트 메시지 트리거
    await helpers.addProductToCart('PVC 투명 젤리 쇼핑백');

    // 토스트 메시지 표시 확인
    toast = page.locator('text=장바구니에 추가되었습니다');
    await expect(toast).toBeVisible();

    // 자동으로 닫히는지 테스트
    await expect(toast).not.toBeVisible({ timeout: 4000 });
  });
});
