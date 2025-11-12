// Basic Header component providing common header structure
// 기본 헤더 구조를 제공하는 공통 헤더 컴포넌트

export class Header {
  constructor(options = {}) {
    this.title = options.title || '제목';
    this.leftContent = options.leftContent || null; // 왼쪽 콘텐츠 (뒤로가기 버튼 등)
    this.rightContent = options.rightContent || null; // 오른쪽 콘텐츠 (장바구니 등)
    this.sticky = options.sticky !== false; // 기본값: sticky
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('header');
    this.containerElement.className = `bg-white shadow-sm ${this.sticky ? 'sticky top-0 z-40' : ''}`;

    const maxWidthDiv = document.createElement('div');
    maxWidthDiv.className = 'max-w-md mx-auto px-4 py-4';

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex items-center justify-between';

    // 왼쪽 콘텐츠 영역
    const leftSection = document.createElement('div');
    leftSection.className = 'flex items-center space-x-3';

    if (this.leftContent) {
      if (typeof this.leftContent === 'string') {
        leftSection.innerHTML = this.leftContent;
      } else {
        leftSection.appendChild(this.leftContent);
      }
    }

    // 제목
    const titleElement = document.createElement('h1');
    titleElement.className = 'text-lg font-bold text-gray-900';
    titleElement.textContent = this.title;
    leftSection.appendChild(titleElement);

    // 오른쪽 콘텐츠 영역
    const rightSection = document.createElement('div');
    rightSection.className = 'flex items-center space-x-2';

    if (this.rightContent) {
      if (typeof this.rightContent === 'string') {
        rightSection.innerHTML = this.rightContent;
      } else {
        rightSection.appendChild(this.rightContent);
      }
    }

    // 구조 조립
    flexContainer.appendChild(leftSection);
    flexContainer.appendChild(rightSection);
    maxWidthDiv.appendChild(flexContainer);
    this.containerElement.appendChild(maxWidthDiv);

    this.bindEvents();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;
    // 기본 이벤트 처리 (필요시 확장)
  }

  setTitle(title) {
    this.title = title;
    this.refresh();
  }

  setLeftContent(content) {
    this.leftContent = content;
    this.refresh();
  }

  setRightContent(content) {
    this.rightContent = content;
    this.refresh();
  }

  refresh() {
    if (this.containerElement && this.containerElement.parentNode) {
      const parent = this.containerElement.parentNode;
      const newElement = this.render();
      parent.replaceChild(newElement, this.containerElement);
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.containerElement) {
      this.containerElement.remove();
    }
  }
}
