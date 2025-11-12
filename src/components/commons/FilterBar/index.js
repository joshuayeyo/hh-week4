// FilterBar component combining ItemsPerPageSelector and SortSelector
// 페이지당 아이템 수 선택기와 정렬 선택기를 결합한 필터바 컴포넌트

import { ItemsPerPageSelector } from '@/components/commons/ItemsPerPageSelector';
import { SortSelector } from '@/components/commons/SortSelector';

export class FilterBar {
  constructor(options = {}) {
    this.itemsPerPageOptions = options.itemsPerPageOptions || {
      defaultValue: 20,
      options: [10, 20, 50, 100],
    };
    this.sortOptions = options.sortOptions || {
      defaultValue: 'price_asc',
    };
    this.layout = options.layout || 'horizontal'; // 'horizontal', 'vertical'
    this.containerElement = null;
    this.itemsPerPageSelector = null;
    this.sortSelector = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = this.getContainerClasses();

    // ItemsPerPageSelector 생성
    this.itemsPerPageSelector = new ItemsPerPageSelector(
      this.itemsPerPageOptions
    );

    // SortSelector 생성
    this.sortSelector = new SortSelector(this.sortOptions);

    // 컨테이너에 추가
    this.containerElement.appendChild(this.itemsPerPageSelector.render());
    this.containerElement.appendChild(this.sortSelector.render());

    this.bindEvents();
    return this.containerElement;
  }

  getContainerClasses() {
    const baseClasses = 'flex items-center gap-2';
    const layoutClasses = {
      horizontal: 'justify-between',
      vertical: 'flex-col items-start gap-3',
    };

    return `${baseClasses} ${layoutClasses[this.layout] || layoutClasses.horizontal}`;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // ItemsPerPageSelector 이벤트 위임
    this.containerElement.addEventListener('items-per-page-change', (e) => {
      this.onItemsPerPageChange(e.detail.value);
    });

    // SortSelector 이벤트 위임
    this.containerElement.addEventListener('sort-change', (e) => {
      this.onSortChange(e.detail.value);
    });
  }

  onItemsPerPageChange(value) {
    const event = new CustomEvent('filter-items-per-page-change', {
      detail: { value, filterType: 'itemsPerPage' },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  onSortChange(value) {
    const event = new CustomEvent('filter-sort-change', {
      detail: { value, filterType: 'sort' },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  // 편의 메서드들
  getItemsPerPage() {
    return this.itemsPerPageSelector?.getValue();
  }

  getSortValue() {
    return this.sortSelector?.getValue();
  }

  setItemsPerPage(value) {
    this.itemsPerPageSelector?.setValue(value);
  }

  setSortValue(value) {
    this.sortSelector?.setValue(value);
  }

  getFilterState() {
    return {
      itemsPerPage: this.getItemsPerPage(),
      sort: this.getSortValue(),
    };
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
