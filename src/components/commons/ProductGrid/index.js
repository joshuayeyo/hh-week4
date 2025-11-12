// ProductGrid component for displaying product cards
// 상품 그리드 컴포넌트

import { ProductCard } from '@/components/commons/ProductCard';

export class ProductGrid {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.options = {
      columns: 2,
      gap: 4,
      ...options,
    };
    this.gridElement = null;
  }

  render(products = []) {
    if (!this.container) return null;

    this.setupGrid();

    // 기존 내용 초기화
    this.gridElement.innerHTML = '';

    // 상품 카드 렌더링
    products.forEach((product) => {
      const productCard = new ProductCard({
        isLoading: false,
        product,
        showAddButton: true,
      });
      this.gridElement.appendChild(productCard.render());
    });

    this.bindEvents();
    return this.gridElement;
  }

  renderSkeleton(skeletonCount = 4) {
    if (!this.container) return null;

    this.setupGrid();
    this.gridElement.innerHTML = '';

    // 스켈레톤 카드 렌더링
    for (let i = 0; i < skeletonCount; i++) {
      const skeletonCard = new ProductCard({ isLoading: true });
      this.gridElement.appendChild(skeletonCard.render());
    }

    return this.gridElement;
  }

  renderEmpty(message = '상품이 없습니다') {
    if (!this.container) return null;

    this.setupGrid();
    this.gridElement.innerHTML = `
      <div class="col-span-full text-center py-8">
        <div class="text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11L4 7"></path>
          </svg>
          <p class="text-lg font-medium text-gray-900 mb-2">${message}</p>
          <p class="text-sm text-gray-500">조건을 다시 설정해보세요.</p>
        </div>
      </div>
    `;

    return this.gridElement;
  }

  setupGrid() {
    if (this.gridElement) return;

    this.gridElement = document.createElement('div');
    this.gridElement.className = this.getGridClasses();
    this.container.appendChild(this.gridElement);
  }

  getGridClasses() {
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };

    const gapClass = `gap-${this.options.gap}`;
    const columnClass = columnClasses[this.options.columns] || 'grid-cols-2';

    return `grid ${columnClass} ${gapClass} mb-6`;
  }

  bindEvents() {
    if (!this.gridElement) return;

    this.gridElement.addEventListener('product-click', (e) => {
      this.onProductClick(e.detail.product);
    });

    this.gridElement.addEventListener('add-to-cart', (e) => {
      this.onAddToCart(e.detail.product);
    });
  }

  onProductClick(product) {
    const event = new CustomEvent('grid-product-click', {
      detail: { product },
      bubbles: true,
    });
    this.container.dispatchEvent(event);
  }

  onAddToCart(product) {
    const event = new CustomEvent('grid-add-to-cart', {
      detail: { product },
      bubbles: true,
    });
    this.container.dispatchEvent(event);
  }

  clear() {
    if (this.gridElement) {
      this.gridElement.innerHTML = '';
    }
  }

  destroy() {
    if (this.gridElement) {
      this.gridElement.remove();
      this.gridElement = null;
    }
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    if (this.gridElement) {
      this.gridElement.className = this.getGridClasses();
    }
  }
}
