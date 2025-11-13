// ProductListPage mount function
// ProductListPage 마운트 함수

import { ProductListPage } from '@/pages/ProductList';

export function mountProductListPage(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found`);
    return null;
  }

  try {
    const productListPage = new ProductListPage(options);
    productListPage.mount(container);

    return productListPage;
  } catch (error) {
    console.error('Failed to mount ProductListPage:', error);
    return null;
  }
}
