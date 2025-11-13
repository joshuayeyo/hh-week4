// NotFound page mount function
// NotFound 페이지 마운트 함수

import { NotFound } from '@/pages/NotFound';

export function mountNotFound(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found`);
    return null;
  }

  try {
    const notFound = new NotFound(options);
    notFound.mount(container);

    // 네비게이션 이벤트 리스너 등록
    container.addEventListener('navigate-home', (e) => {
      console.log('Navigate to home requested:', e.detail);
      // 라우터나 상위 컴포넌트에서 처리 (홈으로 이동)
    });

    return notFound;
  } catch (error) {
    console.error('Failed to mount NotFound page:', error);
    return null;
  }
}
