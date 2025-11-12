// Header component with embedded CartIcon
// CartIcon이 임베드된 헤더 컴포넌트

import { CartIcon } from '@/components/commons/CartIcon';

export class Header {
  constructor(options = {}) {
    this.title = options.title || '쇼핑몰';
    this.homeLink = options.homeLink !== false;
    this.cartIconOptions = options.cartIconOptions || { count: 0 };
    this.containerElement = null;
    this.cartIcon = null;
  }

  render() {
    this.containerElement = document.createElement('header');
    this.containerElement.className = 'bg-white shadow-sm sticky top-0 z-40';

    const maxWidthDiv = document.createElement('div');
    maxWidthDiv.className = 'max-w-md mx-auto px-4 py-4';

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex items-center justify-between';

    // 제목 부분
    const titleElement = document.createElement('h1');
    titleElement.className = 'text-xl font-bold text-gray-900';

    if (this.homeLink) {
      const titleLink = document.createElement('a');
      titleLink.href = '/';
      titleLink.setAttribute('data-link', '');
      titleLink.textContent = this.title;
      titleElement.appendChild(titleLink);
    } else {
      titleElement.textContent = this.title;
    }

    // 액션 부분 (CartIcon 포함)
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'flex items-center space-x-2';
    actionsDiv.id = 'header-actions';

    const cartIconContainer = document.createElement('div');
    cartIconContainer.id = 'cart-icon-container';

    // CartIcon 생성 및 마운트
    this.cartIcon = new CartIcon(this.cartIconOptions);
    cartIconContainer.appendChild(this.cartIcon.render());

    actionsDiv.appendChild(cartIconContainer);

    // 구조 조립
    flexContainer.appendChild(titleElement);
    flexContainer.appendChild(actionsDiv);
    maxWidthDiv.appendChild(flexContainer);
    this.containerElement.appendChild(maxWidthDiv);

    this.bindEvents();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // CartIcon 이벤트 위임 (필요시 추가)
    this.containerElement.addEventListener('cart-click', (e) => {
      console.log('Cart clicked from Header:', e.detail);
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
    this.refresh();
  }

  refresh() {
    if (this.containerElement && this.containerElement.parentNode) {
      const parent = this.containerElement.parentNode;
      const newElement = this.render();
      parent.replaceChild(newElement, this.containerElement);
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
