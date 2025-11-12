// ProductDetailHeader component with back button and cart icon
// 뒤로가기 버튼과 장바구니 아이콘이 있는 상품 상세 헤더 컴포넌트

import { CartIcon } from '@/components/commons/CartIcon';
import { Header } from '@/components/commons/Header';

export class ProductDetailHeader {
  constructor(options = {}) {
    this.cartIconOptions = options.cartIconOptions || { count: 0 };
    this.title = options.title || '상품 상세';
    this.onBackClick = options.onBackClick || (() => window.history.back());
    this.containerElement = null;
    this.header = null;
    this.cartIcon = null;
  }

  createBackButton() {
    const backButton = document.createElement('button');
    backButton.className =
      'p-2 text-gray-700 hover:text-gray-900 transition-colors';
    backButton.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    `;
    backButton.addEventListener('click', this.onBackClick);
    return backButton;
  }

  createCartIconContainer() {
    const cartContainer = document.createElement('div');
    cartContainer.className = 'flex items-center space-x-2';

    const cartIconWrapper = document.createElement('div');
    cartIconWrapper.id = 'cart-icon-container';

    this.cartIcon = new CartIcon(this.cartIconOptions);
    cartIconWrapper.appendChild(this.cartIcon.render());

    cartContainer.appendChild(cartIconWrapper);
    return cartContainer;
  }

  render() {
    this.containerElement = document.createElement('div');

    this.header = new Header({
      title: this.title,
      leftContent: this.createBackButton(),
      rightContent: this.createCartIconContainer(),
      sticky: true,
    });

    this.containerElement.appendChild(this.header.render());

    this.bindEvents();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // CartIcon 이벤트 위임
    this.containerElement.addEventListener('cart-click', (e) => {
      console.log('Cart clicked from ProductDetailHeader:', e.detail);
      // 상위 컴포넌트에서 처리
    });
  }

  // 편의 메서드들
  updateCartCount(count) {
    if (this.cartIcon) {
      this.cartIcon.updateCount(count);
    }
  }

  setCartCount(count) {
    this.cartIconOptions.count = count;
    if (this.cartIcon) {
      this.cartIcon.updateCount(count);
    }
  }

  getCartCount() {
    return this.cartIcon
      ? this.cartIcon.getCount()
      : this.cartIconOptions.count;
  }

  setTitle(title) {
    this.title = title;
    if (this.header) {
      this.header.setTitle(title);
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
