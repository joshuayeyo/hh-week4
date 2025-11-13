// ProductDetail page component for product detail page layout
// 상품 상세 페이지 레이아웃을 위한 ProductDetailPage 컴포넌트

import { CommonFooter } from '@/components/commons/Footer';

export class ProductDetailPage {
  constructor(options = {}) {
    this.isLoading = options.isLoading || false;
    this.cartCount = options.cartCount || 0;
    this.category1 = options.category1 || '';
    this.category2 = options.category2 || '';
    this.productId = options.productId || '';
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'min-h-screen bg-gray-50';

    if (this.isLoading) {
      this.renderLoading();
    } else {
      this.renderLoaded();
    }

    return this.containerElement;
  }

  renderLoading() {
    this.containerElement.innerHTML = `
      <div class="product-detail-header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="" data-category2=""></div>
        <!-- 상품 상세 정보 (로딩 상태) -->
        <div class="product-detail" data-loading="true"></div>
      </main>
      ${CommonFooter()}
    `;
  }

  renderLoaded() {
    this.containerElement.innerHTML = `
      <div class="product-detail-header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="${this.category1}" data-category2="${this.category2}"></div>
        <!-- 상품 상세 정보 -->
        <div class="product-detail" data-product-id="${this.productId}"></div>
        <!-- 수량 선택 및 액션 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <div class="product-quantity-actions" data-product-id="${this.productId}" data-price="220" data-max-quantity="107"></div>
        </div>
        <!-- 관련 상품 -->
        <div class="related-products" data-title="관련 상품" data-subtitle="같은 카테고리의 다른 상품들" data-columns="2"></div>
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

  setCategory(category1, category2) {
    this.category1 = category1;
    this.category2 = category2;
    this.updateBreadcrumb();
  }

  setProductId(productId) {
    this.productId = productId;
    this.updateProductId();
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
    const header = this.containerElement?.querySelector(
      '.product-detail-header'
    );
    if (header) {
      header.setAttribute('data-cart-count', this.cartCount);
    }
  }

  updateBreadcrumb() {
    const breadcrumb = this.containerElement?.querySelector(
      '.product-detail-breadcrumb'
    );
    if (breadcrumb) {
      breadcrumb.setAttribute('data-category1', this.category1);
      breadcrumb.setAttribute('data-category2', this.category2);
    }
  }

  updateProductId() {
    const productDetail =
      this.containerElement?.querySelector('.product-detail');
    const quantityActions = this.containerElement?.querySelector(
      '.product-quantity-actions'
    );

    if (productDetail) {
      productDetail.setAttribute('data-product-id', this.productId);
    }
    if (quantityActions) {
      quantityActions.setAttribute('data-product-id', this.productId);
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
