// FilterBar mount function
// 필터바 마운트 함수

import { FilterBar } from '@/components/commons/FilterBar';

export function mountFilterBar(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const filterBar = new FilterBar(options);
    container.appendChild(filterBar.render());

    // 통합 이벤트 리스너 등록
    container.addEventListener('filter-items-per-page-change', (e) => {
      console.log('Items per page changed:', e.detail.value);
      // 상위 컴포넌트에서 처리
    });

    container.addEventListener('filter-sort-change', (e) => {
      console.log('Sort changed:', e.detail.value);
      // 상위 컴포넌트에서 처리
    });

    return filterBar;
  }

  return null;
}
