import { expect, test } from '@playwright/test';

import { E2EHelpers } from '../E2EHelpers.js';

// 테스트 설정
test.describe.configure({ mode: 'serial' });

test.describe('2. 검색 및 필터링 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test('검색어 입력 후 Enter 키로 검색할 수 있다.', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 검색어 입력
    await page.fill('#search-input', '젤리');
    await page.press('#search-input', 'Enter');

    // 검색 결과 확인
    await expect(page.locator('text=3개')).toBeVisible();

    // 검색어가 검색창에 유지되는지 확인
    await expect(page.locator('#search-input')).toHaveValue('젤리');

    // 검색어 입력
    await page.fill('#search-input', '아이패드');
    await page.press('#search-input', 'Enter');

    // 검색 결과 확인
    await expect(page.locator('text=21개')).toBeVisible();
  });

  test('카테고리 선택 후 브레드크럼가 업데이트된다.', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 1차 카테고리 선택
    await page.click('text=생활/건강');
    await expect(page.locator('text=300개')).toBeVisible();
    await expect(page.locator('text=카테고리:').locator('..')).toContainText(
      '생활/건강'
    );

    // 2차 카테고리 선택
    await page.click('text=자동차용품');
    await expect(page.locator('text=11개')).toBeVisible();
    await expect(page.locator('text=카테고리:').locator('..')).toContainText(
      '자동차용품'
    );

    // 검색어 입력
    await page.fill('#search-input', '차량용');
    await page.press('#search-input', 'Enter');
    await expect(page.locator('text=9개')).toBeVisible();

    // 1차 카테고리 브레드크럼 클릭
    await page.click('text=생활/건강');
    await expect(page.locator('text=12개')).toBeVisible();

    // 전체 브레드크럼 클릭
    await page.click('text=전체');
    await expect(
      page.locator('text=카테고리: 전체 생활/건강 디지털/가전')
    ).toBeVisible();

    await page.fill('#search-input', '');
    await page.press('#search-input', 'Enter');

    await expect(page).not.toHaveURL(/category/);
    await expect(page.locator('text=340개')).toBeVisible();
  });

  test('정렬 옵션을 변경할 수 있다.', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    // 가격 높은순으로 정렬
    await page.selectOption('#sort-select', 'price_desc');

    // 첫 번째 상품 이 가격 높은 순으로 정렬되었는지 확인
    await expect(page.locator('.product-card').first()).toMatchAriaSnapshot(`
    - img "ASUS ROG Flow Z13 GZ302EA-RU110W 64GB, 1TB"
    - heading "ASUS ROG Flow Z13 GZ302EA-RU110W 64GB, 1TB" [level=3]
    - paragraph: ASUS
    - paragraph: 3,749,000원
    - button "장바구니 담기"
      `);

    await page.selectOption('#sort-select', 'name_asc');
    await expect(page.locator('.product-card').nth(1)).toMatchAriaSnapshot(`
    - img "[매일출발]유로블루플러스 차량용 요소수 국내산 Adblue 호스포함"
    - heading "[매일출발]유로블루플러스 차량용 요소수 국내산 Adblue 호스포함" [level=3]
    - paragraph: 유로블루플러스
    - paragraph: 8,700원
    - button "장바구니 담기"
    `);

    await page.selectOption('#sort-select', 'name_desc');
    await expect(page.locator('.product-card').nth(1)).toMatchAriaSnapshot(`
    - img "P&G 다우니 울트라 섬유유연제 에이프릴 프레쉬, 5.03L, 1개"
    - heading "P&G 다우니 울트라 섬유유연제 에이프릴 프레쉬, 5.03L, 1개" [level=3]
    - paragraph: 다우니
    - paragraph: 16,610원
    - button "장바구니 담기"
      `);
  });

  test('페이지당 상품 수 변경이 가능하다', async ({ page }) => {
    const helpers = new E2EHelpers(page);
    await helpers.waitForPageLoad();

    const args = [
      [
        10,
        `- heading "탈부착 방충망 자석쫄대 방풍비닐 창문방충망 셀프시공 DIY 백색 100cm" [level=3]`,
      ],
      [
        20,
        `- heading "고양이 난간 안전망 복층 베란다 방묘창 방묘문 방충망 캣도어 일반형검정1mx1m" [level=3]`,
      ],
      [
        50,
        `- heading "강아지 고양이 아이스팩 파우치 여름 베개 젤리곰 M사이즈" [level=3]`,
      ],
      [
        100,
        `- heading "고양이 스크래쳐 숨숨집 하우스 대형 원목 스크레쳐 A type" [level=3]`,
      ],
    ];
    for (const [limit, lastExpected] of args) {
      await page.selectOption('#limit-select', limit.toString());
      await page.waitForFunction(
        (l) => document.querySelectorAll('.product-card').length === l,
        limit
      );
      await expect(page.locator('.product-card').last()).toMatchAriaSnapshot(
        lastExpected
      );
    }
  });
});
