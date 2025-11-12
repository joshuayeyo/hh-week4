// ProductGrid mount functions

import { ProductGrid } from '@/components/commons/ProductGrid';

export function mountProductGrid(containerId, options = {}) {
  return new ProductGrid(containerId, options);
}
