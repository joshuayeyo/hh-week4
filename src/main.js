import { Toast } from './components/commons/Toast/index.js';
import { mountCategoryFilter } from './hooks/components/commons/mountCategoryFilter.js';
import { mountDetailSpinner } from './hooks/components/commons/mountDetailSpinner.js';
import { mountFilterBar } from './hooks/components/commons/mountFilterBar.js';
import { mountHeader } from './hooks/components/commons/mountHeader.js';
import { mountProductGrid } from './hooks/components/commons/mountProductGrid.js';
import { mountSearchBar } from './hooks/components/commons/mountSearchBar.js';
import { mountSpinner } from './hooks/components/commons/mountSpinner.js';
import { mountProductDetail } from './hooks/components/features/mountProductDetail.js';
import { mountProductDetailBreadcrumb } from './hooks/components/features/mountProductDetailBreadcrumb.js';
import { mountProductDetailHeader } from './hooks/components/features/mountProductDetailHeader.js';
import { mountProductQuantityActions } from './hooks/components/features/mountProductQuantityActions.js';
import { mountProductRating } from './hooks/components/features/mountProductRating.js';
import { mountRelatedProducts } from './hooks/components/features/mountRelatedProducts.js';
import { mountNotFound } from './hooks/pages/mountNotFound.js';
import { mountProductDetailPage } from './hooks/pages/mountProductDetailPage.js';
import { mountProductListPage } from './hooks/pages/mountProductListPage.js';
import { enableMocking } from './utils/enable-mocking.js';

import {
  장바구니_비어있음,
  장바구니_선택없음,
  장바구니_선택있음,
} from './constants/templates/cart-templates.js';

