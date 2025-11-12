// ProductDetailHeader mount function
// 상품 상세 헤더 마운트 함수

import { ProductDetailHeader } from '@/components/features/ProductDetailHeader';

export function mountProductDetailHeader(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const productDetailHeader = new ProductDetailHeader(options);
    container.appendChild(productDetailHeader.render());

    // 통합 이벤트 리스너 등록
    container.addEventListener('cart-click', (e) => {
      console.log('Cart clicked from mounted ProductDetailHeader:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    return productDetailHeader;
  }

  return null;
}
