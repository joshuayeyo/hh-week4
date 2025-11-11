// ProductCard component for product display with loading states
// 상품 카드 컴포넌트 (로딩 상태 지원)

import {
  SKELETON_TEMPLATE,
  EMPTY_TEMPLATE,
  getProductTemplate,
} from './templates.js';

export class ProductCard {
  constructor(options = {}) {
    this.isLoading = options.isLoading || false;
    this.product = options.product || null;
    this.size = options.size || 'normal'; // 'normal', 'small'
    this.showAddButton = options.showAddButton !== false;
    this.cardElement = null;
  }

  render() {
    this.cardElement = document.createElement('div');
    this.cardElement.className = this.getCardClasses();

    if (this.isLoading) {
      this.renderSkeleton();
    } else if (this.product) {
      this.renderProduct();
    } else {
      this.renderEmpty();
    }

    this.bindEvents();
    return this.cardElement;
  }

  getCardClasses() {
    const baseClasses =
      'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden';
    const loadingClass = this.isLoading ? 'animate-pulse' : '';
    const productClass = !this.isLoading && this.product ? 'product-card' : '';

    return `${baseClasses} ${loadingClass} ${productClass}`.trim();
  }

  renderSkeleton() {
    this.cardElement.innerHTML = SKELETON_TEMPLATE;
  }

  renderProduct() {
    this.cardElement.setAttribute('data-product-id', this.product.id);
    this.cardElement.innerHTML = getProductTemplate(
      this.product,
      this.showAddButton
    );
  }

  renderEmpty() {
    this.cardElement.innerHTML = EMPTY_TEMPLATE;
  }

  bindEvents() {
    if (this.isLoading || !this.product) return;

    const productImage = this.cardElement.querySelector('.product-image');
    const productInfo = this.cardElement.querySelector('.product-info');

    [productImage, productInfo].forEach((element) => {
      if (element) {
        element.addEventListener('click', () => {
          this.onProductClick();
        });
      }
    });

    // 장바구니 버튼 클릭 이벤트
    const addButton = this.cardElement.querySelector('.add-to-cart-btn');
    if (addButton) {
      addButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onAddToCart();
      });
    }
  }

  onProductClick() {
    const event = new CustomEvent('product-click', {
      detail: { product: this.product },
      bubbles: true,
    });
    this.cardElement.dispatchEvent(event);
  }

  onAddToCart() {
    const event = new CustomEvent('add-to-cart', {
      detail: { product: this.product },
      bubbles: true,
    });
    this.cardElement.dispatchEvent(event);
  }

  // 로딩 상태 전환
  setLoading(loading) {
    this.isLoading = loading;
    this.cardElement.className = this.getCardClasses();

    if (loading) {
      this.renderSkeleton();
    } else if (this.product) {
      this.renderProduct();
    } else {
      this.renderEmpty();
    }

    if (!loading) {
      this.bindEvents();
    }
  }

  // 상품 데이터 업데이트
  updateProduct(product) {
    this.product = product;
    if (!this.isLoading) {
      this.renderProduct();
      this.bindEvents();
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.cardElement) {
      this.cardElement.remove();
    }
  }
}
