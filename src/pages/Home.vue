<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
import { useRootStore } from '../stores/root';

const rootStore = useRootStore();
const productsList: any = ref([]);
const loading = ref(true);
const products = computed(() => rootStore.products);
const bestSellers = computed(() => {
  return [...productsList.value]
    .slice(0, 4);
});
const trending = computed(() => {
  return [...productsList.value].slice(3, 6);
});
const featured = computed(() => {
  return [...productsList.value].slice(-4);
});
const fetchData = async () => {
  if (products.value) {
    loading.value = true;
    Object.values(products.value).forEach((value: any) => {
      const newsItem: any = {
        id: value.id,
        title: value.title,
        price: value.price,
        description: value.description.slice(0, 150) + "...",
        category: value.category,
        image: value.image,
        rate: value.rating.rate,
        count: value.rating.count,
      };
      productsList.value.push(newsItem);
    });
    loading.value = false;
  } else {
    loading.value = false;
    throw new Error("No news data available");
  }
};
const startFetching = () => {
  fetchData();
};
onMounted(() => {
  startFetching();
});
watch(() => products.value, startFetching);
</script>

<template v-if="!loading">
  <AppHeader/>
  <main class="main">
    <section id="hero" class="hero section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="content-wrapper" data-aos="fade-up" data-aos-delay="100">
            <h1 class="hero-title">Discover Amazing Products</h1>
            <p class="hero-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Autem, eos! Quae, nulla sunt. Animi beatae laudantium, eaque assumenda, quibusdam odio!</p>
            <div class="hero-actions" data-aos="fade-up" data-aos-delay="100">
              <RouterLink :to="{ name: 'cart' }" class="btn-primary">
                Shop Now
              </RouterLink>
              <RouterLink :to="{ name: 'catalog' }" class="btn-secondary">
                Browse Categories
              </RouterLink>
            </div>
            <div class="features-list" data-aos="fade-up" data-aos-delay="100">
              <div class="feature-item">
                <i class="bi bi-truck"></i>
                <span>Free Shipping</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-award"></i>
                <span>Quality Guarantee</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-headset"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visuals">
          <div class="product-showcase" data-aos="fade-left" data-aos-delay="100">
            <div class="product-card featured">
              <img :src="rootStore.product14?.image" alt="Featured Product" class="img-fluid">
              <div class="product-badge">Best Seller</div>
              <div class="product-info">
                <h4>{{ rootStore.product14?.title }}</h4>
                <div class="price">
                  <span class="sale-price">${{ rootStore.product14?.price - 100 }}</span>
                  <span class="original-price">${{ rootStore.product14?.price }}</span>
                </div>
              </div>
            </div>
            <div class="product-grid">
              <div class="product-mini" data-aos="zoom-in" data-aos-delay="100">
                <img :src="rootStore.product1?.image" alt="Product" class="img-fluid">
                <span class="mini-price">${{ rootStore.product1?.price }}</span>
              </div>
              <div class="product-mini" data-aos="zoom-in" data-aos-delay="100">
                <img :src="rootStore.product5?.image" alt="Product" class="img-fluid">
                <span class="mini-price">${{ rootStore.product5.price }}</span>
              </div>
            </div>
          </div>
          <div class="floating-elements">
            <div class="floating-icon cart" data-aos="fade-up" data-aos-delay="600">
              <RouterLink :to="{ name: 'cart' }">
                <i class="bi bi-cart3"></i>
                <span class="notification-dot">{{ rootStore.countCartItems }}</span>
              </RouterLink>
            </div>
            <div class="floating-icon wishlist" data-aos="fade-up" data-aos-delay="700">
              <RouterLink :to="{ name: 'account', hash: '#wishlist' }">
                <i class="bi bi-heart"></i>
                <span class="notification-dot">{{ rootStore.countWish }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Hero Section -->
    <section id="promo-cards" class="promo-cards section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-6">
            <div class="category-featured" data-aos="fade-right" data-aos-delay="100">
              <div class="category-image">
                <img src="../assets/img/product/product-f-2.png" alt="Women's Collection" class="img-fluid">
              </div>
              <div class="category-content">
                <span class="category-tag">Trending Now</span>
                <h2>New Summer Collection</h2>
                <p>Discover our latest arrivals designed for the modern lifestyle. Elegant, comfortable, and sustainable
                  fashion for every occasion</p>
                <RouterLink :to="{ name: 'catalog' }" class="btn-shop">
                  Explore Collection
                  <i class="bi bi-arrow-right"></i>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row gy-4">
              <div class="col-xl-6">
                <div class="category-card cat-men" data-aos="fade-up" data-aos-delay="100">
                  <div class="category-image">
                    <img src="../assets/img/product/product-m-5.png" alt="Men's Fashion" class="img-fluid">
                  </div>
                  <div class="category-content">
                    <h4>Men's Wear</h4>
                    <RouterLink :to="{ name: 'catalog' }" class="card-link">
                      Shop Now <i class="bi bi-arrow-right"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="category-card cat-kids" data-aos="fade-up" data-aos-delay="100">
                  <div class="category-image">
                    <img src="../assets/img/product/product-8.png" alt="Kid's Fashion" class="img-fluid">
                  </div>
                  <div class="category-content">
                    <h4>Kid's Fashion</h4>
                    <RouterLink :to="{ name: 'catalog' }" class="card-link">
                      Shop Now <i class="bi bi-arrow-right"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="category-card cat-electronics" data-aos="fade-up" data-aos-delay="100">
                  <div class="category-image">
                    <img src="../assets/img/product/product-12.png" alt="Electronics" class="img-fluid">
                  </div>
                  <div class="category-content">
                    <h4>Electronics</h4>
                    <RouterLink :to="{ name: 'catalog' }" class="card-link">
                      Shop Now <i class="bi bi-arrow-right"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="category-card cat-jewelery" data-aos="fade-up" data-aos-delay="600">
                  <div class="category-image">
                    <img src="../assets/img/product/product-13.png" alt="Jewelery" class="img-fluid">
                  </div>
                  <div class="category-content">
                    <h4>Jewelery</h4>
                    <RouterLink :to="{ name: 'catalog' }" class="card-link">
                      Shop Now <i class="bi bi-arrow-right"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Promo Cards Section -->
    <section id="best-sellers" class="best-sellers section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Best Sellers</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row g-5">
          <div v-for="(product, index) in bestSellers" :key="product.id" class="col-lg-3 col-md-6">
            <div class="product-item">
              <div class="product-image">
                <div v-if="index==0" class="product-badge">Limited</div>
                <div v-if="index==1" class="product-badge sale-badge">25% Off</div>
                <div v-if="index==3" class="product-badge trending-badge">Trending</div>
                <img :src="product.image" alt="Product Image" class="img-fluid" loading="lazy">
                <div class="product-actions">
                  <button @click="rootStore.addToWish(product.id)" class="action-btn wishlist-btn">
                    <i class="bi bi-heart"></i>
                  </button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">{{ product.category }}</div>
                <h4 class="product-name">
                  <!-- <RouterLink :to="{ name: 'product' }"> -->
                                      <RouterLink :to="{ name: 'product', params: { id: product.id } }">

                    {{ product.title }}
                  </RouterLink>
                </h4>
                <div class="product-rating">
                  <div class="stars">
                    <i v-for="n in Math.round(product.rate)" :key="n" class="bi bi-star-fill"></i>
                    <i v-for="n in (5 - Math.round(product.rate))" :key="n" class="bi bi-star"></i>
                  </div>
                  <span class="rating-count">({{ product.count }})</span>
                </div>
                <div class="product-price">${{ product.price }}</div>
              </div>
            </div>
          </div>
          <!-- End Card Product -->
        </div>
      </div>
    </section>
    <!-- End Best Sellers Section -->
    <section id="cards" class="cards section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="100">
            <div class="product-category">
              <h3 class="category-title">
                <i class="bi bi-fire"></i> Trending Now
              </h3>
              <div class="product-list">
                <div v-for="(product, index) in trending" :key="product.id" class="product-card">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.title" class="img-fluid">
                    <div v-if="index==1" class="product-badges">
                      <span class="badge-new">New</span>
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">
                      <RouterLink :to="{ name: 'product', params: { id: product.id } }">
                        {{ product.title }}
                      </RouterLink>
                    </h4>
                    <div class="product-rating">
                      <i v-for="n in Math.round(product.rate)" :key="n" class="bi bi-star-fill"></i>
                      <i v-for="n in (5 - Math.round(product.rate))" :key="n" class="bi bi-star"></i>
                      <span>({{ product.count }})</span>
                    </div>
                    <div class="product-price">
                      <span class="current-price">${{ product.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Trending Now -->
          <div class="col-lg-4 col-md-6 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="100">
            <div class="product-category">
              <h3 class="category-title">
                <i class="bi bi-award"></i> Best Sellers
              </h3>
              <div class="product-list">
                <div v-for="(product, index) in bestSellers.slice(0, 3)" :key="product.id" class="product-card">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.title" class="img-fluid">
                    <div v-if="index==0" class="product-badges">
                      <span class="badge-sale">-15%</span>
                    </div>
                    <div v-if="index==2" class="product-badges">
                      <span class="badge-hot">Hot</span>
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">
                      <RouterLink :to="{ name: 'product', params: { id: product.id } }">
                        {{ product.title }}
                      </RouterLink>
                    </h4>
                    <div class="product-rating">
                      <i v-for="n in Math.round(product.rate)" :key="n" class="bi bi-star-fill"></i>
                      <i v-for="n in (5 - Math.round(product.rate))" :key="n" class="bi bi-star"></i>
                      <span>({{ product.count }})</span>
                    </div>
                    <div class="product-price">
                      <span class="current-price">${{ product.price }}</span>
                      <span v-if="index==0" class="old-price">${{ (product.price*1.2).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Best Sellers -->
          <div class="col-lg-4 col-md-6 mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="100">
            <div class="product-category">
              <h3 class="category-title">
                <i class="bi bi-star"></i> Featured Items
              </h3>
              <div class="product-list">
                <div v-for="(product, index) in featured.slice(-3)" :key="product.id" class="product-card">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.title" class="img-fluid">
                    <div class="product-badges">
                      <span v-if="index==1" class="badge-limited">Limited</span>
                    </div>
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">
                      <RouterLink :to="{ name: 'product', params: { id: product.id } }">
                        {{ product.title }}
                      </RouterLink>
                    </h4>
                    <div class="product-rating">
                      <i v-for="n in Math.round(product.rate)" :key="n" class="bi bi-star-fill"></i>
                      <i v-for="n in (5 - Math.round(product.rate))" :key="n" class="bi bi-star"></i>
                      <span>({{ product.count }})</span>
                    </div>
                    <div class="product-price">
                      <span class="current-price">${{ product.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Featured Items -->
        </div>
      </div>
    </section>
    <!-- End Cards Section -->
    <section id="call-to-action" class="call-to-action section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="main-content text-center" data-aos="zoom-in" data-aos-delay="100">
              <div class="offer-badge" data-aos="fade-down" data-aos-delay="250">
                <span class="limited-time">Limited Time</span>
                <span class="offer-text">50% OFF</span>
              </div>
              <h2 data-aos="fade-up" data-aos-delay="100">Exclusive Flash Sale</h2>
              <p class="subtitle" data-aos="fade-up" data-aos-delay="350">Don't miss out on our biggest sale of the
                year. Premium quality products at unbeatable prices for the next 48 hours only.</p>
              <div class="countdown-wrapper" data-aos="fade-up" data-aos-delay="100">
                <vue-countdown :time="2 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
                  <div class="countdown d-flex justify-content-center">
                    <div>
                      <h3 class="count-days">{{ days }}</h3>
                      <h4>Days</h4>
                    </div>
                    <div>
                      <h3 class="count-hours">{{ hours }}</h3>
                      <h4>Hours</h4>
                    </div>
                    <div>
                      <h3 class="count-minutes">{{ minutes }}</h3>
                      <h4>Minutes</h4>
                    </div>
                    <div>
                      <h3 class="count-seconds">{{ seconds }}</h3>
                      <h4>Seconds</h4>
                    </div>
                  </div>
                </vue-countdown>
              </div>
              <!-- End Countdown -->
              <div class="action-buttons" data-aos="fade-up" data-aos-delay="450">
                <RouterLink :to="{ name: 'catalog' }" class="btn-shop-now">
                  Shop Now
                </RouterLink>
                <RouterLink :to="{ name: 'home' }" class="btn-view-deals">
                  View All Deals
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="row featured-products-row" data-aos="fade-up" data-aos-delay="100">
          <div v-for="(product, index) in featured" :key="product.id" class="col-lg-3 col-md-6" data-aos="zoom-in"
            data-aos-delay="100">
            <div class="product-showcase">
              <div class="product-image">
                <img :src="product.image" :alt="product.title" class="img-fluid">
                <div v-if="index==0" class="discount-badge">-45%</div>
                <div v-if="index==1" class="discount-badge">-60%</div>
                <div v-if="index==2" class="discount-badge">-35%</div>
                <div v-if="index==3" class="discount-badge">-55%</div>
              </div>
              <div class="product-details">
                <h6>
                  <RouterLink :to="{ name: 'product', params: { id: product.id } }">
                    {{ product.title }}
                  </RouterLink>
                </h6>
                <div class="price-section">
                  <span class="original-price">${{ (product.price * 1.7).toFixed(2) }}</span>
                  <span class="sale-price">${{ product.price }}</span>
                </div>
                <div class="rating-stars">
                  <i v-for="n in Math.round(product.rate)" :key="n" class="bi bi-star-fill"></i>
                  <i v-for="n in (5 - Math.round(product.rate))" :key="n" class="bi bi-star"></i>
                  <span>({{ product.count }})</span>
                </div>
              </div>
            </div>
          </div>
          <!-- End Product Showcase -->
        </div>
      </div>
    </section>
    <!-- End Call To Action Section -->
  </main>
  <AppFooter />
</template>

<style scoped>
/** Hero Section */
.hero {
  padding-top: 100px;
  background: linear-gradient(135deg, var(--surface-color) 0%, color-mix(in srgb, var(--accent-color), transparent 95%) 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-bottom: 100px;
}
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(45deg, color-mix(in srgb, var(--accent-color), transparent 94%) 0%, color-mix(in srgb, var(--heading-color), transparent 98%) 100%);
  clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  z-index: -1;
}
.hero .hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}
@media (max-width: 992px) {
  .hero .hero-container {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}
.hero .hero-content {
  z-index: 2;
}
.hero .hero-content .content-wrapper {
  max-width: 600px;
}
.hero .hero-content .hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
}
@media (max-width: 768px) {
  .hero .hero-content .hero-title {
    font-size: 2.8rem;
  }
}
.hero .hero-content .hero-description {
  font-size: 1.2rem;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
  line-height: 1.7;
  margin-bottom: 40px;
}
@media (max-width: 768px) {
  .hero .hero-content .hero-description {
    font-size: 1.1rem;
  }
}
.hero .hero-content .hero-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}
.hero .hero-content .hero-actions .btn-primary,
.hero .hero-content .hero-actions .btn-secondary {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.hero .hero-content .hero-actions .btn-primary::before,
.hero .hero-content .hero-actions .btn-secondary::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}
.hero .hero-content .hero-actions .btn-primary:hover::before,
.hero .hero-content .hero-actions .btn-secondary:hover::before {
  left: 100%;
}
.hero .hero-content .hero-actions .btn-primary {
  background: linear-gradient(135deg, var(--accent-color) 0%, color-mix(in srgb, var(--accent-color), #000 20%) 100%);
  color: var(--contrast-color);
  border: none;
  box-shadow: 0 8px 25px color-mix(in srgb, var(--accent-color), transparent 70%);
}
.hero .hero-content .hero-actions .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px color-mix(in srgb, var(--accent-color), transparent 60%);
}
.hero .hero-content .hero-actions .btn-secondary {
  background: transparent;
  color: var(--heading-color);
  border: 2px solid color-mix(in srgb, var(--heading-color), transparent 80%);
}
.hero .hero-content .hero-actions .btn-secondary:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--contrast-color);
  transform: translateY(-3px);
}
.hero .hero-content .features-list {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.hero .hero-content .features-list .feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: color-mix(in srgb, var(--default-color), transparent 30%);
}
.hero .hero-content .features-list .feature-item i {
  font-size: 1.3rem;
  color: var(--accent-color);
}
.hero .hero-content .features-list .feature-item span {
  font-size: 0.95rem;
  font-weight: 500;
}
.hero .hero-visuals {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero .hero-visuals .product-showcase {
  position: relative;
  max-width: 500px;
}
.hero .hero-visuals .product-showcase .product-card {
  background: var(--surface-color);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 20px 60px color-mix(in srgb, var(--default-color), transparent 90%);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}
.hero .hero-visuals .product-showcase .product-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent-color), transparent 98%) 0%, transparent 50%);
  border-radius: 24px;
  z-index: -1;
}
.hero .hero-visuals .product-showcase .product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px color-mix(in srgb, var(--default-color), transparent 85%);
}
.hero .hero-visuals .product-showcase .product-card img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
}
.hero .hero-visuals .product-showcase .product-card .product-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, var(--accent-color) 0%, color-mix(in srgb, var(--accent-color), #000 20%) 100%);
  color: var(--contrast-color);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}
