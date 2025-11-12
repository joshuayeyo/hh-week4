// CategoryFilter mount function
// 카테고리 필터 마운트 함수

import { CategoryFilter } from '@/components/commons/CategoryFilter';

export function mountCategoryFilter(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const categoryFilter = new CategoryFilter(options);
    container.appendChild(categoryFilter.render());

    // 통합 이벤트 리스너 등록
    container.addEventListener('category-breadcrumb-click', (e) => {
      console.log('Category breadcrumb clicked:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    container.addEventListener('category1-change', (e) => {
      console.log('Category1 changed:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    container.addEventListener('category2-change', (e) => {
      console.log('Category2 changed:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    return categoryFilter;
  }

  return null;
}
