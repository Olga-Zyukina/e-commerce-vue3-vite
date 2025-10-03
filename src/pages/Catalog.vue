<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
import { useRootStore } from '../stores/root';

const rootStore = useRootStore();
const products = computed(() => rootStore.products);
const filteredList: any = ref([]);
const selectedCategory: any = ref(rootStore.categories);
const sliderMinValue = ref(0);
const sliderMaxValue = ref(1000);
const searchValue = ref("");
const selectedSort = ref(1);
const optionsSort = ref([
  { text: 'Featured', value: 1 },
  { text: 'Price: Low to High', value: 2 },
  { text: 'Price: High to Low', value: 3 },
  { text: 'Rating', value: 4 }
]);
const selectedPerPage = ref(12);
const optionsPerPage = computed(() =>[
  { text: '12 per page', value: 12 },
  { text: 'All', value: filteredList.value.length },
]);
const currentPage = ref(1);
const pageCount = computed(() =>
  Math.ceil(filteredList.value.length / selectedPerPage.value)
);
const pages = computed(() => {
  return Array.from({ length: pageCount.value }, (_, i) => i + 1);
});
const displayedItems = computed(() => {
  const startIndex: number = (currentPage.value - 1) * selectedPerPage.value;
  const endIndex = startIndex + selectedPerPage.value;
  return filteredList.value.slice(startIndex, endIndex);
});
const changePage = (pageNumber: number) => {
  if (selectedPerPage.value == filteredList.value.length) {
    currentPage.value = 1;
  } else {
    currentPage.value = pageNumber;
  }
}
const filter = () => {
  filteredList.value = products.value.filter((item: { category: any; price: number; title: any} ) => 
    (item.category == selectedCategory.value.find((i: any) => 
      i == item.category)
    ) 
    &&
    (item.price <= sliderMaxValue.value && item.price >= sliderMinValue.value)
    &&
    (item.title.toUpperCase().includes(searchValue.value.toUpperCase()))
  );
  switch (selectedSort.value) {
    case 1:
      filteredList.value.sort(
        (a: { rating: { count: any; }; }, b: { rating: { count: any; }; }) =>
          (b.rating.count || 0) -
          (a.rating.count || 0)
      )
      break;
    case 3:
      filteredList.value.sort(
        (a: { price: any; }, b: { price: any; }) =>
          (b.price || 0) -
          (a.price || 0)
      )
      break;
    case 2:
      filteredList.value.sort(
        (a: { price: any; }, b: { price: any; }) =>
          (a.price || 0) -
          (b.price || 0)
      )
      break;
    case 4:
      filteredList.value.sort(
        (a: { rating: { rate: any; }; }, b: { rating: { rate: any; }; }) =>
          (b.rating.rate || 0) -
          (a.rating.rate || 0)
      )
      break;
    default:
      filteredList.value.sort(
        (a: { rating: { count: any; }; }, b: { rating: { count: any; }; }) =>
          (b.rating.count || 0) -
          (a.rating.count || 0)
      )
      break;
  };
}
const updateSliderProgress = () => {
  const sliderProgress = document.querySelector<HTMLElement>('.slider-progress');
  const minPercent = ((0 + sliderMinValue.value) / 1000) * 100;
  const maxPercent = ((sliderMaxValue.value) / 1000) * 100;
  if (sliderProgress) {
    sliderProgress.style.left = `${minPercent}%`;
    sliderProgress.style.width = `${maxPercent - minPercent}%`;
  }
}
watch(() => [sliderMinValue.value, sliderMaxValue.value], updateSliderProgress);
watch(currentPage, () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});
onMounted(() => {
  filter();
  updateSliderProgress();
});
</script>

