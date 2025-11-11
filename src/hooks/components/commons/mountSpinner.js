import { Spinner } from '@/components/commons/Spinner';

// 기본 스피너 마운트 함수
export function mountSpinner(containerId = 'spinner-container') {
  const spinnerContainer = document.getElementById(containerId);

  if (spinnerContainer) {
    const spinner = new Spinner({
      type: 'svg',
      size: 'md',
      color: 'blue',
      text: '상품을 불러오는 중...',
    });
    spinnerContainer.appendChild(spinner.render());
    return spinner;
  }
  return null;
}
