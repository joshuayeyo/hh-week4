// CategoryFilter component for hierarchical category navigation
// 계층형 카테고리 네비게이션 컴포넌트
// File exceeds 80 lines due to comprehensive hierarchical navigation functionality
// 계층형 네비게이션 기능으로 인해 80줄 초과

export class CategoryFilter {
  constructor(options = {}) {
    this.categories = options.categories || {
      '생활/건강': ['생활용품', '주방용품', '문구/사무용품'],
      '디지털/가전': ['스마트폰', '노트북', '가전제품'],
    };
    this.selectedCategory1 = options.selectedCategory1 || null;
    this.selectedCategory2 = options.selectedCategory2 || null;
    this.showBreadcrumb = options.showBreadcrumb !== false;
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'space-y-2';

    // Breadcrumb 렌더링
    if (this.showBreadcrumb) {
      this.containerElement.appendChild(this.renderBreadcrumb());
    }

    // 1depth 카테고리 렌더링
    this.containerElement.appendChild(this.render1DepthCategories());

    // 2depth 카테고리 렌더링 (1depth 선택시만)
    if (this.selectedCategory1) {
      this.containerElement.appendChild(this.render2DepthCategories());
    }

    this.bindEvents();
    return this.containerElement;
  }

  renderBreadcrumb() {
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.className = 'flex items-center gap-2';

    const label = document.createElement('label');
    label.className = 'text-sm text-gray-600';
    label.textContent = '카테고리:';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'text-xs hover:text-blue-800 hover:underline';
    resetBtn.setAttribute('data-breadcrumb', 'reset');
    resetBtn.textContent = '전체';

    breadcrumbContainer.appendChild(label);
    breadcrumbContainer.appendChild(resetBtn);

    if (this.selectedCategory1) {
      const separator1 = document.createElement('span');
      separator1.className = 'text-xs text-gray-500';
      separator1.textContent = '>';

      const category1Btn = document.createElement('button');
      category1Btn.className = 'text-xs hover:text-blue-800 hover:underline';
      category1Btn.setAttribute('data-breadcrumb', 'category1');
      category1Btn.setAttribute('data-category1', this.selectedCategory1);
      category1Btn.textContent = this.selectedCategory1;

      breadcrumbContainer.appendChild(separator1);
      breadcrumbContainer.appendChild(category1Btn);

      if (this.selectedCategory2) {
        const separator2 = document.createElement('span');
        separator2.className = 'text-xs text-gray-500';
        separator2.textContent = '>';

        const category2Span = document.createElement('span');
        category2Span.className = 'text-xs text-gray-600 cursor-default';
        category2Span.textContent = this.selectedCategory2;

        breadcrumbContainer.appendChild(separator2);
        breadcrumbContainer.appendChild(category2Span);
      }
    }

    return breadcrumbContainer;
  }

  render1DepthCategories() {
    const container = document.createElement('div');
    container.className = 'flex flex-wrap gap-2';

    if (Object.keys(this.categories).length === 0) {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'text-sm text-gray-500 italic';
      loadingDiv.textContent = '카테고리 로딩 중...';
      container.appendChild(loadingDiv);
      return container;
    }

    Object.keys(this.categories).forEach((category1) => {
      const button = document.createElement('button');
      button.className = `category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${
        this.selectedCategory1 === category1
          ? 'bg-blue-100 border-blue-300 text-blue-800'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`;
      button.setAttribute('data-category1', category1);
      button.textContent = category1;
      container.appendChild(button);
    });

    return container;
  }

  render2DepthCategories() {
    const container = document.createElement('div');
    container.className = 'space-y-2';

    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-wrap gap-2';

    const subCategories = this.categories[this.selectedCategory1] || [];

    subCategories.forEach((category2) => {
      const button = document.createElement('button');
      button.className = `category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${
        this.selectedCategory2 === category2
          ? 'bg-blue-100 border-blue-300 text-blue-800'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`;
      button.setAttribute('data-category1', this.selectedCategory1);
      button.setAttribute('data-category2', category2);
      button.textContent = category2;
      wrapper.appendChild(button);
    });

    container.appendChild(wrapper);
    return container;
  }