<template>
  <AppHeader />

  <main class="main">
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Catalog</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">Catalog</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 sidebar">
          <div class="widgets-container">
            <div class="category-filter-widget widget-item">
              <h3 class="widget-title">Filter by Category</h3>
              <div class="category-filter-content">
                <div class="category-filter-list">
                  <div v-for="category in rootStore.categories" :key="rootStore.categories"
                    class="category-filter-item">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :id="category" v-bind:value="category"
                        v-model="selectedCategory" @change="filter">
                      <label class="form-check-label" :for="category">
                        {{ category }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--End Product Categories Widget -->
            <div class="pricing-range-widget widget-item">
              <h3 class="widget-title">Price Range</h3>
              <div class="price-range-container">
                <div class="current-range mb-3">
                  <span class="min-price">${{ sliderMinValue }}</span>
                  <span class="max-price float-end">${{ sliderMaxValue }}</span>
                </div>
                <div class="range-slider">
                  <div class="slider-track"></div>
                  <div class="slider-progress"></div>
                  <input v-model="sliderMinValue" @change="filter" type="range" class="min-range" min="0" max="1000"
                    value="0" step="10">
                  <input v-model="sliderMaxValue" @change="filter" type="range" class="max-range" min="0" max="1000"
                    value="1000" step="10">
                </div>
                <div class="price-inputs mt-3">
                  <div class="row g-2">
                    <div class="col-6">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">$</span>
                        <input v-model="sliderMinValue" @change="filter" type="number"
                          class="form-control min-price-input" placeholder="Min" min="0" max="1000" value="0" step="10">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">$</span>
                        <input v-model="sliderMaxValue" @change="filter" type="number"
                          class="form-control max-price-input" placeholder="Max" min="0" max="1000" value="1000"
                          step="10">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--End Pricing Range Widget -->
          </div>
        </div>
        <div class="col-lg-8">
          <section id="category-header" class="category-header section">
            <div class="container" data-aos="fade-up">
              <div class="filter-container mb-4" data-aos="fade-up" data-aos-delay="100">
                <div class="row g-3">
                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="filter-item search-form">
                      <label for="productSearch" class="form-label">Search Products</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="productSearch" v-model="searchValue"
                          @keyup="filter()" placeholder="Search for products..." aria-label="Search for products">
                        <button class="btn search-btn" type="button" @click="filter()">
                          <i class="bi bi-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- End Page Search -->
                  <div class="col-12 col-md-6 col-lg-2">
                    <div class="filter-item">
                      <label for="sortBy" class="form-label">Sort By</label>
                      <select v-model="selectedSort" @change="filter()" class="form-select">
                        <option v-for="option in optionsSort" :value="option.value" class="form-select">
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <!-- End Sort -->
                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="filter-item">
                      <label class="form-label">View</label>
                      <div class="d-flex align-items-center">
                        <div class="items-per-page">
                          <select v-model="selectedPerPage" @change="changePage(currentPage)" class="form-select">
                            <option v-for="option in optionsPerPage" :value="option.value">
                              {{ option.text }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End Filter Items Per Page -->
                </div>
                <!-- End Search, Sort & Filter Items -->
                <div class="row mt-3">
                  <div class="col-12" data-aos="fade-up" data-aos-delay="200">
                    <div class="active-filters">
                      <span class="active-filter-label">Active Filters:</span>
                      <div class="filter-tags">
                        <span v-for="category in selectedCategory" :key="category" class="filter-tag">
                          {{ category }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!--End Selected Categories Info -->
              </div>
            </div>
          </section>
          <!-- End Filter and Sort Options Section -->
          <section id="category-product-list" class="category-product-list section">
            <div class="container" data-aos="fade-up" data-aos-delay="100">
              <div class="row g-4">
                <div v-for="(product, index) in displayedItems" :key="index" class="col-6 col-xl-4">
                  <div class="product-card" data-aos="zoom-in" data-aos-delay="200">
                    <div class="product-image">
                      <img :src="product.image" :alt="product.title" class="main-image img-fluid">
                      <div class="product-overlay">
                        <div class="product-actions">
                          <button type="button" @click="rootStore.addToCart(product.id)" class="action-btn" data-bs-toggle="tooltip" title="Add to Cart">
                            <i class="bi bi-cart-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="product-details">
                      <div class="product-category">{{ product.category }}</div>
                      <h4 class="product-title">
                        <RouterLink :to="{ name: 'product', params: { id: product.id } }">
                          {{ product.title }}
                        </RouterLink>
                      </h4>
                      <div class="product-meta">
                        <div class="product-price">
                          ${{ product.price }}
                        </div>
                        <div class="product-rating">
                          <i class="bi bi-star-fill"></i>
                          {{ product.rating.rate }} <span>({{ product.rating.count }})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- End Category Product List Section -->
          <section id="category-pagination" class="category-pagination section">
            <div class="container">
              <nav class="d-flex justify-content-center" aria-label="Page navigation">
                <ul>
                  <li v-for="page in pages" :key="page">
                    <a :class="[{ active: page === currentPage }]" @click="changePage(page)">
                      {{ page }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
          <!-- End Category Pagination Section -->
        </div>
      </div>
    </div>
    <!-- End Page Content -->
  </main>

  <AppFooter />
</template>

<style scoped>
/** Category Header Section */
.category-header {
  padding-bottom: 0;
}
.category-header .filter-container {
  background-color: var(--surface-color);
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}
.category-header .filter-container .filter-item {
  margin-bottom: 0.75rem;
}
.category-header .filter-container .filter-item .form-label {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: var(--heading-color);
  letter-spacing: 0.01em;
}
.category-header .filter-container .filter-item.search-form .input-group {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}
.category-header .filter-container .filter-item.search-form .input-group .form-control {
  border-right: none;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  height: 44px;
  color: var(--default-color);
  background-color: var(--surface-color);
  border-color: color-mix(in srgb, var(--default-color), transparent 85%);
  border-radius: 8px 0 0 8px;
}
.category-header .filter-container .filter-item.search-form .input-group .form-control:focus {
  border-color: var(--accent-color);
  box-shadow: none;
}
.category-header .filter-container .filter-item.search-form .input-group .form-control::placeholder {
  color: color-mix(in srgb, var(--default-color), transparent 60%);
  font-size: 0.9rem;
}
.category-header .filter-container .filter-item.search-form .input-group .search-btn {
  background-color: var(--accent-color);
  color: var(--contrast-color);
  border: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}
.category-header .filter-container .filter-item.search-form .input-group .search-btn:hover {
  background-color: color-mix(in srgb, var(--accent-color), var(--heading-color) 15%);
}
.category-header .filter-container .filter-item.search-form .input-group .search-btn i {
  font-size: 1rem;
}
.category-header .filter-container .filter-item .form-select {
  color: var(--default-color);
  background-color: var(--surface-color);
  font-size: 0.95rem;
  border-color: color-mix(in srgb, var(--default-color), transparent 85%);
  padding: 0.625rem 2.25rem 0.625rem 1rem;
  height: 46px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%233690e7' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.category-header .filter-container .filter-item .form-select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--accent-color), transparent 85%);
}
.category-header .filter-container .filter-item .form-select.form-select-sm {
  height: 38px;
  font-size: 0.85rem;
  padding: 0.4rem 2rem 0.4rem 0.75rem;
}
.category-header .filter-container .filter-item .view-options {
  display: flex;
  gap: 0.5rem;
}
.category-header .filter-container .filter-item .view-options .view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background-color: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 85%);
  color: var(--default-color);
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}
.category-header .filter-container .filter-item .view-options .view-btn:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 90%);
  border-color: var(--accent-color);
  color: var(--accent-color);
}
.category-header .filter-container .filter-item .view-options .view-btn.active {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--contrast-color);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-color), transparent 60%);
}
.category-header .filter-container .filter-item .view-options .view-btn i {
  font-size: 1.1rem;
}
.category-header .filter-container .filter-item .items-per-page {
  min-width: 110px;
}
.category-header .filter-container .active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
}
.category-header .filter-container .active-filters .active-filter-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--heading-color);
  letter-spacing: 0.01em;
}
.category-header .filter-container .active-filters .filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}
.category-header .filter-container .active-filters .filter-tag {
  display: inline-flex;
  align-items: center;
  background-color: color-mix(in srgb, var(--accent-color), transparent 90%);
  color: var(--accent-color);
  font-size: 0.875rem;
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  font-weight: 500;
}
.category-header .filter-container .active-filters .filter-tag .filter-remove {
  background: none;
  border: none;
  color: var(--accent-color);
  margin-left: 0.35rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.category-header .filter-container .active-filters .filter-tag .filter-remove:hover {
  color: color-mix(in srgb, var(--accent-color), var(--heading-color) 30%);
  background-color: color-mix(in srgb, var(--accent-color), transparent 80%);
  transform: scale(1.1);
}
.category-header .filter-container .active-filters .clear-all-btn {
  background: none;
  border: 1px solid color-mix(in srgb, var(--accent-color), transparent 70%);
  color: var(--accent-color);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;
  border-radius: 50px;
}
.category-header .filter-container .active-filters .clear-all-btn:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 90%);
  color: color-mix(in srgb, var(--accent-color), var(--heading-color) 15%);
  border-color: var(--accent-color);
}
@media (max-width: 767.98px) {
  .category-header .filter-container {
    padding: 1rem;
  }
  .category-header .filter-container .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }
  .category-header .filter-container .active-filters .filter-tags {
    width: 100%;
  }
  .category-header .filter-container .active-filters .clear-all-btn {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
/** Category Product List Section */
.category-product-list {
  padding-top: 30px;
  padding-bottom: 60px;
}
.category-product-list .product-card {
  position: relative;
  background: var(--surface-color);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.category-product-list .product-card:hover {
  transform: translateY(-4px);
}
.category-product-list .product-card:hover .product-overlay {
  opacity: 1;
  visibility: visible;
}
.category-product-list .product-image {
  position: relative;
  padding-top: 125%;
  background: color-mix(in srgb, var(--surface-color), transparent 97%);
  overflow: hidden;
}
.category-product-list .product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  object-fit: contain;
}
.category-product-list .product-image .main-image {
  transform: scale(1);
  opacity: 1;
}
.category-product-list .product-image .hover-image {
  transform: scale(1.1);
  opacity: 0;
}
.category-product-list .product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: color-mix(in srgb, var(--background-color), transparent 75%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.category-product-list .product-actions {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.category-product-list .product-actions .action-btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--surface-color);
  border: none;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  transform: translateX(20px);
  animation: slideIn 0.3s ease forwards;
  opacity: 0;
}
.category-product-list .product-actions .action-btn:nth-child(2) {
  animation-delay: 0.1s;
}
.category-product-list .product-actions .action-btn:hover {
  background: var(--accent-color);
  color: var(--contrast-color);
  transform: translateY(-2px);
}
.category-product-list .product-actions .action-btn i {
  font-size: 1.25rem;
}
.category-product-list .product-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  z-index: 1;
}
.category-product-list .product-badge.new {
  background: var(--accent-color);
  color: var(--contrast-color);
}
.category-product-list .product-badge.sale {
  background: #ffa007;
  color: var(--contrast-color);
}
.category-product-list .product-details {
  padding: 1.5rem;
  background: var(--surface-color);
}
.category-product-list .product-category {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  margin-bottom: 0.5rem;
}
.category-product-list .product-title {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}
.category-product-list .product-title a {
  color: var(--heading-color);
  text-decoration: none;
  transition: color 0.3s ease;
}
.category-product-list .product-title a:hover {
  color: var(--accent-color);
}
.category-product-list .product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category-product-list .product-price {
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--accent-color);
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.category-product-list .product-price .original-price {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  text-decoration: line-through;
  font-weight: normal;
}
.category-product-list .product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--heading-color);
  font-weight: 500;
}
.category-product-list .product-rating i {
  color: #ffc107;
  margin-right: 0.25rem;
}
.category-product-list .product-rating span {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  font-size: 0.875rem;
  font-weight: normal;
}
@keyframes slideIn {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 991.98px) {
  .category-product-list .product-image {
    padding-top: 100%;
  }
  .category-product-list .product-details {
    padding: 1.25rem;
  }
  .category-product-list .product-title {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  .category-product-list .product-price {
    font-size: 1rem;
  }
  .category-product-list .product-actions .action-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
  .category-product-list .product-actions .action-btn i {
    font-size: 1.125rem;
  }
}
/** Category Pagination Section */
.category-pagination {
  padding-top: 0;
}
.category-pagination nav {
  position: relative;
}
.category-pagination ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.category-pagination li {
  margin: 0;
  transition: all 0.3s ease-in-out;
}
.category-pagination li.ellipsis {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  padding: 8px 16px;
  user-select: none;
}
.category-pagination li a {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 8px 16px;
  color: var(--default-color);
  background-color: var(--surface-color);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 4px color-mix(in srgb, var(--default-color), transparent 90%);
  cursor: pointer;
}
.category-pagination li a.active {
  background-color: var(--accent-color);
  color: var(--contrast-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px color-mix(in srgb, var(--accent-color), transparent 70%);
}
.category-pagination li a:hover:not(.active) {
  background-color: color-mix(in srgb, var(--accent-color), transparent 90%);
  transform: translateY(-1px);
  box-shadow: 0 3px 6px color-mix(in srgb, var(--default-color), transparent 85%);
}
.category-pagination li a i {
  font-size: 14px;
}
.category-pagination li a span {
  margin: 0 4px;
}
@media (max-width: 575px) {
  .category-pagination ul {
    gap: 4px;
  }
  .category-pagination li a {
    min-width: 36px;
    height: 36px;
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>