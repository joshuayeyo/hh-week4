// ProductDetailPage mount function
// ProductDetailPage 마운트 함수

import { ProductDetailPage } from '@/pages/ProductDetail';

export function mountProductDetailPage(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found`);
    return null;
  }

  try {
    const productDetailPage = new ProductDetailPage(options);
    productDetailPage.mount(container);

    return productDetailPage;
  } catch (error) {
    console.error('Failed to mount ProductDetailPage:', error);
    return null;
  }
}
