// HTML template constants for product detail page
// 상품 상세 페이지 HTML 템플릿 상수들
// File exceeds 80 lines due to large HTML template constants
// HTML 템플릿 상수로 인해 80줄 초과

import { CommonFooter } from '@/components/commons/Footer';

export const 상세페이지_로딩 = `
    <div class="min-h-screen bg-gray-50">
      <div class="product-detail-header" data-cart-count="0"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div id="detail-spinner-container"></div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    </div>
  `;

export const 상세페이지_로딩완료 = `
    <div class="min-h-screen bg-gray-50">
      <div class="product-detail-header" data-cart-count="1"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="생활/건강" data-category2="생활용품"></div>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1"></p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장</h1>
              <!-- 평점 및 리뷰 -->
              <div class="product-rating" data-product-id="85067212996" data-rating="4.0" data-review-count="749"></div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">220원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 107개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="product-quantity-actions" data-product-id="85067212996" data-price="220" data-max-quantity="107"></div>
        </div>
        <!-- 관련 상품 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="86940857379">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이</h3>
                <p class="text-sm font-bold text-blue-600">230원</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="82094468339">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg" alt="실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제</h3>
                <p class="text-sm font-bold text-blue-600">280원</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    </div>
  `;