function main() {
  document.body.innerHTML = `
    <div id="product-list-loading-container"></div>
    <br />
    <div id="product-list-loaded-container"></div>
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
    <div id="product-detail-loading-container"></div>
    <br />
    <div id="product-detail-loaded-container"></div>
    <br />
    <div id="notfound-container"></div>
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

  // CategoryFilter 마운트 (모든 .category-filter 요소에)
  document.querySelectorAll('.category-filter').forEach((container, index) => {
    const containerId = `category-filter-${index}`;
    container.id = containerId;

    const state = container.getAttribute('data-state');
    const category1 = container.getAttribute('data-category1');
    const category2 = container.getAttribute('data-category2');

    const options = {
      categories: {
        '생활/건강': ['생활용품', '주방용품', '문구/사무용품'],
        '디지털/가전': ['스마트폰', '노트북', '가전제품'],
      },
      showBreadcrumb: true,
    };

    // 상태에 따른 초기 선택값 설정
    if (state === 'loading') {
      options.categories = {}; // 로딩 상태
    } else if (state === 'category1-selected') {
      options.selectedCategory1 = category1;
    } else if (state === 'category2-selected') {
      options.selectedCategory1 = category1;
      options.selectedCategory2 = category2;
    }

    mountCategoryFilter(containerId, options);
  });

  // Header 마운트 (모든 .header 요소에)
  document.querySelectorAll('.header').forEach((container, index) => {
    const containerId = `header-${index}`;
    container.id = containerId;

    const cartCount = parseInt(container.getAttribute('data-cart-count')) || 0;

    const options = {
      title: '쇼핑몰',
      homeLink: true,
      cartIconOptions: {
        count: cartCount,
      },
    };

    mountHeader(containerId, options);
  });

  // ProductDetailHeader 마운트 (모든 .product-detail-header 요소에)
  document
    .querySelectorAll('.product-detail-header')
    .forEach((container, index) => {
      const containerId = `product-detail-header-${index}`;
      container.id = containerId;

      const cartCount =
        parseInt(container.getAttribute('data-cart-count')) || 0;

      const options = {
        title: '상품 상세',
        cartIconOptions: {
          count: cartCount,
        },
      };

      mountProductDetailHeader(containerId, options);
    });

  // ProductDetailBreadcrumb 마운트 (모든 .product-detail-breadcrumb 요소에)
  document
    .querySelectorAll('.product-detail-breadcrumb')
    .forEach((container, index) => {
      const containerId = `product-detail-breadcrumb-${index}`;
      container.id = containerId;

      const category1 = container.getAttribute('data-category1');
      const category2 = container.getAttribute('data-category2');

      const options = {
        category1,
        category2,
        showProductName: false, // 기본적으로 상품명은 표시하지 않음
      };

      mountProductDetailBreadcrumb(containerId, options);
    });

  // ProductQuantityActions 마운트 (모든 .product-quantity-actions 요소에)
  document
    .querySelectorAll('.product-quantity-actions')
    .forEach((container, index) => {
      const containerId = `product-quantity-actions-${index}`;
      container.id = containerId;

      const productId = container.getAttribute('data-product-id');
      const price = parseInt(container.getAttribute('data-price')) || 0;
      const maxQuantity =
        parseInt(container.getAttribute('data-max-quantity')) || 999;

      const options = {
        productId,
        quantity: 1,
        maxQuantity,
        price,
        cartButtonText: '장바구니 담기',
        showBackToListButton: true,
      };

      mountProductQuantityActions(containerId, options);
    });

  // ProductRating 마운트 (모든 .product-rating 요소에)
  document.querySelectorAll('.product-rating').forEach((container, index) => {
    const containerId = `product-rating-${index}`;
    container.id = containerId;

    const productId = container.getAttribute('data-product-id');
    const rating = parseFloat(container.getAttribute('data-rating')) || 0;
    const reviewCount =
      parseInt(container.getAttribute('data-review-count')) || 0;
    const size = container.getAttribute('data-size') || 'medium';

    const options = {
      productId,
      rating,
      reviewCount,
      size,
      showClickableReviews: true,
    };

    mountProductRating(containerId, options);
  });

  // ProductDetail 마운트 (모든 .product-detail 요소에)
  document.querySelectorAll('.product-detail').forEach((container, index) => {
    const containerId = `product-detail-${index}`;
    container.id = containerId;

    const isLoading = container.getAttribute('data-loading') === 'true';

    // 샘플 상품 데이터
    const sampleProductData = {
      id: '85067212996',
      title:
        'PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장',
      price: 220,
      image:
        'https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg',
      category: '생활/건강',
      rating: 4.0,
      reviewCount: 749,
      stock: 107,
      description:
        'PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.',
    };

    const options = {
      isLoading,
      product: isLoading ? null : sampleProductData,
    };

    mountProductDetail(containerId, options);
  });

  // RelatedProducts 마운트 (모든 .related-products 요소에)
  document.querySelectorAll('.related-products').forEach((container, index) => {
    const containerId = `related-products-${index}`;
    container.id = containerId;

    const title = container.getAttribute('data-title') || '관련 상품';
    const subtitle =
      container.getAttribute('data-subtitle') || '같은 카테고리의 다른 상품들';
    const columns = parseInt(container.getAttribute('data-columns')) || 2;

    // 샘플 관련 상품 데이터
    const sampleRelatedProducts = [
      {
        id: '86940857379',
        title:
          '샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이',
        price: 230,
        image:
          'https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg',
      },
      {
        id: '82094468339',
        title: '실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제',
        price: 280,
        image:
          'https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg',
      },
    ];

    const options = {
      title,
      subtitle,
      columns,
      products: sampleRelatedProducts,
      isLoading: false, // 로딩 완료 상태
    };

    mountRelatedProducts(containerId, options);
  });

  // ProductDetailPage 마운트 (로딩 상태)
  mountProductDetailPage('product-detail-loading-container', {
    isLoading: true,
    cartCount: 0,
  });

  // ProductDetailPage 마운트 (로딩 완료 상태)
  mountProductDetailPage('product-detail-loaded-container', {
    isLoading: false,
    cartCount: 1,
    category1: '생활/건강',
    category2: '생활용품',
    productId: '85067212996',
  });

  // ProductListPage 마운트 (로딩 상태)
  mountProductListPage('product-list-loading-container', {
    isLoading: true,
    cartCount: 0,
  });

  // ProductListPage 마운트 (로딩 완료 상태)
  mountProductListPage('product-list-loaded-container', {
    isLoading: false,
    cartCount: 4,
    categoryState: 'loaded',
    totalProducts: 340,
  });

  // NotFound 페이지 마운트
  mountNotFound('notfound-container');
}

if (import.meta.env.MODE !== 'test') {
  enableMocking().then(main);
} else {
  main();
}
