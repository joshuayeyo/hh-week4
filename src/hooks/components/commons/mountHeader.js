// ProductListHeader mount function
// 상품 목록 헤더 마운트 함수

import { Header } from '@/components/features/ProductListHeader';

export function mountHeader(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const header = new Header(options);
    container.appendChild(header.render());

    // 통합 이벤트 리스너 등록
    container.addEventListener('cart-click', (e) => {
      console.log('Cart clicked from mounted Header:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    return header;
  }

  return null;
}
