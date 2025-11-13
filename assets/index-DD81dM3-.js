(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e={}){this.title=e.title||`페이지를 찾을 수 없습니다`,this.homeText=e.homeText||`홈으로`,this.containerElement=null}render(){return this.containerElement=document.createElement(`main`),this.containerElement.className=`max-w-md mx-auto px-4 py-4`,this.containerElement.innerHTML=`
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
          </defs>

          <!-- 404 Numbers -->
          <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>

          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>

          <!-- Message -->
          <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">${this.title}</text>

          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
        </svg>

        <a href="/" data-link="" class="home-btn inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">${this.homeText}</a>
      </div>
    `,this.bindEvents(),this.containerElement}bindEvents(){}mount(e=document.body){e.appendChild(this.render())}unmount(){this.containerElement&&this.containerElement.remove()}};function t(t,n={}){let r=document.getElementById(t);if(!r)return console.warn(`Container with id "${t}" not found`),null;try{let t=new e(n);return t.mount(r),r.addEventListener(`navigate-home`,e=>{console.log(`Navigate to home requested:`,e.detail)}),t}catch(e){return console.error(`Failed to mount NotFound page:`,e),null}}function n(){let e=new Date().getFullYear();return`
    <footer class="bg-white shadow-sm border-t py-6 sticky bottom-0 z-20">
      <div class="max-w-md mx-auto text-center text-gray-500 text-sm">
        © ${e} 항해플러스 프론트엔드 쇼핑몰
      </div>
    </footer>
  `}var r=class{constructor(e={}){this.isLoading=e.isLoading||!1,this.cartCount=e.cartCount||0,this.category1=e.category1||``,this.category2=e.category2||``,this.productId=e.productId||``,this.containerElement=null}render(){return this.containerElement=document.createElement(`div`),this.containerElement.className=`min-h-screen bg-gray-50`,this.isLoading?this.renderLoading():this.renderLoaded(),this.containerElement}renderLoading(){this.containerElement.innerHTML=`
      <div class="product-detail-header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="" data-category2=""></div>
        <!-- 상품 상세 정보 (로딩 상태) -->
        <div class="product-detail" data-loading="true"></div>
      </main>
      ${n()}
    `}renderLoaded(){this.containerElement.innerHTML=`
      <div class="product-detail-header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="${this.category1}" data-category2="${this.category2}"></div>
        <!-- 상품 상세 정보 -->
        <div class="product-detail" data-product-id="${this.productId}"></div>
        <!-- 수량 선택 및 액션 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <div class="product-quantity-actions" data-product-id="${this.productId}" data-price="220" data-max-quantity="107"></div>
        </div>
        <!-- 관련 상품 -->
        <div class="related-products" data-title="관련 상품" data-subtitle="같은 카테고리의 다른 상품들" data-columns="2"></div>
      </main>
      ${n()}
    `}setLoading(e){this.isLoading=e,this.updateContent()}setCartCount(e){this.cartCount=e,this.updateHeaderCartCount()}setCategory(e,t){this.category1=e,this.category2=t,this.updateBreadcrumb()}setProductId(e){this.productId=e,this.updateProductId()}updateContent(){this.containerElement&&(this.isLoading?this.renderLoading():this.renderLoaded())}updateHeaderCartCount(){var e;let t=(e=this.containerElement)?.querySelector(`.product-detail-header`);t&&t.setAttribute(`data-cart-count`,this.cartCount)}updateBreadcrumb(){var e;let t=(e=this.containerElement)?.querySelector(`.product-detail-breadcrumb`);t&&(t.setAttribute(`data-category1`,this.category1),t.setAttribute(`data-category2`,this.category2))}updateProductId(){var e,t;let n=(e=this.containerElement)?.querySelector(`.product-detail`),r=(t=this.containerElement)?.querySelector(`.product-quantity-actions`);n&&n.setAttribute(`data-product-id`,this.productId),r&&r.setAttribute(`data-product-id`,this.productId)}mount(e=document.body){e.appendChild(this.render())}unmount(){this.containerElement&&this.containerElement.remove()}};function i(e,t={}){let n=document.getElementById(e);if(!n)return console.warn(`Container with id "${e}" not found`),null;try{let e=new r(t);return e.mount(n),e}catch(e){return console.error(`Failed to mount ProductDetailPage:`,e),null}}var a=class{constructor(e={}){this.categories=e.categories||{"생활/건강":[`생활용품`,`주방용품`,`문구/사무용품`],"디지털/가전":[`스마트폰`,`노트북`,`가전제품`]},this.selectedCategory1=e.selectedCategory1||null,this.selectedCategory2=e.selectedCategory2||null,this.showBreadcrumb=e.showBreadcrumb!==!1,this.containerElement=null}render(){return this.containerElement=document.createElement(`div`),this.containerElement.className=`space-y-2`,this.showBreadcrumb&&this.containerElement.appendChild(this.renderBreadcrumb()),this.containerElement.appendChild(this.render1DepthCategories()),this.selectedCategory1&&this.containerElement.appendChild(this.render2DepthCategories()),this.bindEvents(),this.containerElement}renderBreadcrumb(){let e=document.createElement(`div`);e.className=`flex items-center gap-2`;let t=document.createElement(`label`);t.className=`text-sm text-gray-600`,t.textContent=`카테고리:`;let n=document.createElement(`button`);if(n.className=`text-xs hover:text-blue-800 hover:underline`,n.setAttribute(`data-breadcrumb`,`reset`),n.textContent=`전체`,e.appendChild(t),e.appendChild(n),this.selectedCategory1){let t=document.createElement(`span`);t.className=`text-xs text-gray-500`,t.textContent=`>`;let n=document.createElement(`button`);if(n.className=`text-xs hover:text-blue-800 hover:underline`,n.setAttribute(`data-breadcrumb`,`category1`),n.setAttribute(`data-category1`,this.selectedCategory1),n.textContent=this.selectedCategory1,e.appendChild(t),e.appendChild(n),this.selectedCategory2){let t=document.createElement(`span`);t.className=`text-xs text-gray-500`,t.textContent=`>`;let n=document.createElement(`span`);n.className=`text-xs text-gray-600 cursor-default`,n.textContent=this.selectedCategory2,e.appendChild(t),e.appendChild(n)}}return e}render1DepthCategories(){let e=document.createElement(`div`);if(e.className=`flex flex-wrap gap-2`,Object.keys(this.categories).length===0){let t=document.createElement(`div`);return t.className=`text-sm text-gray-500 italic`,t.textContent=`카테고리 로딩 중...`,e.appendChild(t),e}return Object.keys(this.categories).forEach(t=>{let n=document.createElement(`button`);n.className=`category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${this.selectedCategory1===t?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}`,n.setAttribute(`data-category1`,t),n.textContent=t,e.appendChild(n)}),e}render2DepthCategories(){let e=document.createElement(`div`);e.className=`space-y-2`;let t=document.createElement(`div`);t.className=`flex flex-wrap gap-2`;let n=this.categories[this.selectedCategory1]||[];return n.forEach(e=>{let n=document.createElement(`button`);n.className=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${this.selectedCategory2===e?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}`,n.setAttribute(`data-category1`,this.selectedCategory1),n.setAttribute(`data-category2`,e),n.textContent=e,t.appendChild(n)}),e.appendChild(t),e}bindEvents(){if(!this.containerElement||this.containerElement._hasEventListener)return;let e=e=>{let t=e.target;if(t.hasAttribute(`data-breadcrumb`)){let e=t.getAttribute(`data-breadcrumb`);this.onBreadcrumbClick(e,t);return}if(t.classList.contains(`category1-filter-btn`)){let e=t.getAttribute(`data-category1`);this.onCategory1Click(e);return}if(t.classList.contains(`category2-filter-btn`)){let e=t.getAttribute(`data-category1`),n=t.getAttribute(`data-category2`);this.onCategory2Click(e,n);return}};this.containerElement.addEventListener(`click`,e),this.containerElement._hasEventListener=!0,this.containerElement._clickHandler=e}onBreadcrumbClick(e,t){e===`reset`?(this.selectedCategory1=null,this.selectedCategory2=null):e===`category1`&&(this.selectedCategory2=null),this.refresh();let n=new CustomEvent(`category-breadcrumb-click`,{detail:{type:e,category1:this.selectedCategory1,category2:this.selectedCategory2,element:t},bubbles:!0});this.containerElement.dispatchEvent(n)}onCategory1Click(e){let t=this.selectedCategory1,n=this.selectedCategory2;this.selectedCategory1===e?(this.selectedCategory1=null,this.selectedCategory2=null):(this.selectedCategory1=e,this.selectedCategory2=null),this.refresh();let r=new CustomEvent(`category1-change`,{detail:{category1:this.selectedCategory1,category2:this.selectedCategory2,previousCategory1:t,previousCategory2:n},bubbles:!0});this.containerElement.dispatchEvent(r)}onCategory2Click(e,t){let n=this.selectedCategory1,r=this.selectedCategory2;this.selectedCategory2===t?this.selectedCategory2=null:(this.selectedCategory1=e,this.selectedCategory2=t),this.refresh();let i=new CustomEvent(`category2-change`,{detail:{category1:this.selectedCategory1,category2:this.selectedCategory2,previousCategory1:n,previousCategory2:r},bubbles:!0});this.containerElement.dispatchEvent(i)}setCategory1(e){this.selectedCategory1=e,this.selectedCategory2=null,this.refresh()}setCategory2(e,t){this.selectedCategory1=e,this.selectedCategory2=t,this.refresh()}resetCategories(){this.selectedCategory1=null,this.selectedCategory2=null,this.refresh()}getCategoryState(){return{category1:this.selectedCategory1,category2:this.selectedCategory2}}setCategories(e){this.categories=e,this.refresh()}refresh(){if(this.containerElement&&this.containerElement.parentNode){this.containerElement.innerHTML=``;let e=document.createElement(`div`);for(e.className=this.containerElement.className,this.showBreadcrumb&&e.appendChild(this.renderBreadcrumb()),e.appendChild(this.render1DepthCategories()),this.selectedCategory1&&e.appendChild(this.render2DepthCategories());e.firstChild;)this.containerElement.appendChild(e.firstChild)}}mount(e=document.body){e.appendChild(this.render())}unmount(){this.containerElement&&this.containerElement.remove()}};function o(e,t={}){let n=document.getElementById(e);if(n){let e=new a(t);return n.appendChild(e.render()),n.addEventListener(`category-breadcrumb-click`,e=>{console.log(`Category breadcrumb clicked:`,e.detail)}),n.addEventListener(`category1-change`,e=>{console.log(`Category1 changed:`,e.detail)}),n.addEventListener(`category2-change`,e=>{console.log(`Category2 changed:`,e.detail)}),e}return null}var s=class{constructor(e={}){this.defaultValue=e.defaultValue||20,this.options=e.options||[10,20,50,100],this.label=e.label||`개수:`,this.id=e.id||`limit-select`,this.selectorElement=null}render(){return this.selectorElement=document.createElement(`div`),this.selectorElement.className=`flex items-center gap-2`,this.selectorElement.innerHTML=`
      <label class="text-sm text-gray-600">${this.label}</label>
      <select id="${this.id}"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        ${this.renderOptions()}
      </select>
    `,this.bindEvents(),this.selectorElement}renderOptions(){return this.options.map(e=>`
        <option value="${e}" ${e===this.defaultValue?`selected`:``}>
          ${e}개
        </option>
      `).join(``)}bindEvents(){let e=this.selectorElement.querySelector(`select`);e&&e.addEventListener(`change`,e=>{this.onValueChange(parseInt(e.target.value))})}onValueChange(e){let t=new CustomEvent(`items-per-page-change`,{detail:{value:e},bubbles:!0});this.selectorElement.dispatchEvent(t)}getValue(){var e;let t=(e=this.selectorElement)?.querySelector(`select`);return t?parseInt(t.value):this.defaultValue}setValue(e){var t;let n=(t=this.selectorElement)?.querySelector(`select`);n&&(n.value=e)}mount(e=document.body){e.appendChild(this.render())}unmount(){this.selectorElement&&this.selectorElement.remove()}},c=class{constructor(e={}){this.defaultValue=e.defaultValue||`price_asc`,this.options=e.options||[{value:`price_asc`,label:`가격 낮은순`},{value:`price_desc`,label:`가격 높은순`},{value:`name_asc`,label:`이름순`},{value:`name_desc`,label:`이름 역순`}],this.label=e.label||`정렬:`,this.id=e.id||`sort-select`,this.selectorElement=null}render(){return this.selectorElement=document.createElement(`div`),this.selectorElement.className=`flex items-center gap-2`,this.selectorElement.innerHTML=`
      <label class="text-sm text-gray-600">${this.label}</label>
      <select id="${this.id}"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        ${this.renderOptions()}
      </select>
    `,this.bindEvents(),this.selectorElement}renderOptions(){return this.options.map(e=>`
        <option value="${e.value}" ${e.value===this.defaultValue?`selected`:``}>
          ${e.label}
        </option>
      `).join(``)}bindEvents(){let e=this.selectorElement.querySelector(`select`);e&&e.addEventListener(`change`,e=>{this.onValueChange(e.target.value)})}onValueChange(e){let t=new CustomEvent(`sort-change`,{detail:{value:e},bubbles:!0});this.selectorElement.dispatchEvent(t)}getValue(){var e;let t=(e=this.selectorElement)?.querySelector(`select`);return t?t.value:this.defaultValue}setValue(e){var t;let n=(t=this.selectorElement)?.querySelector(`select`);n&&(n.value=e)}mount(e=document.body){e.appendChild(this.render())}unmount(){this.selectorElement&&this.selectorElement.remove()}},l=class{constructor(e={}){this.itemsPerPageOptions=e.itemsPerPageOptions||{defaultValue:20,options:[10,20,50,100]},this.sortOptions=e.sortOptions||{defaultValue:`price_asc`},this.layout=e.layout||`horizontal`,this.containerElement=null,this.itemsPerPageSelector=null,this.sortSelector=null}render(){return this.containerElement=document.createElement(`div`),this.containerElement.className=this.getContainerClasses(),this.itemsPerPageSelector=new s(this.itemsPerPageOptions),this.sortSelector=new c(this.sortOptions),this.containerElement.appendChild(this.itemsPerPageSelector.render()),this.containerElement.appendChild(this.sortSelector.render()),this.bindEvents(),this.containerElement}getContainerClasses(){let e=`flex items-center gap-2`,t={horizontal:`justify-between`,vertical:`flex-col items-start gap-3`};return`${e} ${t[this.layout]||t.horizontal}`}bindEvents(){this.containerElement&&(this.containerElement.addEventListener(`items-per-page-change`,e=>{this.onItemsPerPageChange(e.detail.value)}),this.containerElement.addEventListener(`sort-change`,e=>{this.onSortChange(e.detail.value)}))}onItemsPerPageChange(e){let t=new CustomEvent(`filter-items-per-page-change`,{detail:{value:e,filterType:`itemsPerPage`},bubbles:!0});this.containerElement.dispatchEvent(t)}onSortChange(e){let t=new CustomEvent(`filter-sort-change`,{detail:{value:e,filterType:`sort`},bubbles:!0});this.containerElement.dispatchEvent(t)}getItemsPerPage(){var e;return(e=this.itemsPerPageSelector)?.getValue()}getSortValue(){var e;return(e=this.sortSelector)?.getValue()}setItemsPerPage(e){var t;(t=this.itemsPerPageSelector)?.setValue(e)}setSortValue(e){var t;(t=this.sortSelector)?.setValue(e)}getFilterState(){return{itemsPerPage:this.getItemsPerPage(),sort:this.getSortValue()}}mount(e=document.body){e.appendChild(this.render())}unmount(){this.containerElement&&this.containerElement.remove()}};function u(e,t={}){let n=document.getElementById(e);if(n){let e=new l(t);return n.appendChild(e.render()),n.addEventListener(`filter-items-per-page-change`,e=>{console.log(`Items per page changed:`,e.detail.value)}),n.addEventListener(`filter-sort-change`,e=>{console.log(`Sort changed:`,e.detail.value)}),e}return null}var d=class{constructor(e={}){this.count=e.count||0,this.size=e.size||`md`,this.color=e.color||`default`,this.showCount=e.showCount!==!1,this.iconElement=null,this.countElement=null}render(){return this.iconElement=document.createElement(`button`),this.iconElement.id=`cart-icon-btn`,this.iconElement.className=this.getButtonClasses(),this.iconElement.innerHTML=`
      <svg class="${this.getSvgClasses()}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
      </svg>
      ${this.renderCountBadge()}
    `,this.countElement=this.iconElement.querySelector(`.cart-count`),this.bindEvents(),this.iconElement}getButtonClasses(){let e=`relative p-2 transition-colors`,t={default:`text-gray-700 hover:text-gray-900`,blue:`text-blue-600 hover:text-blue-800`,red:`text-red-600 hover:text-red-800`};return`${e} ${t[this.color]||t.default}`}getSvgClasses(){let e={sm:`w-5 h-5`,md:`w-6 h-6`,lg:`w-7 h-7`};return e[this.size]||e.md}renderCountBadge(){return!this.showCount||this.count<=0?``:`<span class="cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">${this.count}</span>`}bindEvents(){this.iconElement.addEventListener(`click`,()=>{this.onClick()})}onClick(){let e=new CustomEvent(`cart-click`,{detail:{count:this.count},bubbles:!0});this.iconElement.dispatchEvent(e)}updateCount(e){if(this.count=e,this.countElement&&(this.countElement.remove(),this.countElement=null),this.showCount&&this.count>0){let e=document.createElement(`span`);e.className=`cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium`,e.textContent=this.count,this.iconElement.appendChild(e),this.countElement=e}}mount(e=document.body){e.appendChild(this.render())}unmount(){this.iconElement&&this.iconElement.remove()}getCount(){return this.count}setShowCount(e){this.showCount=e,this.updateCount(this.count)}},f=class{constructor(e={}){this.title=e.title||`쇼핑몰`,this.homeLink=e.homeLink!==!1,this.cartIconOptions=e.cartIconOptions||{count:0},this.containerElement=null,this.cartIcon=null}render(){this.containerElement=document.createElement(`header`),this.containerElement.className=`bg-white shadow-sm sticky top-0 z-40`;let e=document.createElement(`div`);e.className=`max-w-md mx-auto px-4 py-4`;let t=document.createElement(`div`);t.className=`flex items-center justify-between`;let n=document.createElement(`h1`);if(n.className=`text-xl font-bold text-gray-900`,this.homeLink){let e=document.createElement(`a`);e.href=`/`,e.setAttribute(`data-link`,``),e.textContent=this.title,n.appendChild(e)}else n.textContent=this.title;let r=document.createElement(`div`);r.className=`flex items-center space-x-2`,r.id=`header-actions`;let i=document.createElement(`div`);return i.id=`cart-icon-container`,this.cartIcon=new d(this.cartIconOptions),i.appendChild(this.cartIcon.render()),r.appendChild(i),t.appendChild(n),t.appendChild(r),e.appendChild(t),this.containerElement.appendChild(e),this.bindEvents(),this.containerElement}bindEvents(){this.containerElement&&this.containerElement.addEventListener(`cart-click`,e=>{console.log(`Cart clicked from Header:`,e.detail)})}updateCartCount(e){this.cartIcon&&this.cartIcon.updateCount(e)}setCartCount(e){this.cartIconOptions.count=e,this.cartIcon&&this.cartIcon.updateCount(e)}getCartCount(){return this.cartIcon?this.cartIcon.getCount():this.cartIconOptions.count}setTitle(e){this.title=e,this.refresh()}refresh(){if(this.containerElement&&this.containerElement.parentNode){let e=this.containerElement.parentNode,t=this.render();e.replaceChild(t,this.containerElement)}}mount(e=document.body){e.appendChild(this.render())}unmount(){this.containerElement&&this.containerElement.remove()}};function p(e,t={}){let n=document.getElementById(e);if(n){let e=new f(t);return n.appendChild(e.render()),n.addEventListener(`cart-click`,e=>{console.log(`Cart clicked from mounted Header:`,e.detail)}),e}return null}const m=`
  <div class="aspect-square bg-gray-200"></div>
  <div class="p-3">
    <div class="h-4 bg-gray-200 rounded mb-2"></div>
    <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
    <div class="h-8 bg-gray-200 rounded"></div>
  </div>
`,h=`
  <div class="aspect-square bg-gray-100 flex items-center justify-center">
    <span class="text-gray-400 text-sm">상품 없음</span>
  </div>
  <div class="p-3">
    <div class="text-gray-500 text-sm">상품이 없습니다</div>
  </div>
`;function g(e,t){let{id:n,image:r,title:i,brand:a,price:o}=e;return`
    <a href="/product/${n}" data-link="" class="block">
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img src="${r}" alt="${i}"
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
             loading="lazy">
      </div>
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${i}</h3>
          ${a?`<p class="text-xs text-gray-500 mb-2">${a}</p>`:`<p class="text-xs text-gray-500 mb-2"></p>`}
          <p class="text-lg font-bold text-gray-900">${v(o)}</p>
        </div>
      </div>
    </a>
    ${t?`<div class="px-3 pb-3">${_(n)}</div>`:``}
  `}function _(e){return`
    <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
           hover:bg-blue-700 transition-colors add-to-cart-btn"
           data-product-id="${e}">
      장바구니 담기
    </button>
  `}function v(e){return typeof e==`number`?`${e.toLocaleString()}원`:e||``}var y=class{constructor(e={}){this.isLoading=e.isLoading||!1,this.product=e.product||null,this.size=e.size||`normal`,this.showAddButton=e.showAddButton!==!1,this.cardElement=null}render(){return this.cardElement=document.createElement(`div`),this.cardElement.className=this.getCardClasses(),this.isLoading?this.renderSkeleton():this.product?this.renderProduct():this.renderEmpty(),this.bindEvents(),this.cardElement}getCardClasses(){let e=`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden`,t=this.isLoading?`animate-pulse`:``,n=!this.isLoading&&this.product?`product-card`:``;return`${e} ${t} ${n}`.trim()}renderSkeleton(){this.cardElement.innerHTML=m}renderProduct(){this.cardElement.setAttribute(`data-product-id`,this.product.id),this.cardElement.innerHTML=g(this.product,this.showAddButton)}renderEmpty(){this.cardElement.innerHTML=h}bindEvents(){if(this.isLoading||!this.product)return;let e=this.cardElement.querySelector(`.add-to-cart-btn`);e&&e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),this.onAddToCart()})}onProductClick(){let e=new CustomEvent(`product-click`,{detail:{product:this.product},bubbles:!0});this.cardElement.dispatchEvent(e)}onAddToCart(){let e=new CustomEvent(`add-to-cart`,{detail:{product:this.product},bubbles:!0});this.cardElement.dispatchEvent(e)}setLoading(e){this.isLoading=e,this.cardElement.className=this.getCardClasses(),e?this.renderSkeleton():this.product?this.renderProduct():this.renderEmpty(),e||this.bindEvents()}updateProduct(e){this.product=e,this.isLoading||(this.renderProduct(),this.bindEvents())}mount(e=document.body){e.appendChild(this.render())}unmount(){this.cardElement&&this.cardElement.remove()}},b=class{constructor(e,t={}){this.containerId=e,this.container=document.getElementById(e),this.options={columns:2,gap:4,...t},this.gridElement=null}render(e=[]){return this.container?(this.setupGrid(),this.gridElement.innerHTML=``,e.forEach(e=>{let t=new y({isLoading:!1,product:e,showAddButton:!0});this.gridElement.appendChild(t.render())}),this.bindEvents(),this.gridElement):null}renderSkeleton(e=4){if(!this.container)return null;this.setupGrid(),this.gridElement.innerHTML=``;for(let t=0;t<e;t++){let e=new y({isLoading:!0});this.gridElement.appendChild(e.render())}return this.gridElement}renderEmpty(e=`상품이 없습니다`){return this.container?(this.setupGrid(),this.gridElement.innerHTML=`
      <div class="col-span-full text-center py-8">
        <div class="text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11L4 7"></path>
          </svg>
          <p class="text-lg font-medium text-gray-900 mb-2">${e}</p>
          <p class="text-sm text-gray-500">조건을 다시 설정해보세요.</p>
        </div>
      </div>
    `,this.gridElement):null}setupGrid(){this.gridElement||(this.gridElement=document.createElement(`div`),this.gridElement.className=this.getGridClasses(),this.container.appendChild(this.gridElement))}getGridClasses(){let e={1:`grid-cols-1`,2:`grid-cols-2`,3:`grid-cols-3`,4:`grid-cols-4`},t=`gap-${this.options.gap}`,n=e[this.options.columns]||`grid-cols-2`;return`grid ${n} ${t} mb-6`}bindEvents(){this.gridElement&&(this.gridElement.addEventListener(`product-click`,e=>{this.onProductClick(e.detail.product)}),this.gridElement.addEventListener(`add-to-cart`,e=>{this.onAddToCart(e.detail.product)}))}onProductClick(e){let t=new CustomEvent(`grid-product-click`,{detail:{product:e},bubbles:!0});this.container.dispatchEvent(t)}onAddToCart(e){let t=new CustomEvent(`grid-add-to-cart`,{detail:{product:e},bubbles:!0});this.container.dispatchEvent(t)}clear(){this.gridElement&&(this.gridElement.innerHTML=``)}destroy(){this.gridElement&&(this.gridElement.remove(),this.gridElement=null)}updateOptions(e){this.options={...this.options,...e},this.gridElement&&(this.gridElement.className=this.getGridClasses())}};function x(e,t={}){return new b(e,t)}var S=class{constructor(e=`상품명을 검색해보세요...`){this.placeholder=e,this.searchElement=null}render(){return this.searchElement=document.createElement(`div`),this.searchElement.className=`mb-4`,this.searchElement.innerHTML=`
      <div class="relative">
        <input type="text" id="search-input" placeholder="${this.placeholder}" value=""
               class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    `,this.bindEvents(),this.searchElement}bindEvents(){let e=this.searchElement.querySelector(`#search-input`);e.addEventListener(`keypress`,t=>{t.key===`Enter`&&this.onSearch(e.value)})}onSearch(e){let t=new CustomEvent(`search`,{detail:{query:e}});this.searchElement.dispatchEvent(t)}mount(e=document.body){e.appendChild(this.render())}unmount(){this.searchElement&&this.searchElement.remove()}getValue(){var e;let t=(e=this.searchElement)?.querySelector(`#search-input`);return t?t.value:``}setValue(e){var t;let n=(t=this.searchElement)?.querySelector(`#search-input`);n&&(n.value=e)}};function C(){let e=document.getElementById(`search-bar-container`);if(e){let t=new S;return e.appendChild(t.render()),t.searchElement.addEventListener(`search`,e=>{console.log(`Search query:`,e.detail.query)}),t}return null}var w=class{constructor(e={}){this.isLoading=e.isLoading||!1,this.cartCount=e.cartCount||0,this.categoryState=e.categoryState||`loading`,this.totalProducts=e.totalProducts||0,this.containerElement=null}render(){return this.containerElement=document.createElement(`div`),this.isLoading?this.renderLoading():this.renderLoaded(),this.containerElement}renderLoading(){this.containerElement.className=`min-h-screen bg-gray-50`,this.containerElement.innerHTML=`
      <div class="header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="loading"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loading"></div>

            <div class="text-center py-4">
              <div id="spinner-container"></div>
            </div>
          </div>
        </div>
      </main>
      ${n()}
    `}renderLoaded(){this.containerElement.className=`bg-gray-50`,this.containerElement.innerHTML=`
      <div class="header" data-cart-count="${this.cartCount}"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="${this.categoryState}"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 개수 정보 -->
            <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">${this.totalProducts}개</span>의 상품
            </div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loaded"></div>

            <div class="text-center py-4 text-sm text-gray-500">
              모든 상품을 확인했습니다
            </div>
          </div>
        </div>
      </main>
      ${n()}
    `}setLoading(e){this.isLoading=e,this.updateContent()}setCartCount(e){this.cartCount=e,this.updateHeaderCartCount()}setCategoryState(e){this.categoryState=e,this.updateCategoryFilter()}setTotalProducts(e){this.totalProducts=e,this.updateProductCount()}updateContent(){this.containerElement&&(this.isLoading?this.renderLoading():this.renderLoaded())}updateHeaderCartCount(){var e;let t=(e=this.containerElement)?.querySelector(`.header`);t&&t.setAttribute(`data-cart-count`,this.cartCount)}updateCategoryFilter(){var e;let t=(e=this.containerElement)?.querySelector(`.category-filter`);t&&t.setAttribute(`data-state`,this.categoryState)}updateProductCount(){var e;let t=(e=this.containerElement)?.querySelector(`.font-medium.text-gray-900`);t&&(t.textContent=`${this.totalProducts}개`)}mount(e=document.body){e.appendChild(this.render())}unmount(){this.containerElement&&this.containerElement.remove()}};function T(e,t={}){console.log(`mountProductListPage: called with containerId:`,e,`options:`,t);let n=document.getElementById(e);if(!n)return console.warn(`Container with id "${e}" not found`),null;console.log(`mountProductListPage: container found:`,n);try{let e=new w(t);return console.log(`mountProductListPage: ProductListPage created:`,e),e.mount(n),console.log(`mountProductListPage: page mounted`),setTimeout(()=>{console.log(`mountProductListPage: mounting child components`),E(t)},0),e}catch(e){return console.error(`Failed to mount ProductListPage:`,e),null}}function E(e){document.querySelectorAll(`.header`).forEach((t,n)=>{if(!t.id){let r=`header-${Date.now()}-${n}`;t.id=r;let i=parseInt(t.getAttribute(`data-cart-count`))||e.cartCount||0;p(r,{title:`쇼핑몰`,homeLink:!0,cartIconOptions:{count:i}})}});let t=document.getElementById(`search-bar-container`);if(t&&!t.hasChildNodes()&&C(),document.querySelectorAll(`.category-filter`).forEach((t,n)=>{if(!t.id){let r=`category-filter-${Date.now()}-${n}`;t.id=r;let i=t.getAttribute(`data-state`)||e.categoryState||`loaded`,a=t.getAttribute(`data-category1`),s=t.getAttribute(`data-category2`),c={categories:{"생활/건강":[`생활용품`,`주방용품`,`문구/사무용품`],"디지털/가전":[`스마트폰`,`노트북`,`가전제품`]},showBreadcrumb:!0};i===`loading`?c.categories={}:i===`category1-selected`?c.selectedCategory1=a:i===`category2-selected`&&(c.selectedCategory1=a,c.selectedCategory2=s),o(r,c)}}),document.querySelectorAll(`.filter-bar`).forEach((e,t)=>{if(!e.id){let n=`filter-bar-${Date.now()}-${t}`;e.id=n,u(n,{itemsPerPageOptions:{defaultValue:20,options:[10,20,50,100]},sortOptions:{defaultValue:`price_asc`},layout:`horizontal`})}}),e.isLoading){let e=document.getElementById(`products-grid-loading`);if(e&&!e.hasChildNodes()){let e=x(`products-grid-loading`);e.renderSkeleton(4)}}else{let e=document.getElementById(`products-grid-loaded`);if(e&&!e.hasChildNodes()){let e=x(`products-grid-loaded`),t=[{id:`85067212996`,image:`https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg`,title:`PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장`,brand:``,price:220},{id:`86940857379`,image:`https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg`,title:`샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이`,brand:`이지웨이건축자재`,price:230}];e.render(t)}}}const D=`modulepreload`,O=function(e){return`/hh-week4/`+e},k={},A=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},i=document.getElementsByTagName(`link`),a=document.querySelector(`meta[property=csp-nonce]`),o=a?.nonce||a?.getAttribute(`nonce`);r=e(t.map(e=>{if(e=O(e,n),e in k)return;k[e]=!0;let t=e.endsWith(`.css`),r=t?`[rel="stylesheet"]`:``,a=!!n;if(a)for(let n=i.length-1;n>=0;n--){let r=i[n];if(r.href===e&&(!t||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${e}"]${r}`))return;let s=document.createElement(`link`);if(s.rel=t?`stylesheet`:D,t||(s.as=`script`),s.crossOrigin=``,s.href=e,o&&s.setAttribute(`nonce`,o),document.head.appendChild(s),t)return new Promise((t,n)=>{s.addEventListener(`load`,t),s.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${e}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[]){if(e.status!==`rejected`)continue;i(e.reason)}return e().catch(i)})},j=()=>A(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]).then(({worker:e})=>e.start({serviceWorker:{url:`/hh-week4/mockServiceWorker.js`},onUnhandledRequest:`bypass`}));var M=class{constructor(){this.routes={},this.currentPage=null,this.initialized=!1,window.addEventListener(`popstate`,()=>{this.handleRoute()})}addRoute(e,t){this.routes[e]=t}start(){this.initialized||(this.initialized=!0,this.handleRoute())}navigate(e){window.history.pushState(null,null,e),this.handleRoute()}handleRoute(){let e=window.location.pathname,t=this.routes[e]||this.routes[`/404`];if(t){this.currentPage&&this.currentPage.unmount&&this.currentPage.unmount();let e=document.getElementById(`app`);if(e)e.innerHTML=``;else{console.error(`Router: app container not found`);return}this.currentPage=t()}else console.error(`Router: no handler found for path:`,e)}getCurrentPath(){return window.location.pathname}};function N(){console.log(`main: function started`),document.body.innerHTML=`
    <div id="app"></div>
  `;let e=new M;e.addRoute(`/`,()=>{let e=T(`app`,{isLoading:!1,cartCount:4,categoryState:`loaded`,totalProducts:340});return e}),e.addRoute(`/products`,()=>T(`app`,{isLoading:!1,cartCount:4,categoryState:`loaded`,totalProducts:340})),e.addRoute(`/product/:id`,()=>{let e=window.location.pathname.split(`/`)[2];return i(`app`,{isLoading:!1,cartCount:1,category1:`생활/건강`,category2:`생활용품`,productId:e||`85067212996`})}),e.addRoute(`/404`,()=>t(`app`)),e.start(),document.addEventListener(`click`,t=>{if(t.target.matches(`[data-link]`)){t.preventDefault();let n=t.target.getAttribute(`href`)||t.target.dataset.link;n&&e.navigate(n)}})}j().then(N);