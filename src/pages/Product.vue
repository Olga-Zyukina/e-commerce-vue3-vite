<script setup lang="ts">
import { computed, ref } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
import { useRootStore } from '../stores/root';

const rootStore = useRootStore();

const $props=defineProps(["id"]);
const productId: any = ref($props.id);
const product: any = ref([])
const products = computed(() => rootStore.products);
const quantity = ref(1);

product.value = products.value.find(({ id }: { id: number }) => id == productId.value);

const increase = () => {
  quantity.value += 1;
}
const decrease = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
}
</script>

<template>
  <AppHeader />

  <main class="main">
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Product Details</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">Product Details</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <section id="product-details" class="product-details section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row g-4">
          <div class="col-lg-7" data-aos="zoom-in" data-aos-delay="150">
            <div class="product-gallery">
              <div class="main-showcase">
                <div class="image-zoom-container">
                  <img :src="'../' + product.image" :alt="product.title" class="img-fluid main-product-image drift-zoom"
                    :data-zoom="'../' + product.image">
                  <div class="image-navigation">
                    <button class="nav-arrow prev-image image-nav-btn prev-image" type="button">
                      <i class="bi bi-chevron-left"></i>
                    </button>
                    <button class="nav-arrow next-image image-nav-btn next-image" type="button">
                      <i class="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="thumbnail-grid">
                <div v-for="n in 5" :key="n" class="thumbnail-wrapper thumbnail-item active" >
                  <img :src="'../' + product.image" :alt="product.title" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
          <!-- End Product Gallery -->
          <div class="col-lg-5" data-aos="fade-left" data-aos-delay="200">
            <div class="product-details">
              <div class="product-badge-container">
                <span class="badge-category">{{ product.category }}</span>
                <div class="rating-group">
                  <div class="stars">
                    <i v-for="n in Math.round(product.rating.rate)" :key="n" class="bi bi-star-fill"></i>
                    <i v-for="n in (5 - Math.round(product.rating.rate))" :key="n" class="bi bi-star"></i>
                  </div>
                  <span class="review-text">({{ product.rating.count }} reviews)</span>
                </div>
              </div>
              <h1 class="product-name">{{ product.title }}</h1>
              <div class="pricing-section">
                <div class="price-display">
                  <span class="sale-price">{{ product.price }}</span>
                  <span class="regular-price">{{ (product.price * 1.20).toFixed(2) }}</span>
                </div>
                <div class="savings-info">
                  <span class="save-amount">Save ${{ (product.price * 0.20).toFixed(2) }}</span>
                  <span class="discount-percent">(20% off)</span>
                </div>
              </div>
              <div class="product-description">
                <p>{{ product.description }}</p>
              </div>
              <div class="availability-status">
                <div class="stock-indicator">
                  <i class="bi bi-check-circle-fill"></i>
                  <span class="stock-text">Available</span>
                </div>
              </div>
              <div class="purchase-section">
                <div class="quantity-control">
                  <label class="control-label">Quantity:</label>
                  <div class="quantity-input-group">
                    <div class="quantity-selector">
                      <button @click="decrease()" class="quantity-btn decrease" type="button">
                        <i class="bi bi-dash"></i>
                      </button>
                      <input type="number" v-model="quantity" class="quantity-input" value="1" min="1">
                      <button @click="increase()" class="quantity-btn increase" type="button">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="action-buttons">
                  <button @click="rootStore.addToCart(product.id, quantity)" class="btn primary-action">
                    <i class="bi bi-bag-plus"></i>
                    Add to Cart
                  </button>
                  <button @click="rootStore.addToCart(product.id, quantity)" class="btn secondary-action">
                    <RouterLink :to="{ name: 'cart' }">
                      <i class="bi bi-lightning"></i>
                      Buy Now
                    </RouterLink>
                  </button>
                  <button @click="rootStore.addToWish(product.id)" class="btn icon-action" title="Add to Wishlist">
                    <i class="bi bi-heart"></i>
                  </button>
                </div>
              </div>
              <!-- End Purchase Options -->
              <div class="benefits-list">
                <div class="benefit-item">
                  <i class="bi bi-truck"></i>
                  <span>Free delivery on orders over $75</span>
                </div>
                <div class="benefit-item">
                  <i class="bi bi-arrow-clockwise"></i>
                  <span>45-day hassle-free returns</span>
                </div>
                <div class="benefit-item">
                  <i class="bi bi-shield-check"></i>
                  <span>3-year manufacturer warranty</span>
                </div>
                <div class="benefit-item">
                  <i class="bi bi-headset"></i>
                  <span>24/7 customer support available</span>
                </div>
              </div>
              <!-- End Benefits List -->
            </div>
          </div>
          <!-- End Product Details -->
        </div>
        <div class="row mt-5" data-aos="fade-up" data-aos-delay="300">
          <div class="col-12">
            <div class="info-tabs-container">
              <nav class="tabs-navigation nav">
                <button class="nav-link active" data-bs-toggle="tab"
                  data-bs-target="#ecommerce-product-details-5-overview" type="button">Overview</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#ecommerce-product-details-5-technical"
                  type="button">Technical Details</button>
                <button class="nav-link" data-bs-toggle="tab"
                  data-bs-target="#ecommerce-product-details-5-customer-reviews" type="button">Reviews ({{
                  product.rating.count }})</button>
              </nav>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="ecommerce-product-details-5-overview">
                  <div class="overview-content">
                    <div class="row g-4">
                      <div class="col-lg-8">
                        <div class="content-section">
                          <h3>Product Overview</h3>
                          <p>{{ product.description }}</p>
                          <h4>Key Highlights</h4>
                          <div class="highlights-grid">
                            <div class="highlight-card">
                              <i class="bi bi-trophy"></i>
                              <h5>Lorem, ipsum.</h5>
                              <p>Excepteur sint occaecat cupidatat non proident</p>
                            </div>
                            <div class="highlight-card">
                              <i class="bi bi-stars"></i>
                              <h5>Lorem ipsum dolor sit.</h5>
                              <p>Duis aute irure dolor in reprehenderit in voluptate</p>
                            </div>
                            <div class="highlight-card">
                              <i class="bi bi-person-check"></i>
                              <h5>Lorem, ipsum dolor.</h5>
                              <p>Lorem ipsum dolor sit amet consectetur adipiscing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="package-contents">
                          <h4>Package Contents</h4>
                          <ul class="contents-list">
                            <li><i class="bi bi-check-circle"></i>Lorem, ipsum dolor</li>
                            <li><i class="bi bi-check-circle"></i>Lorem ipsum dolor sit</li>
                            <li><i class="bi bi-check-circle"></i>Lorem, ipsum dolor</li>
                            <li><i class="bi bi-check-circle"></i>Lorem ipsum dolor sit amet</li>
                            <li><i class="bi bi-check-circle"></i>Lorem, ipsum</li>
                            <li><i class="bi bi-check-circle"></i>Lorem ipsum dolor sit</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Overview Tab -->
                <div class="tab-pane fade" id="ecommerce-product-details-5-technical">
                  <div class="technical-content">
                    <div class="row g-4">
                      <div class="col-md-6">
                        <div class="tech-group">
                          <h4>Lorem, ipsum.</h4>
                          <div class="spec-table">
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum dolor</span>
                              <span class="spec-value">15 - 25</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum</span>
                              <span class="spec-value">50</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem</span>
                              <span class="spec-value">98</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem ipsum dolor sit.</span>
                              <span class="spec-value">24</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum dolor.</span>
                              <span class="spec-value">&lt; 0.5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="tech-group">
                          <h4>Lorem ipsum dolor sit.</h4>
                          <div class="spec-table">
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum</span>
                              <span class="spec-value">5.3</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem</span>
                              <span class="spec-value">Lorem ipsum dolor sit amet</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum</span>
                              <span class="spec-value">800</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum</span>
                              <span class="spec-value">35</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum dolor</span>
                              <span class="spec-value">2.5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="tech-group">
                          <h4>Lorem, ipsum</h4>
                          <div class="spec-table">
                            <div class="spec-row">
                              <span class="spec-name">Weight</span>
                              <span class="spec-value">285</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Dimensions</span>
                              <span class="spec-value">190 x 165 x 82</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum dolor</span>
                              <span class="spec-value">Lorem, ipsum</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem</span>
                              <span class="spec-value">Lorem, ipsum</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="tech-group">
                          <h4>Lorem, ipsum</h4>
                          <div class="spec-table">
                            <div class="spec-row">
                              <span class="spec-name">Weight</span>
                              <span class="spec-value">285</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Dimensions</span>
                              <span class="spec-value">190 x 165 x 82</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem, ipsum dolor</span>
                              <span class="spec-value">Lorem, ipsum</span>
                            </div>
                            <div class="spec-row">
                              <span class="spec-name">Lorem</span>
                              <span class="spec-value">Lorem, ipsum</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Technical Details Tab -->
                <div class="tab-pane fade" id="ecommerce-product-details-5-customer-reviews">
                  <div class="reviews-content">
                    <div class="reviews-header">
                      <div class="rating-overview">
                        <div class="average-score">
                          <div class="score-display">{{ product.rating.rate }}</div>
                          <div class="score-stars">
                            <i v-for="n in Math.round(product.rating.rate)" :key="n" class="bi bi-star-fill"></i>
                            <i v-for="n in (5 - Math.round(product.rating.rate))" :key="n" class="bi bi-star"></i>
                          </div>
                          <div class="total-reviews">{{ product.rating.count }} customer reviews</div>
                        </div>
                        <div class="rating-distribution">
                          <div class="rating-row">
                            <span class="stars-label">5★</span>
                            <div class="progress-container">
                              <div class="progress-fill" style="width: 75%;"></div>
                            </div>
                            <span class="count-label">{{ Math.round(product.rating.count * 0.75) }}</span>
                          </div>
                          <div class="rating-row">
                            <span class="stars-label">4★</span>
                            <div class="progress-container">
                              <div class="progress-fill" style="width: 20%;"></div>
                            </div>
                            <span class="count-label">{{ Math.round(product.rating.count * 0.2) }}</span>
                          </div>
                          <div class="rating-row">
                            <span class="stars-label">3★</span>
                            <div class="progress-container">
                              <div class="progress-fill" style="width: 5%;"></div>
                            </div>
                            <span class="count-label">{{ Math.round(product.rating.count * 0.05) }}</span>
                          </div>
                          <div class="rating-row">
                            <span class="stars-label">2★</span>
                            <div class="progress-container">
                              <div class="progress-fill" style="width: 0%;"></div>
                            </div>
                            <span class="count-label">0</span>
                          </div>
                          <div class="rating-row">
                            <span class="stars-label">1★</span>
                            <div class="progress-container">
                              <div class="progress-fill" style="width: 0%;"></div>
                            </div>
                            <span class="count-label">0</span>
                          </div>
                        </div>
                      </div>
                      <div class="write-review-cta">
                        <h4>Share Your Experience</h4>
                        <p>Help others make informed decisions</p>
                        <button class="btn review-btn">Write Review</button>
                      </div>
                    </div>
                    <div class="customer-reviews-list">
                      <div class="review-card">
                        <div class="reviewer-profile">
                          <img src="../assets/img/person/person-1.jpg" alt="Customer" class="profile-pic">
                          <div class="profile-details">
                            <div class="customer-name">Charles White</div>
                            <div class="review-meta">
                              <div class="review-stars">
                                <i v-for="n in 5" :key="n" class="bi bi-star-fill"></i>
                              </div>
                              <span class="review-date">May 28, 2025</span>
                            </div>
                          </div>
                        </div>
                        <h5 class="review-headline">Lorem ipsum dolor sit amet consectetur adipisicing</h5>
                        <div class="review-text">
                          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                        <div class="review-actions">
                          <button class="action-btn"><i class="bi bi-hand-thumbs-up"></i> Helpful (12)</button>
                          <button class="action-btn"><i class="bi bi-chat-dots"></i> Reply</button>
                        </div>
                      </div>
                      <div class="review-card">
                        <div class="reviewer-profile">
                          <img src="../assets/img/person/person-2.jpg" alt="Customer" class="profile-pic">
                          <div class="profile-details">
                            <div class="customer-name">Noelle Jackson</div>
                            <div class="review-meta">
                              <div class="review-stars">
                                <i v-for="n in 4" :key="n" class="bi bi-star-fill"></i>
                                <i class="bi bi-star"></i>
                              </div>
                              <span class="review-date">March 15, 2025</span>
                            </div>
                          </div>
                        </div>
                        <h5 class="review-headline">Lorem ipsum dolor sit amet consectetur adipisicing elit</h5>
                        <div class="review-text">
                          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Overall satisfied with
                            the purchase.</p>
                        </div>
                        <div class="review-actions">
                          <button class="action-btn"><i class="bi bi-hand-thumbs-up"></i> Helpful (8)</button>
                          <button class="action-btn"><i class="bi bi-chat-dots"></i> Reply</button>
                        </div>
                      </div>
                      <div class="review-card">
                        <div class="reviewer-profile">
                          <img src="../assets/img/person/person-3.jpg" alt="Customer" class="profile-pic">
                          <div class="profile-details">
                            <div class="customer-name">Mark Stewart</div>
                            <div class="review-meta">
                              <div class="review-stars">
                                <i v-for="n in 5" :key="n" class="bi bi-star-fill"></i>
                              </div>
                              <span class="review-date">February 22, 2025</span>
                            </div>
                          </div>
                        </div>
                        <h5 class="review-headline">Lorem ipsum dolor sit, amet consectetur adipisicing</h5>
                        <div class="review-text">
                          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident.</p>
                        </div>
                        <div class="review-actions">
                          <button class="action-btn"><i class="bi bi-hand-thumbs-up"></i> Helpful (15)</button>
                          <button class="action-btn"><i class="bi bi-chat-dots"></i> Reply</button>
                        </div>
                      </div>
                      <div class="load-more-section">
                        <button class="btn load-more-reviews">Show More Reviews</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Reviews Tab -->
              </div>
            </div>
          </div>
        </div>
        <!-- End Information Tabs -->
      </div>
    </section>
    <!-- End Product Details Section -->
  </main>

  <AppFooter />
</template>

<style scoped>
</style>