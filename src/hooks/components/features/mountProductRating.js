// ProductRating mount function
// 상품 평점 마운트 함수

import { ProductRating } from '@/components/features/ProductRating';

export function mountProductRating(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const productRating = new ProductRating(options);
    container.appendChild(productRating.render());

    // 리뷰 클릭 이벤트 리스너 등록
    container.addEventListener('product-reviews-click', (e) => {
      console.log('Product reviews clicked from mount:', e.detail);
      // 상위 컴포넌트에서 처리 (리뷰 페이지로 이동 등)
    });

    return productRating;
  }

  return null;
}