  bindEvents() {
    if (!this.containerElement || this.containerElement._hasEventListener)
      return;

    const clickHandler = (e) => {
      const target = e.target;

      // Breadcrumb 클릭 처리
      if (target.hasAttribute('data-breadcrumb')) {
        const breadcrumbType = target.getAttribute('data-breadcrumb');
        this.onBreadcrumbClick(breadcrumbType, target);
        return;
      }

      // 1depth 카테고리 클릭 처리
      if (target.classList.contains('category1-filter-btn')) {
        const category1 = target.getAttribute('data-category1');
        this.onCategory1Click(category1);
        return;
      }

      // 2depth 카테고리 클릭 처리
      if (target.classList.contains('category2-filter-btn')) {
        const category1 = target.getAttribute('data-category1');
        const category2 = target.getAttribute('data-category2');
        this.onCategory2Click(category1, category2);
        return;
      }
    };

    this.containerElement.addEventListener('click', clickHandler);
    this.containerElement._hasEventListener = true;
    this.containerElement._clickHandler = clickHandler;
  }

  onBreadcrumbClick(type, element) {
    if (type === 'reset') {
      this.selectedCategory1 = null;
      this.selectedCategory2 = null;
    } else if (type === 'category1') {
      this.selectedCategory2 = null;
    }

    this.refresh();

    const event = new CustomEvent('category-breadcrumb-click', {
      detail: {
        type,
        category1: this.selectedCategory1,
        category2: this.selectedCategory2,
        element,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  onCategory1Click(category1) {
    const previousCategory1 = this.selectedCategory1;
    const previousCategory2 = this.selectedCategory2;

    // 같은 카테고리 클릭시 토글, 다른 카테고리 클릭시 선택
    if (this.selectedCategory1 === category1) {
      this.selectedCategory1 = null;
      this.selectedCategory2 = null;
    } else {
      this.selectedCategory1 = category1;
      this.selectedCategory2 = null;
    }

    this.refresh();

    const event = new CustomEvent('category1-change', {
      detail: {
        category1: this.selectedCategory1,
        category2: this.selectedCategory2,
        previousCategory1,
        previousCategory2,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  onCategory2Click(category1, category2) {
    const previousCategory1 = this.selectedCategory1;
    const previousCategory2 = this.selectedCategory2;

    // 같은 카테고리 클릭시 토글, 다른 카테고리 클릭시 선택
    if (this.selectedCategory2 === category2) {
      this.selectedCategory2 = null;
    } else {
      this.selectedCategory1 = category1;
      this.selectedCategory2 = category2;
    }

    this.refresh();

    const event = new CustomEvent('category2-change', {
      detail: {
        category1: this.selectedCategory1,
        category2: this.selectedCategory2,
        previousCategory1,
        previousCategory2,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  // 편의 메서드들
  setCategory1(category1) {
    this.selectedCategory1 = category1;
    this.selectedCategory2 = null; // 1depth 변경시 2depth 리셋
    this.refresh();
  }

  setCategory2(category1, category2) {
    this.selectedCategory1 = category1;
    this.selectedCategory2 = category2;
    this.refresh();
  }

  resetCategories() {
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
    this.refresh();
  }

  getCategoryState() {
    return {
      category1: this.selectedCategory1,
      category2: this.selectedCategory2,
    };
  }

  setCategories(categories) {
    this.categories = categories;
    this.refresh();
  }

  refresh() {
    if (this.containerElement && this.containerElement.parentNode) {
      // 기존 내용을 모두 제거
      this.containerElement.innerHTML = '';

      // 새로운 내용으로 다시 렌더링
      const tempContainer = document.createElement('div');
      tempContainer.className = this.containerElement.className;

      // Breadcrumb 렌더링
      if (this.showBreadcrumb) {
        tempContainer.appendChild(this.renderBreadcrumb());
      }

      // 1depth 카테고리 렌더링
      tempContainer.appendChild(this.render1DepthCategories());

      // 2depth 카테고리 렌더링 (1depth 선택시만)
      if (this.selectedCategory1) {
        tempContainer.appendChild(this.render2DepthCategories());
      }

      // 기존 컨테이너에 새 내용 추가
      while (tempContainer.firstChild) {
        this.containerElement.appendChild(tempContainer.firstChild);
      }
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
