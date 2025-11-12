// QuantitySelector component for quantity selection with +/- buttons
// +/- 버튼이 있는 수량 선택 컴포넌트

export class QuantitySelector {
  constructor(options = {}) {
    this.value = options.value || 1;
    this.min = options.min || 1;
    this.max = options.max || 999;
    this.label = options.label || '수량';
    this.showLabel = options.showLabel !== false;
    this.containerElement = null;
    this.inputElement = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'flex items-center justify-between mb-4';

    // 라벨
    if (this.showLabel) {
      const labelElement = document.createElement('span');
      labelElement.className = 'text-sm font-medium text-gray-900';
      labelElement.textContent = this.label;
      this.containerElement.appendChild(labelElement);
    }

    // 수량 선택 컨트롤
    const quantityContainer = document.createElement('div');
    quantityContainer.className = 'flex items-center';

    // 감소 버튼
    const decreaseBtn = document.createElement('button');
    decreaseBtn.className =
      'quantity-decrease w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100';
    decreaseBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
      </svg>
    `;

    // 입력 필드
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'number';
    this.inputElement.className =
      'quantity-input w-16 h-8 text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500';
    this.inputElement.value = this.value;
    this.inputElement.min = this.min;
    this.inputElement.max = this.max;

    // 증가 버튼
    const increaseBtn = document.createElement('button');
    increaseBtn.className =
      'quantity-increase w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100';
    increaseBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
    `;

    quantityContainer.appendChild(decreaseBtn);
    quantityContainer.appendChild(this.inputElement);
    quantityContainer.appendChild(increaseBtn);
    this.containerElement.appendChild(quantityContainer);

    this.bindEvents();
    this.updateButtonStates();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // 클릭 이벤트 위임
    this.containerElement.addEventListener('click', (e) => {
      if (e.target.closest('.quantity-decrease')) {
        this.decrease();
      } else if (e.target.closest('.quantity-increase')) {
        this.increase();
      }
    });

    // 입력 필드 변경 이벤트
    this.inputElement.addEventListener('input', (e) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        this.setValue(newValue);
      }
    });

    this.inputElement.addEventListener('blur', (e) => {
      // blur 시 유효성 검사 및 보정
      const newValue = parseInt(e.target.value, 10);
      if (isNaN(newValue) || newValue < this.min) {
        this.setValue(this.min);
      } else if (newValue > this.max) {
        this.setValue(this.max);
      } else {
        this.setValue(newValue);
      }
    });
  }

  increase() {
    if (this.value < this.max) {
      this.setValue(this.value + 1);
      this.emitChangeEvent('increase');
    }
  }

  decrease() {
    if (this.value > this.min) {
      this.setValue(this.value - 1);
      this.emitChangeEvent('decrease');
    }
  }

  setValue(value) {
    const newValue = Math.max(this.min, Math.min(this.max, value));
    const oldValue = this.value;
    this.value = newValue;

    if (this.inputElement) {
      this.inputElement.value = newValue;
    }

    this.updateButtonStates();

    if (oldValue !== newValue) {
      this.emitChangeEvent('set');
    }
  }

  getValue() {
    return this.value;
  }

  setMin(min) {
    this.min = min;
    if (this.value < min) {
      this.setValue(min);
    }
    if (this.inputElement) {
      this.inputElement.min = min;
    }
    this.updateButtonStates();
  }

  setMax(max) {
    this.max = max;
    if (this.value > max) {
      this.setValue(max);
    }
    if (this.inputElement) {
      this.inputElement.max = max;
    }
    this.updateButtonStates();
  }

  updateButtonStates() {
    if (!this.containerElement) return;

    const decreaseBtn =
      this.containerElement.querySelector('.quantity-decrease');
    const increaseBtn =
      this.containerElement.querySelector('.quantity-increase');

    if (decreaseBtn) {
      decreaseBtn.disabled = this.value <= this.min;
      decreaseBtn.style.opacity = this.value <= this.min ? '0.5' : '1';
    }

    if (increaseBtn) {
      increaseBtn.disabled = this.value >= this.max;
      increaseBtn.style.opacity = this.value >= this.max ? '0.5' : '1';
    }
  }

  emitChangeEvent(action) {
    const event = new CustomEvent('quantity-change', {
      detail: {
        value: this.value,
        action,
        min: this.min,
        max: this.max,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
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
