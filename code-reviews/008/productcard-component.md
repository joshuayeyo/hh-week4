# Code Review: ProductCard Component

## 📋 Overview
- **Component**: ProductCard with template separation
- **Files**: `src/components/commons/ProductCard/index.js`, `templates.js`
- **Purpose**: 상품 카드 UI 컴포넌트 (로딩/상품/빈 상태 지원)

## 🔍 Review Details

### Architecture & Structure
- ✅ **템플릿 분리**: HTML 템플릿을 별도 파일로 분리하여 관심사 분리
- ✅ **상태 기반 렌더링**: 로딩/상품/빈 상태에 따른 조건부 렌더링
- ✅ **이벤트 기반 통신**: CustomEvent로 상위 컴포넌트와 통신
- ✅ **생명주기 관리**: mount/unmount로 DOM 관리

### Code Quality (index.js - 136줄)
- ✅ **파일 길이**: 템플릿 분리로 80줄 목표에 근접
- ✅ **단일 책임**: UI 렌더링과 이벤트 처리만 담당
- ✅ **props 패턴**: options 객체로 유연한 설정
- ✅ **상태 메서드**: setLoading, updateProduct로 동적 업데이트

### Template Separation (templates.js - 58줄)
- ✅ **상수 분리**: SKELETON_TEMPLATE, EMPTY_TEMPLATE
- ✅ **함수형 템플릿**: getProductTemplate로 동적 생성
- ✅ **헬퍼 함수**: formatPrice, getAddButtonTemplate 분리
- ✅ **재사용성**: 다른 컴포넌트에서도 사용 가능

### Event Handling
- ✅ **이벤트 위임**: 상품 이미지/정보 클릭 처리
- ✅ **버블링 활용**: CustomEvent의 bubbles: true
- ✅ **preventDefault**: 장바구니 버튼 클릭 시 이벤트 전파 차단
- ✅ **조건부 바인딩**: 로딩 상태에서는 이벤트 바인딩 제외

### Performance
- ✅ **지연 로딩**: img 태그의 loading="lazy"
- ✅ **CSS 애니메이션**: Tailwind의 animate-pulse, hover 효과
- ✅ **메모리 관리**: unmount 시 DOM 요소 제거

## 📊 Metrics
- **Main Component**: 136줄 (목표 80줄에서 약간 초과)
- **Templates**: 58줄 (적절한 분리)
- **Total**: 194줄
- **Methods**: 11개 (적당한 복잡도)

## 🎯 Strengths
1. **템플릿 분리**: HTML과 로직 분리로 유지보수성 향상
2. **상태 관리**: 명확한 상태 전환과 UI 업데이트
3. **이벤트 시스템**: CustomEvent로 느슨한 결합
4. **재사용성**: 다양한 상황에서 재사용 가능한 범용 컴포넌트

## 💡 Usage Examples
```javascript
// 로딩 상태
const loadingCard = new ProductCard({ isLoading: true });

// 상품 표시
const productCard = new ProductCard({
  product: { id: '1', title: '상품', price: 1000 },
  showAddButton: true
});

// 이벤트 처리
container.addEventListener('product-click', (e) => {
  console.log('Product clicked:', e.detail.product);
});
```

## 🔮 Future Enhancements
- LoadingState와 연동하여 자동 상태 관리
- 상품 이미지 로딩 실패 시 fallback 처리
- 장바구니 추가 시 로딩 상태 표시
- 다양한 카드 사이즈 옵션 확장

## ⚠️ Minor Issues
- **파일 길이**: 136줄로 80줄 목표 초과 (템플릿 분리로 개선됨)
- **하드코딩**: 일부 CSS 클래스가 하드코딩됨 (향후 테마 시스템 고려)

## ✅ Approval
**APPROVED** - 템플릿 분리와 상태 기반 렌더링이 잘 구현된 재사용 가능한 컴포넌트