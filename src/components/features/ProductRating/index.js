// ProductRating component for product-specific rating display
// 상품별 평점 표시를 위한 컴포넌트

import { Rating } from '@/components/commons/Rating';

export class ProductRating {
  constructor(options = {}) {
    this.productId = options.productId || null;
    this.rating = options.rating || 0;
    this.reviewCount = options.reviewCount || 0;
    this.size = options.size || 'medium';
    this.showClickableReviews = options.showClickableReviews !== false;
    this.containerElement = null;
    this.ratingComponent = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'flex items-center mb-3';

    // Rating 컴포넌트 조합
    this.ratingComponent = new Rating({
      rating: this.rating,
      maxRating: 5,
      size: this.size,
      showValue: true,
      reviewCount: this.reviewCount,
      showReviewCount: this.showClickableReviews,
      interactive: false,
    });

    const ratingElement = this.ratingComponent.render();

    // 리뷰 클릭 가능하게 만들기
    if (this.showClickableReviews && this.reviewCount > 0) {
      const reviewLink = document.createElement('button');
      reviewLink.className =
        'ml-2 text-sm text-gray-600 hover:text-blue-600 transition-colors review-link';
      reviewLink.textContent = `(${this.reviewCount.toLocaleString()}개 리뷰)`;

      if (this.productId) {
        reviewLink.setAttribute('data-product-id', this.productId);
      }

      // 기존 리뷰 개수 텍스트 제거하고 클릭 가능한 링크로 교체
      const existingReviewCount =
        ratingElement.querySelector('span:last-child');
      if (
        existingReviewCount &&
        existingReviewCount.textContent.includes('리뷰')
      ) {
        existingReviewCount.remove();
      }

      ratingElement.appendChild(reviewLink);
    }

    this.containerElement.appendChild(ratingElement);
    this.bindEvents();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;

    this.containerElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('review-link')) {
        const event = new CustomEvent('product-reviews-click', {
          detail: {
            productId: this.productId,
            rating: this.rating,
            reviewCount: this.reviewCount,
          },
          bubbles: true,
        });
        this.containerElement.dispatchEvent(event);
      }
    });
  }

  setRating(rating) {
    this.rating = rating;
    if (this.ratingComponent) {
      this.ratingComponent.setRating(rating);
    }
  }

  setReviewCount(count) {
    this.reviewCount = count;
    if (this.ratingComponent) {
      this.ratingComponent.setReviewCount(count);
    }
    this.refresh();
  }

  getRating() {
    return this.rating;
  }

  getReviewCount() {
    return this.reviewCount;
  }

  setProductId(productId) {
    this.productId = productId;
    const reviewLink = this.containerElement?.querySelector('.review-link');
    if (reviewLink && productId) {
      reviewLink.setAttribute('data-product-id', productId);
    }
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
