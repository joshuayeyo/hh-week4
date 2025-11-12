// ProductQuantityActions mount function
// 상품 수량 액션 마운트 함수

import { ProductQuantityActions } from '@/components/features/ProductQuantityActions';

export function mountProductQuantityActions(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const productQuantityActions = new ProductQuantityActions(options);
    container.appendChild(productQuantityActions.render());

    // 통합 이벤트 리스너 등록
    container.addEventListener('product-quantity-change', (e) => {
      console.log('Product quantity changed from mount:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    container.addEventListener('product-add-to-cart', (e) => {
      console.log('Product add to cart from mount:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    container.addEventListener('product-go-to-list', (e) => {
      console.log('Product go to list from mount:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    return productQuantityActions;
  }

  return null;
}
