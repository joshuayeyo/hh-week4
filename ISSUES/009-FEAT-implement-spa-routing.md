## Description
현재 애플리케이션이 정적 페이지 방식으로 되어 있어, 클라이언트 사이드 라우팅 기능을 구현하여 SPA(Single Page Application)로 전환해야 합니다.

Browser History API를 활용한 네비게이션 지원과 페이지별 동적 컴포넌트 렌더링을 구현하여 사용자 경험을 향상시키는 것이 목표입니다.

## Todo
- [ ] `src/utils/router.js` - 기본 라우터 클래스 구현
- [ ] 경로 등록 및 핸들러 매핑 기능 구현
- [ ] Browser History API 연동 (pushState, popstate)
- [ ] 라우트 정의: `/`, `/products`, `/product/:id`, `/404`
- [ ] `data-link` 속성을 통한 SPA 네비게이션 구현
- [ ] 링크 클릭 시 페이지 새로고침 방지
- [ ] 브라우저 뒤로가기/앞으로가기 지원
- [ ] 기존 페이지 컴포넌트들과 라우터 연동
- [ ] 페이지 전환 시 컴포넌트 마운트/언마운트 처리
- [ ] 하위 컴포넌트들 자동 마운팅 로직 구현
- [ ] Header, ProductCard, NotFound 컴포넌트에 네비게이션 링크 추가
- [ ] 테스트 및 코드 리뷰

## ETC
**브랜치**: `feat/009/implement-spa-routing`
**우선순위**: High
**선행 요구사항**: #008 Common Components 구현 완료

### 기술 스펙
- Router 클래스 기반 라우팅 시스템
- `data-link` 속성을 통한 네비게이션
- 동적 경로 매개변수 지원 (`/product/:id`)
- 404 페이지 처리

### 사용자 경험 개선
- 페이지 이동 시 새로고침 없는 즉시 전환
- SEO 친화적 URL 구조
- 브라우저 히스토리 완전 지원