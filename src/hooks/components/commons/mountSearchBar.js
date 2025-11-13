// SearchBar mount function
// SearchBar 마운트 함수

import { SearchBar } from '@/components/commons/SearchBar';

// SearchBar 컴포넌트를 DOM에 마운트하는 함수
export function mountSearchBar() {
  const searchBarContainer = document.getElementById('search-bar-container');

  if (searchBarContainer) {
    const searchBar = new SearchBar();
    searchBarContainer.appendChild(searchBar.render());

    // 검색 이벤트 리스너 등록
    searchBar.searchElement.addEventListener('search', (e) => {
      console.log('Search query:', e.detail.query);
      // 검색 로직은 상위 컴포넌트에서 처리
    });

    return searchBar;
  }

  return null;
}
