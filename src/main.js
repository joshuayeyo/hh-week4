import { Toast } from './components/commons/Toast/index.js';
import { mountCartIcon } from './hooks/components/commons/mountCartIcon.js';
import { mountDetailSpinner } from './hooks/components/commons/mountDetailSpinner.js';
import { mountFilterBar } from './hooks/components/commons/mountFilterBar.js';
import { mountProductGrid } from './hooks/components/commons/mountProductGrid.js';
import { mountSpinner } from './hooks/components/commons/mountSpinner.js';
import { enableMocking } from './utils/enable-mocking.js';

import {
  장바구니_비어있음,
  장바구니_선택없음,
  장바구니_선택있음,
} from './constants/templates/cart-templates.js';
import { _404_ } from './constants/templates/common-templates.js';
import {
  상세페이지_로딩,
  상세페이지_로딩완료,
} from './constants/templates/product-detail-templates.js';
import {
  상품목록_레이아웃_로딩,
  상품목록_레이아웃_로딩완료,
  상품목록_레이아웃_카테고리_1Depth,
  상품목록_레이아웃_카테고리_2Depth,
  mountSearchBar,
} from './constants/templates/product-list-template.js';

function main() {
  document.body.innerHTML = `
    ${상품목록_레이아웃_로딩}
    <br />
    ${상품목록_레이아웃_로딩완료}
    <br />
    ${상품목록_레이아웃_카테고리_1Depth}
    <br />
    ${상품목록_레이아웃_카테고리_2Depth}
    <br />
    <div id="toast-demo" style="margin-bottom: 20px; justify-content: center; display: flex; flex-direction: column; align-items: center; gap: 16px;">
      <h1>동적 Toast 컴포넌트 테스트</h1>
      <button id="success-btn">성공 토스트</button>
      <button id="error-btn">에러 토스트</button>
      <button id="info-btn">정보 토스트</button>
    </div>
    <br />
    ${장바구니_비어있음}
    <br />
    ${장바구니_선택없음}
    <br />
    ${장바구니_선택있음}
    <br />
    ${상세페이지_로딩}
    <br />
    ${상세페이지_로딩완료}
    <br />
    ${_404_}
  `;

  document.getElementById('success-btn').addEventListener('click', () => {
    const toast = new Toast('success', '성공적으로 처리되었습니다!');
    toast.show();
  });

  document.getElementById('error-btn').addEventListener('click', () => {
    const toast = new Toast('error', '오류가 발생했습니다.');
    toast.show();
  });

  document.getElementById('info-btn').addEventListener('click', () => {
    const toast = new Toast('info', '알림 메시지입니다.');
    toast.show();
  });

  // 컴포넌트 마운트 (즉시 실행)
  mountSearchBar();
  mountSpinner();
  mountDetailSpinner();

  // CartIcon 마운트 (다양한 상태)
  mountCartIcon('cart-icon-container', { count: 0 }); // 로딩 상태 (0개)
  mountCartIcon('cart-icon-container-loaded', { count: 4 }); // 로딩완료 상태 (4개)
  mountCartIcon('cart-icon-detail-loading', { count: 0 }); // 상세페이지 로딩 (0개)
  mountCartIcon('cart-icon-detail-loaded', { count: 1 }); // 상세페이지 로딩완료 (1개)

  // ProductGrid 마운트
  // 로딩 상태 그리드 (스켈레톤)
  const loadingGrid = mountProductGrid('products-grid-loading');
  loadingGrid.renderSkeleton(4);

  // 로딩완료 상태 그리드 (실제 상품 데이터)
  const sampleProducts = [
    {
      id: '85067212996',
      image:
        'https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg',
      title:
        'PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장',
      brand: '',
      price: 220,
    },
    {
      id: '86940857379',
      image:
        'https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg',
      title:
        '샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이',
      brand: '이지웨이건축자재',
      price: 230,
    },
  ];
  const loadedGrid = mountProductGrid('products-grid-loaded');
  loadedGrid.render(sampleProducts);

  // FilterBar 마운트 (모든 .filter-bar 요소에)
  document.querySelectorAll('.filter-bar').forEach((container, index) => {
    const containerId = `filter-bar-${index}`;
    container.id = containerId;

    mountFilterBar(containerId, {
      itemsPerPageOptions: {
        defaultValue: 20,
        options: [10, 20, 50, 100],
      },
      sortOptions: {
        defaultValue: 'price_asc',
      },
      layout: 'horizontal',
    });
  });
}

if (import.meta.env.MODE !== 'test') {
  enableMocking().then(main);
} else {
  main();
}
