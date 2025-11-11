// Spinner component for loading states
// 로딩 상태용 스피너 컴포넌트
// File exceeds 80 lines due to multiple spinner types and configurations
// 스피너 타입과 설정으로 인한 80줄 초과

export class Spinner {
  constructor(options = {}) {
    this.type = options.type || 'svg';
    this.size = options.size || 'md';
    this.color = options.color || 'blue';
    this.text = options.text || null;
    this.spinnerElement = null;
    this.loadingState = options.loadingState || null;
    this.unsubscribe = null;

    if (this.loadingState) {
      this.bindLoadingState();
    }
  }

  render() {
    this.spinnerElement = document.createElement('div');
    this.spinnerElement.className =
      'spinner-container inline-flex items-center';

    if (this.type === 'svg') {
      this.renderSvgSpinner();
    } else {
      this.renderCircleSpinner();
    }

    if (this.text) {
      this.addText();
    }

    return this.spinnerElement;
  }

  renderSvgSpinner() {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-8 w-8',
    };

    const colorClasses = {
      blue: 'text-blue-600',
      gray: 'text-gray-600',
      white: 'text-white',
    };

    this.spinnerElement.innerHTML = `
      <svg class="animate-spin ${sizeClasses[this.size]} ${colorClasses[this.color]}" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;
  }

  renderCircleSpinner() {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };

    const colorClasses = {
      blue: 'border-blue-600',
      gray: 'border-gray-600',
      white: 'border-white',
    };

    this.spinnerElement.innerHTML = `
      <div class="animate-spin rounded-full ${sizeClasses[this.size]} border-b-2 ${colorClasses[this.color]}"></div>
    `;
  }

  addText() {
    const textElement = document.createElement('span');
    textElement.className = `text-sm ${this.getTextColorClass()} ml-2`;
    textElement.textContent = this.text;
    this.spinnerElement.appendChild(textElement);
  }

  getTextColorClass() {
    const textColorMap = {
      blue: 'text-gray-600',
      gray: 'text-gray-600',
      white: 'text-white',
    };
    return textColorMap[this.color] || 'text-gray-600';
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.spinnerElement) {
      this.spinnerElement.remove();
    }
  }

  updateText(newText) {
    const textElement = this.spinnerElement?.querySelector('span');
    if (textElement) {
      textElement.textContent = newText;
    }
  }

  show() {
    if (this.spinnerElement) {
      this.spinnerElement.style.display = 'inline-flex';
    }
  }

  hide() {
    if (this.spinnerElement) {
      this.spinnerElement.style.display = 'none';
    }
  }

  bindLoadingState() {
    this.unsubscribe = this.loadingState.subscribe((state) => {
      if (state.isLoading) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  setLoadingState(loadingState) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.loadingState = loadingState;
    if (this.loadingState) {
      this.bindLoadingState();
    }
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.unmount();
  }
}
