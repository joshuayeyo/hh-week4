// ProductList page component for product list page layout
// 상품 목록 페이지 레이아웃을 위한 ProductListPage 컴포넌트
// File exceeds 80 lines due to inline HTML template for page structure
// 페이지 구조를 위한 인라인 HTML 템플릿으로 인해 80줄 초과

import { CommonFooter } from '@/components/commons/Footer';

export class ProductListPage {
  constructor(options = {}) {
    this.isLoading = options.isLoading || false;
    this.cartCount = options.cartCount || 0;
    this.categoryState = options.categoryState || 'loading'; // 'loading', 'loaded'
    this.totalProducts = options.totalProducts || 0;
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('div');

    if (this.isLoading) {
      this.renderLoading();
    } else {
      this.renderLoaded();
    }

    return this.containerElement;
  }

  renderLoading() {
    this.containerElement.className = 'min-h-screen bg-gray-50';
    this.containerElement.innerHTML = `
      <div class="header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="loading"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loading"></div>

            <div class="text-center py-4">
              <div id="spinner-container"></div>
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    `;
  }

  renderLoaded() {
    this.containerElement.className = 'bg-gray-50';
    this.containerElement.innerHTML = `
      <div class="header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="${this.categoryState}"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 개수 정보 -->
            <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">${this.totalProducts}개</span>의 상품
            </div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loaded"></div>

            <div class="text-center py-4 text-sm text-gray-500">
              모든 상품을 확인했습니다
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    `;
  }

  // 상태 업데이트 메서드
  setLoading(loading) {
    this.isLoading = loading;
    this.updateContent();
  }

  setCartCount(count) {
    this.cartCount = count;
    this.updateHeaderCartCount();
  }

  setCategoryState(state) {
    this.categoryState = state;
    this.updateCategoryFilter();
  }

  setTotalProducts(count) {
    this.totalProducts = count;
    this.updateProductCount();
  }

  updateContent() {
    if (!this.containerElement) return;

    if (this.isLoading) {
      this.renderLoading();
    } else {
      this.renderLoaded();
    }
  }

  updateHeaderCartCount() {
    const header = this.containerElement?.querySelector('.header');
    if (header) {
      header.setAttribute('data-cart-count', this.cartCount);
    }
  }

  updateCategoryFilter() {
    const categoryFilter =
      this.containerElement?.querySelector('.category-filter');
    if (categoryFilter) {
      categoryFilter.setAttribute('data-state', this.categoryState);
    }
  }

  updateProductCount() {
    const productCountElement = this.containerElement?.querySelector(
      '.font-medium.text-gray-900'
    );
    if (productCountElement) {
      productCountElement.textContent = `${this.totalProducts}개`;
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.containerElement) {
      this.containerElement.remove();
    }
  }
}
