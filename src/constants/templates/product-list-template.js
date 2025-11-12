// HTML template constants for product list page
// 상품 목록 페이지 HTML 템플릿 상수들
// File exceeds 80 lines due to large HTML template constants
// HTML 템플릿 상수로 인해 80줄 초과

import { CommonFooter } from '@/components/commons/Footer';
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
  }
}

// 컴포넌트 마운트 함수들은 main.js에서 호출됩니다

export const 상품목록_레이아웃_로딩 = `
    <div class="min-h-screen bg-gray-50">
      <div class="header" data-cart-count="0"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="loading"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loading"></div>
            
            <div class="text-center py-4">
              <div id="spinner-container"></div>
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    </div>
  `;

export const 상품목록_레이아웃_로딩완료 = `
    <div class="bg-gray-50">
      <div class="header" data-cart-count="4"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="loaded"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 개수 정보 -->
            <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">340개</span>의 상품
            </div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loaded"></div>
            
            <div class="text-center py-4 text-sm text-gray-500">
              모든 상품을 확인했습니다
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    </div>
  `;

export const 상품목록_레이아웃_카테고리_1Depth = `
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 필터 옵션 -->
        <div class="space-y-3">

          <!-- 카테고리 필터 -->
          <div class="category-filter" data-state="category1-selected" data-category1="생활/건강"></div>
          
          <!-- 필터바 -->
          <div class="filter-bar"></div>
        </div>
      </div>
    </main>
  `;

export const 상품목록_레이아웃_카테고리_2Depth = `
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 필터 옵션 -->
        <div class="space-y-3">

          <!-- 카테고리 필터 -->
          <div class="category-filter" data-state="category2-selected" data-category1="생활/건강" data-category2="주방용품"></div>
          
          <!-- 필터바 -->
          <div class="filter-bar"></div>
        </div>
      </div>
    </main>
  `;
