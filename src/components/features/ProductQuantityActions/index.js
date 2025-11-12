// ProductQuantityActions component for product quantity selection and cart actions
// 상품 수량 선택 및 장바구니 액션 컴포넌트

import { QuantitySelector } from '@/components/commons/QuantitySelector';

export class ProductQuantityActions {
  constructor(options = {}) {
    this.productId = options.productId || null;
    this.quantity = options.quantity || 1;
    this.maxQuantity = options.maxQuantity || 107;
    this.price = options.price || 0;
    this.cartButtonText = options.cartButtonText || '장바구니 담기';
    this.showBackToListButton = options.showBackToListButton !== false;
    this.containerElement = null;
    this.quantitySelector = null;
  }

  render() {
    this.containerElement = document.createElement('div');

    // 수량 선택 및 액션 영역
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'border-t border-gray-200 p-4';

    // 수량 선택기
    this.quantitySelector = new QuantitySelector({
      value: this.quantity,
      min: 1,
      max: this.maxQuantity,
      label: '수량',
      showLabel: true,
    });

    actionsContainer.appendChild(this.quantitySelector.render());

    // 장바구니 담기 버튼
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className =
      'add-to-cart-btn w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium';
    addToCartBtn.textContent = this.cartButtonText;
    if (this.productId) {
      addToCartBtn.setAttribute('data-product-id', this.productId);
    }

    actionsContainer.appendChild(addToCartBtn);
    this.containerElement.appendChild(actionsContainer);

    // 상품 목록으로 돌아가기 버튼 (선택적)
    if (this.showBackToListButton) {
      const backToListContainer = document.createElement('div');
      backToListContainer.className = 'mb-6';

      const backToListBtn = document.createElement('button');
      backToListBtn.className =
        'go-to-product-list block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors';
      backToListBtn.textContent = '상품 목록으로 돌아가기';

      backToListContainer.appendChild(backToListBtn);
      this.containerElement.appendChild(backToListContainer);
    }

    this.bindEvents();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // 수량 변경 이벤트
    this.containerElement.addEventListener('quantity-change', (e) => {
      this.quantity = e.detail.value;
      console.log('Quantity changed:', e.detail);

      // 상위 컴포넌트로 이벤트 전파
      const event = new CustomEvent('product-quantity-change', {
        detail: {
          ...e.detail,
          productId: this.productId,
          totalPrice: this.price * e.detail.value,
        },
        bubbles: true,
      });
      this.containerElement.dispatchEvent(event);
    });

    // 장바구니 담기 클릭
    this.containerElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        this.onAddToCart();
      } else if (e.target.classList.contains('go-to-product-list')) {
        this.onGoToProductList();
      }
    });
  }

  onAddToCart() {
    const event = new CustomEvent('product-add-to-cart', {
      detail: {
        productId: this.productId,
        quantity: this.quantity,
        totalPrice: this.price * this.quantity,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  onGoToProductList() {
    const event = new CustomEvent('product-go-to-list', {
      detail: {
        productId: this.productId,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  // 편의 메서드들
  getQuantity() {
    return this.quantitySelector
      ? this.quantitySelector.getValue()
      : this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    if (this.quantitySelector) {
      this.quantitySelector.setValue(quantity);
    }
  }

  setMaxQuantity(maxQuantity) {
    this.maxQuantity = maxQuantity;
    if (this.quantitySelector) {
      this.quantitySelector.setMax(maxQuantity);
    }
  }

  setPrice(price) {
    this.price = price;
  }

  setProductId(productId) {
    this.productId = productId;
    const cartBtn = this.containerElement?.querySelector('.add-to-cart-btn');
    if (cartBtn && productId) {
      cartBtn.setAttribute('data-product-id', productId);
    }
  }

  getTotalPrice() {
    return this.price * this.getQuantity();
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