.hero .hero-visuals .product-showcase .product-card .product-info h4 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: var(--heading-color);
}
.hero .hero-visuals .product-showcase .product-card .product-info .price {
  display: flex;
  align-items: center;
  gap: 12px;
}
.hero .hero-visuals .product-showcase .product-card .product-info .price .sale-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
}
.hero .hero-visuals .product-showcase .product-card .product-info .price .original-price {
  font-size: 1.2rem;
  color: color-mix(in srgb, var(--default-color), transparent 50%);
  text-decoration: line-through;
}
.hero .hero-visuals .product-showcase .product-grid {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (max-width: 992px) {
  .hero .hero-visuals .product-showcase .product-grid {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
    transform: none;
  }
}
.hero .hero-visuals .product-showcase .product-grid .product-mini {
  width: 120px;
  height: 120px;
  background: var(--surface-color);
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 10px 30px color-mix(in srgb, var(--default-color), transparent 92%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
}
.hero .hero-visuals .product-showcase .product-grid .product-mini:hover {
  transform: scale(1.1);
}
.hero .hero-visuals .product-showcase .product-grid .product-mini img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
}
.hero .hero-visuals .product-showcase .product-grid .product-mini .mini-price {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-color);
}
.hero .hero-visuals .floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.hero .hero-visuals .floating-elements .floating-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--surface-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px color-mix(in srgb, var(--default-color), transparent 90%);
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}
.hero .hero-visuals .floating-elements .floating-icon i {
  font-size: 1.4rem;
  color: var(--accent-color);
}
.hero .hero-visuals .floating-elements .floating-icon .notification-dot {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}
.hero .hero-visuals .floating-elements .floating-icon.cart {
  top: 20%;
  left: -50px;
  animation-delay: 0s;
}
.hero .hero-visuals .floating-elements .floating-icon.search {
  top: 60%;
  right: -50px;
  animation-delay: 1s;
}
.hero .hero-visuals .floating-elements .floating-icon.wishlist {
  bottom: 20%;
  left: -30px;
  animation-delay: 2s;
}
.hero .hero-visuals .floating-elements .floating-icon:hover {
  transform: translateY(-5px);
}
@media (max-width: 992px) {
  .hero .hero-visuals .floating-elements .floating-icon {
    display: none;
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
@media (max-width: 768px) {
  .hero {
    padding: 80px 0;
  }
  .hero .hero-container {
    padding: 0 15px;
  }
  .hero .hero-content .hero-actions .btn-primary,
  .hero .hero-content .hero-actions .btn-secondary {
    padding: 14px 24px;
    font-size: 1rem;
  }
  .hero .hero-content .features-list {
    gap: 20px;
  }
  .hero .hero-content .features-list .feature-item span {
    font-size: 0.9rem;
  }
}
/** Promo Cards Section */
.promo-cards {
  padding-top: 24px;
  --default-color: #666;
  --heading-color: #333;
  padding-bottom: 30px;
}
.promo-cards .category-featured {
  position: relative;
  border-radius: 12px;
  min-height: 500px;
  overflow: hidden;
  background-color: #f8f5ff;
  transition: all 0.4s ease;
}
.promo-cards .category-featured:hover {
  transform: translateY(-5px);
}
.promo-cards .category-featured:hover .category-image img {
  transform: scale(1.05);
}
.promo-cards .category-featured:hover .btn-shop {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.promo-cards .category-featured:hover .btn-shop i {
  transform: translateX(5px);
}
.promo-cards .category-featured .category-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  z-index: 1;
}
.promo-cards .category-featured .category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s ease;
}
.promo-cards .category-featured .category-content {
  position: relative;
  z-index: 2;
  padding: 50px;
  max-width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.promo-cards .category-featured .category-content .category-tag {
  display: inline-block;
  background-color: color-mix(in srgb, var(--accent-color), transparent 85%);
  color: var(--accent-color);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.promo-cards .category-featured .category-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--heading-color);
}
.promo-cards .category-featured .category-content p {
  font-size: 1rem;
  margin-bottom: 30px;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
  line-height: 1.6;
}
.promo-cards .category-featured .category-content .btn-shop {
  display: inline-flex;
  align-items: center;
  background-color: var(--accent-color);
  color: var(--contrast-color);
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.promo-cards .category-featured .category-content .btn-shop i {
  margin-left: 8px;
  transition: transform 0.3s ease;
}
.promo-cards .category-card {
  position: relative;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
}
.promo-cards .category-card.cat-men {
  background-color: #e6f4ff;
}
.promo-cards .category-card.cat-kids {
  background-color: #fff4e6;
}
.promo-cards .category-card.cat-electronics {
  background-color: #ebe8e8;
}
.promo-cards .category-card.cat-jewelery {
  background-color: #e6ffe8;
}
.promo-cards .category-card:hover {
  transform: translateY(-5px);
}
.promo-cards .category-card:hover .category-image img {
  transform: scale(1.05);
}
.promo-cards .category-card:hover .card-link {
  color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.promo-cards .category-card:hover .card-link i {
  transform: translateX(5px);
}
.promo-cards .category-card .category-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
}
.promo-cards .category-card .category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.promo-cards .category-card .category-content {
  position: relative;
  z-index: 2;
  padding: 30px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.promo-cards .category-card .category-content h4 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--heading-color);
}
.promo-cards .category-card .category-content p {
  font-size: 0.9rem;
  margin-bottom: 20px;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
}
.promo-cards .category-card .category-content .card-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}
.promo-cards .category-card .category-content .card-link i {
  margin-left: 6px;
  transition: transform 0.3s ease;
}
@media (max-width: 991.98px) {
  .promo-cards .category-featured {
    height: 420px;
  }
  .promo-cards .category-featured .category-content {
    padding: 30px;
  }
  .promo-cards .category-featured .category-content h2 {
    font-size: 2rem;
  }
}
@media (max-width: 767.98px) {
  .promo-cards .category-featured {
    height: auto;
  }
  .promo-cards .category-featured .category-image {
    position: relative;
    width: 100%;
    height: 250px;
  }
  .promo-cards .category-featured .category-content {
    max-width: 100%;
    padding: 30px;
  }
  .promo-cards .category-featured .category-content h2 {
    font-size: 1.8rem;
  }
  .promo-cards .category-card {
    height: 200px;
  }
  .promo-cards .category-card .category-content {
    width: 65%;
    padding: 20px;
  }
  .promo-cards .category-card .category-content h4 {
    font-size: 1.2rem;
  }
}
@media (max-width: 575.98px) {
  .promo-cards .category-card {
    height: 180px;
  }
  .promo-cards .category-card .category-content {
    width: 70%;
  }
  .promo-cards .category-card .category-content h4 {
    font-size: 1.1rem;
  }
}
/** Best Sellers Section */
.best-sellers {
  padding-top: 60px;
  padding-bottom: 30px;
}
.best-sellers .product-item {
  height: 100%;
  background-color: var(--surface-color);
  border-radius: 2px;
  overflow: hidden;
  transition: all 0.4s ease;
}
.best-sellers .product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
}
.best-sellers .product-item:hover .product-image img {
  transform: scale(1.02);
}
.best-sellers .product-item:hover .product-actions {
  opacity: 1;
  transform: translateY(0);
}
.best-sellers .product-item:hover .cart-btn {
  opacity: 1;
  transform: translateY(0);
}
.best-sellers .product-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background-color: color-mix(in srgb, var(--default-color), transparent 96%);
}
.best-sellers .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.best-sellers .product-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background-color: var(--heading-color);
  color: var(--contrast-color);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--heading-font);
  padding: 0.4em 1em;
  border-radius: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.best-sellers .product-badge.sale-badge {
  background-color: #dc2626;
}
.best-sellers .product-badge.trending-badge {
  background-color: var(--accent-color);
}
.best-sellers .product-actions {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}
.best-sellers .action-btn {
  width: 40px;
  height: 40px;
  border: none;
  background-color: var(--contrast-color);
  color: var(--heading-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.best-sellers .action-btn:hover {
  background-color: var(--heading-color);
  color: var(--contrast-color);
}
.best-sellers .action-btn.active {
  background-color: var(--accent-color);
  color: var(--contrast-color);
}
.best-sellers .cart-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: var(--contrast-color);
  color: var(--heading-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  border-radius: 10px;
}
.best-sellers .cart-btn:hover {
  background-color: var(--heading-color);
  color: var(--contrast-color);
  border-color: var(--heading-color);
}
.best-sellers .product-info {
  padding: 30px 20px 25px;
}
.best-sellers .product-category {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.best-sellers .product-name {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 12px;
  height: 2.8rem;
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.best-sellers .product-name a {
  color: var(--heading-color);
}
.best-sellers .product-name a:hover {
  color: var(--accent-color);
}
.best-sellers .product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}
.best-sellers .stars {
  color: #f59e0b;
  font-size: 0.8rem;
}
.best-sellers .stars i {
  margin-right: 1px;
}
.best-sellers .rating-count {
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--default-color), transparent 50%);
  font-weight: 400;
}
.best-sellers .product-price {
  margin-bottom: 15px;
}
.best-sellers .product-price .old-price {
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--default-color), transparent 50%);
  text-decoration: line-through;
  margin-right: 8px;
}
.best-sellers .product-price .current-price {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--heading-color);
}
.best-sellers .product-price:not(:has(.old-price)) {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--heading-color);
}
.best-sellers .color-swatches {
  display: flex;
  gap: 6px;
}
.best-sellers .swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}
.best-sellers .swatch:hover {
  transform: scale(1.15);
}
.best-sellers .swatch.active:after {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 1px solid var(--heading-color);
  border-radius: 50%;
}
@media (max-width: 1199.98px) {
  .best-sellers .product-info {
    padding: 25px 18px 22px;
  }
  .best-sellers .product-name {
    font-size: 0.95rem;
  }
}
@media (max-width: 991.98px) {
  .best-sellers .product-item {
    max-width: 320px;
    margin: 0 auto;
  }
}
@media (max-width: 767.98px) {
  .best-sellers .row {
    --bs-gutter-x: 2rem;
    --bs-gutter-y: 3rem;
  }
  .best-sellers .product-actions {
    opacity: 1;
    transform: translateY(0);
  }
  .best-sellers .cart-btn {
    opacity: 1;
    transform: translateY(0);
  }
  .best-sellers .product-info {
    padding: 22px 16px 20px;
  }
}
@media (max-width: 575.98px) {
  .best-sellers .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 2.5rem;
  }
  .best-sellers .product-badge {
    top: 15px;
    left: 15px;
    font-size: 0.7rem;
    padding: 0.35em 0.8em;
  }
  .best-sellers .product-actions {
    top: 15px;
    right: 15px;
  }
  .best-sellers .action-btn {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }
  .best-sellers .cart-btn {
    bottom: 15px;
    left: 15px;
    right: 15px;
    padding: 10px 20px;
    font-size: 0.8rem;
  }
}
/** Call To Action Section */
.call-to-action {
  background: radial-gradient(ellipse at top, color-mix(in srgb, var(--accent-color), transparent 96%) 0%, var(--surface-color) 50%);
  position: relative;
  overflow: hidden;
}
.call-to-action::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--accent-color), transparent 98%) 90deg, transparent 180deg, color-mix(in srgb, var(--heading-color), transparent 98%) 270deg, transparent 360deg);
  animation: rotate 20s linear infinite;
  z-index: 1;
}
.call-to-action::after {
  content: "";
  position: absolute;
  top: 20%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent-color), transparent 90%) 0%, transparent 60%);
  border-radius: 50%;
  z-index: 1;
  animation: pulse 4s ease-in-out infinite;
}
.call-to-action .container {
  position: relative;
  z-index: 2;
}
.call-to-action .main-content {
  padding: 60px 0;
}
@media (max-width: 768px) {
  .call-to-action .main-content {
    padding: 40px 0;
  }
}
.call-to-action .offer-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, var(--accent-color), color-mix(in srgb, var(--accent-color), black 15%));
  padding: 12px 24px;
  border-radius: 50px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px color-mix(in srgb, var(--accent-color), transparent 70%);
  transform: rotate(-2deg);
}
.call-to-action .offer-badge .limited-time {
  font-size: 12px;
  font-weight: 600;
  color: color-mix(in srgb, var(--contrast-color), transparent 20%);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.call-to-action .offer-badge .offer-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--contrast-color);
  letter-spacing: 1px;
}
.call-to-action h2 {
  font-size: 3.5rem;
  font-weight: 800;
  font-family: var(--heading-font);
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, var(--heading-color), var(--accent-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (max-width: 992px) {
  .call-to-action h2 {
    font-size: 3rem;
  }
}
@media (max-width: 768px) {
  .call-to-action h2 {
    font-size: 2.5rem;
  }
}
@media (max-width: 576px) {
  .call-to-action h2 {
    font-size: 2rem;
  }
}
.call-to-action .subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: color-mix(in srgb, var(--default-color), transparent 30%);
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 768px) {
  .call-to-action .subtitle {
    font-size: 16px;
  }
}
.call-to-action .countdown-wrapper {
  margin-bottom: 48px;
}
.call-to-action .countdown-wrapper .countdown {
  gap: 24px;
}
@media (max-width: 576px) {
  .call-to-action .countdown-wrapper .countdown {
    gap: 16px;
  }
}
.call-to-action .countdown-wrapper .countdown>div {
  background: color-mix(in srgb, var(--surface-color), transparent 10%);
  backdrop-filter: blur(10px);
  border: 2px solid color-mix(in srgb, var(--accent-color), transparent 85%);
  border-radius: 16px;
  padding: 20px 16px;
  min-width: 80px;
}
@media (max-width: 576px) {
  .call-to-action .countdown-wrapper .countdown>div {
    padding: 16px 12px;
    min-width: 70px;
  }
}
.call-to-action .countdown-wrapper .countdown>div h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 8px;
  font-family: var(--heading-font);
}
@media (max-width: 576px) {
  .call-to-action .countdown-wrapper .countdown>div h3 {
    font-size: 2rem;
  }
}
.call-to-action .countdown-wrapper .countdown>div h4 {
  font-size: 12px;
  font-weight: 500;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}
