// Basic Rating component for star ratings display
// 별점 표시를 위한 기본 평점 컴포넌트
// File exceeds 80 lines due to comprehensive star rating functionality
// 포괄적인 별점 기능으로 인해 80줄 초과

export class Rating {
  constructor(options = {}) {
    this.rating = options.rating || 0; // 평점 (0-5)
    this.maxRating = options.maxRating || 5; // 최대 평점
    this.size = options.size || 'medium'; // 'small', 'medium', 'large'
    this.showValue = options.showValue !== false; // 평점 수치 표시 여부
    this.reviewCount = options.reviewCount || 0; // 리뷰 개수
    this.showReviewCount = options.showReviewCount !== false; // 리뷰 개수 표시 여부
    this.interactive = options.interactive || false; // 클릭 가능 여부
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'flex items-center';

    const starsContainer = document.createElement('div');
    starsContainer.className = 'flex items-center';

    for (let i = 1; i <= this.maxRating; i++) {
      const star = this.createStar(i);
      starsContainer.appendChild(star);
    }

    this.containerElement.appendChild(starsContainer);

    if (this.showValue) {
      const ratingValue = document.createElement('span');
      ratingValue.className = 'ml-1 text-sm text-gray-600';
      ratingValue.textContent = this.rating.toFixed(1);
      this.containerElement.appendChild(ratingValue);
    }

    if (this.showReviewCount && this.reviewCount > 0) {
      const reviewCountElement = document.createElement('span');
      reviewCountElement.className = 'ml-2 text-sm text-gray-600';
      reviewCountElement.textContent = `(${this.reviewCount.toLocaleString()}개 리뷰)`;
      this.containerElement.appendChild(reviewCountElement);
    }

    if (this.interactive) {
      this.bindEvents();
    }

    return this.containerElement;
  }

  createStar(position) {
    const star = document.createElement('div');
    star.className = `rating-star ${this.getSizeClass()} cursor-${
      this.interactive ? 'pointer' : 'default'
    }`;
    star.setAttribute('data-rating', position);

    const isFilled = position <= this.rating;
    const isHalfFilled =
      position - 0.5 <= this.rating && position > this.rating;

    if (isFilled) {
      star.innerHTML = this.getFilledStarSvg();
      star.classList.add('text-yellow-400');
    } else if (isHalfFilled) {
      star.innerHTML = this.getHalfStarSvg();
      star.classList.add('text-yellow-400');
    } else {
      star.innerHTML = this.getEmptyStarSvg();
      star.classList.add('text-gray-300');
    }

    return star;
  }

  getSizeClass() {
    switch (this.size) {
      case 'small':
        return 'w-3 h-3';
      case 'large':
        return 'w-6 h-6';
      default:
        return 'w-4 h-4';
    }
  }

  getFilledStarSvg() {
    return `
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    `;
  }

  getHalfStarSvg() {
    return `
      <svg fill="currentColor" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stop-color="currentColor"/>
            <stop offset="50%" stop-color="rgb(209 213 219)"/>
          </linearGradient>
        </defs>
        <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    `;
  }

  getEmptyStarSvg() {
    return `
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    `;
  }

  bindEvents() {
    if (!this.containerElement) return;

    this.containerElement.addEventListener('click', (e) => {
      const star = e.target.closest('.rating-star');
      if (star) {
        const rating = parseInt(star.getAttribute('data-rating'));
        this.setRating(rating);
        this.emitRatingChange(rating);
      }
    });
  }

  setRating(rating) {
    const newRating = Math.max(0, Math.min(this.maxRating, rating));
    this.rating = newRating;
    this.refresh();
  }

  setReviewCount(count) {
    this.reviewCount = count;
    this.refresh();
  }

  getRating() {
    return this.rating;
  }

  emitRatingChange(rating) {
    const event = new CustomEvent('rating-change', {
      detail: {
        rating,
        maxRating: this.maxRating,
        reviewCount: this.reviewCount,
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
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
