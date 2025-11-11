// 상품 상세 페이지용 스피너 마운트 함수

import { Spinner } from '@/components/commons/Spinner';

export function mountDetailSpinner(containerId = 'detail-spinner-container') {
  const spinnerContainer = document.getElementById(containerId);

  if (spinnerContainer) {
    const spinner = new Spinner({
      type: 'circle',
      size: 'lg',
      color: 'blue',
      text: '상품 정보를 불러오는 중...',
    });
    spinnerContainer.appendChild(spinner.render());
    return spinner;
  }
  return null;
}