.call-to-action .action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
}
@media (max-width: 576px) {
  .call-to-action .action-buttons {
    flex-direction: column;
    gap: 16px;
  }
}
.call-to-action .action-buttons .btn-shop-now {
  display: inline-block;
  padding: 16px 40px;
  background: var(--accent-color);
  color: var(--contrast-color);
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px color-mix(in srgb, var(--accent-color), transparent 60%);
}
.call-to-action .action-buttons .btn-shop-now::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, white, transparent);
  opacity: 0.3;
  transition: left 0.5s ease;
}
.call-to-action .action-buttons .btn-shop-now:hover {
  background: color-mix(in srgb, var(--accent-color), black 10%);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px color-mix(in srgb, var(--accent-color), transparent 50%);
}
.call-to-action .action-buttons .btn-shop-now:hover::before {
  left: 100%;
}
@media (max-width: 576px) {
  .call-to-action .action-buttons .btn-shop-now {
    width: 100%;
    max-width: 280px;
  }
}
.call-to-action .action-buttons .btn-view-deals {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: transparent;
  color: var(--heading-color);
  text-decoration: none;
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 80%);
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
}
.call-to-action .action-buttons .btn-view-deals:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}
.call-to-action .action-buttons .btn-view-deals:hover::after {
  transform: translateX(4px);
}
@media (max-width: 576px) {
  .call-to-action .action-buttons .btn-view-deals {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
.call-to-action .featured-products-row {
  margin-top: 60px;
}
@media (max-width: 768px) {
  .call-to-action .featured-products-row {
    margin-top: 40px;
  }
}
.call-to-action .product-showcase {
  background: var(--surface-color);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 10px 40px color-mix(in srgb, var(--default-color), transparent 92%);
  transition: all 0.3s ease;
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 95%);
  height: 100%;
}
.call-to-action .product-showcase:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px color-mix(in srgb, var(--default-color), transparent 85%);
}
.call-to-action .product-showcase .product-image {
  position: relative;
  margin-bottom: 16px;
}
.call-to-action .product-showcase .product-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}
@media (max-width: 768px) {
  .call-to-action .product-showcase .product-image img {
    height: 150px;
  }
}
.call-to-action .product-showcase .product-image .discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #dc3545;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.call-to-action .product-showcase .product-details h6 {
  font-size: 16px;
  font-weight: 600;
  color: var(--heading-color);
  margin-bottom: 12px;
  line-height: 1.3;
}
.call-to-action .product-showcase .product-details .price-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.call-to-action .product-showcase .product-details .price-section .original-price {
  font-size: 14px;
  color: color-mix(in srgb, var(--default-color), transparent 50%);
  text-decoration: line-through;
}
.call-to-action .product-showcase .product-details .price-section .sale-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-color);
}
.call-to-action .product-showcase .product-details .rating-stars {
  display: flex;
  align-items: center;
  gap: 4px;
}
.call-to-action .product-showcase .product-details .rating-stars i {
  color: #ffc107;
  font-size: 14px;
}
.call-to-action .product-showcase .product-details .rating-stars .rating-count {
  font-size: 12px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  margin-left: 8px;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
}
</style>
