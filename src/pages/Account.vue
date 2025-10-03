<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
import { useRootStore } from '../stores/root';
import { useRoute } from "vue-router";

const rootStore = useRootStore();
const route = useRoute();

const person = ref(rootStore.person);
const ordersList: any = ref([]);
const wishList: any = ref([]);
const reviewsList: any = ref([]);

const normalizeOrders = async () => {
  try {
    const dataArray: any = [];
    if (rootStore.orders.orders) {
      Object.values(rootStore.orders.orders).forEach((value: any) => {
        let data: any = {
          id: value.id,
          date: value.date,
          status: value.status,
          totalSum: value.products.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0),
          products: []
        };
        Object.values(value.products).forEach((product: any) => {
          let item = {
            idProduct: product.idProduct,
            title: rootStore.getProduct(product.idProduct).title,
            image: rootStore.getProduct(product.idProduct).image,
            price: product.price,
            quantity: product.quantity,
          };
          data.products.push(item);
        });
        dataArray.push(data);
      });
      return dataArray;
    }
  } catch {
    return [];
  }
}
const normalizeWish = async () => {
  try {
    const dataArray: any = [];
    if (rootStore.person.wish) {
      (rootStore.person.wish).forEach((value: any) => {
        let data: any = {
          id: value,
          title: rootStore.getProduct(value).title,
          image: rootStore.getProduct(value).image,
          rate: rootStore.getProduct(value).rating.rate,
          count: rootStore.getProduct(value).rating.count,
          price: rootStore.getProduct(value).price,
        };
        dataArray.push(data);
      });
      return dataArray;
    }
  } catch {
    return [];
  }
}
const normalizeReviews = async () => {
  try {
    const dataArray: any = [];
    if (rootStore.person.reviews) {
      (rootStore.person.reviews).forEach((value: any) => {
        let data: any = {
          idProduct: value.idProduct,
          date: value.data,
          rating: value.rating,
          review: value.review,
          title: rootStore.getProduct(value.idProduct).title,
          image: rootStore.getProduct(value.idProduct).image,
          rate: rootStore.getProduct(value.idProduct).rating.rate,
          count: rootStore.getProduct(value.idProduct).rating.count,
        };
        dataArray.push(data);
      });
      return dataArray;
    }
  } catch {
    return [];
  }
}
const fetchData = async () => {
  try {
    ordersList.value = await normalizeOrders();
    wishList.value = await normalizeWish();
    reviewsList.value = await normalizeReviews();
  } catch (e) {
    throw new Error("No news data available");
  }
};
const removeWish = (index: any) => {
  wishList.value.splice(index, 1);
  rootStore.person.wish.splice(index, 1);
  rootStore.countWish--;
}
const checkoutForm = () => {
  const checkoutForms = document.querySelectorAll('.settings-form');
    checkoutForms.forEach((checkoutForm, index) => {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const requiredFields = checkoutForm.querySelectorAll<HTMLInputElement>('[required]');
      let isValid: boolean | null = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
          if (isValid === false) {
            field.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
            field.focus();
            isValid = null;
          }
        } else {
          field.classList.remove('is-invalid');
        }
      });
      if (isValid === true) {
        const successMessage = document.querySelectorAll<HTMLElement>('.sent-message');
        if (successMessage) {
          successMessage[index].style.display = "block";
          successMessage[index].style.animation = 'fadeInUp 0.5s ease forwards';
        }
      }
    });
  });
}
const setContentArea = () => {
  const idContent: any = ref(route?.hash);
  const getLinkActive = document.querySelector(".account .active");
  const getContentActive = document.querySelector(".account .active.show");
  const setLinkActive = document.querySelector(`a[href="${idContent.value}"]`);
  const setContentActive = document.getElementById(idContent.value.slice(1).toLowerCase());

  getLinkActive?.classList.remove("active");
  getContentActive?.classList.remove("active");
  setLinkActive?.classList.add("active");
  setContentActive?.classList.add("active", "show");
}
onMounted(() => {
  fetchData();
  checkoutForm();
  setContentArea();
});

</script>

<template>
  <AppHeader />

  <main class="main">
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Account</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">Account</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <section id="account" class="account section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="mobile-menu d-lg-none mb-4">
          <button class="mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#profileMenu">
            <i class="bi bi-grid"></i>
            <span>Menu</span>
          </button>
        </div>
        <!-- End Mobile Menu Toggle -->
        <div class="row g-4">
          <div class="col-lg-3">
            <div class="profile-menu collapse d-lg-block" id="profileMenu">
              <div class="user-info" data-aos="fade-right">
                <div class="user-avatar">
                  <img :src="person.image" alt="Profile" loading="lazy">
                  <span class="status-badge"><i class="bi bi-shield-check"></i></span>
                </div>
                <h4>{{ person.firstName }} {{ person.lastName }}</h4>
                <div class="user-status">
                  <i class="bi bi-award"></i>
                  <span>{{ person.status}}</span>
                </div>
              </div>
              <!-- End User Info -->
              <nav class="menu-nav">
                <ul class="nav flex-column" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="tab" href="#orders">
                      <i class="bi bi-box-seam"></i>
                      <span>My Orders</span>
                      <span class="badge">{{ rootStore.countOrders }}</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#wishlist">
                      <i class="bi bi-heart"></i>
                      <span>Wishlist</span>
                      <span class="badge"> {{ rootStore.countWish }}</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#wallet">
                      <i class="bi bi-wallet2"></i>
                      <span>Payment Methods</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#reviews">
                      <i class="bi bi-star"></i>
                      <span>My Reviews</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#settings">
                      <i class="bi bi-gear"></i>
                      <span>Account Settings</span>
                    </a>
                  </li>
                </ul>
                <div class="menu-footer">
                  <RouterLink :to="{ name: 'account' }" class="help-link">
                    <i class="bi bi-question-circle"></i>
                    <span>Help Center</span>
                  </RouterLink>
                  <RouterLink :to="{ name: 'account' }" class="logout-link">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Log Out</span>
                  </RouterLink>
                </div>
              </nav>
              <!-- End Navigation Menu -->
            </div>
          </div>
          <!-- End Profile Menu -->
          <div class="col-lg-9">
            <div class="content-area">
              <div class="tab-content">
                <div class="tab-pane fade show active" id="orders">
                  <div class="section-header" data-aos="fade-up">
                    <h2>My Orders</h2>
                  </div>
                  <div class="orders-grid">
                    <div v-for="order in ordersList" :key="order.id" class="order-card">
                      <div class="order-header">
                        <div class="order-id">
                          <span class="label">Order ID:</span>
                          <span class="value">{{ order.id }}</span>
                        </div>
                        <div class="order-date">{{ order.date }}</div>
                      </div>
                      <div class="order-content">
                        <div class="product-grid">
                          <img v-for="product in order.products" :src="product.image" :key="product.idProduct" :alt="product.title" loading="lazy">
                        </div>
                        <div class="order-info">
                          <div class="info-row">
                            <span>Status</span>
                            <span class="status delivered">{{ order.status }}</span>
                          </div>
                          <div class="info-row">
                            <span>Items</span>
                            <span>{{ order.products.length }} items</span>
                          </div>
                          <div class="info-row">
                            <span>Total</span>
                            <span class="price">$ {{ order.totalSum }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End Order Card -->
                  </div>
                </div>
                <!-- End Orders Tab -->
                <div class="tab-pane fade" id="wishlist">
                  <div class="section-header" data-aos="fade-up">
                    <h2>My Wishlist</h2>
                  </div>
                  <div class="wishlist-grid">
                    <div v-for="(wish, index) in wishList" class="wishlist-card" data-aos="fade-up" data-aos-delay="100">
                      <div class="wishlist-image">
                        <img :src="wish.image" alt="Product" loading="lazy">
                        <button @click="removeWish(index)" class="btn-remove" type="button" aria-label="Remove from wishlist">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                      <div class="wishlist-content">
                        <h4>{{ wish.title }}</h4>
                        <div class="product-meta">
                          <div class="rating">
                            <i v-for="n in Math.round(wish.rate)" :key="n" class="bi bi-star-fill"></i>
                            <i v-for="n in (5 - Math.round(wish.rate))" :key="n" class="bi bi-star"></i>
                            <span>({{ wish.count }})</span>
                          </div>
                          <div class="price">
                            <span class="current">${{ wish.price }}</span>
                          </div>
                        </div>
                        <button @click="rootStore.addToCart(wish.id)" type="button" class="btn-add-cart">Add to Cart</button>
                      </div>
                    </div>
                    <!-- End Wishlist Item -->
                  </div>
                </div>
                <!-- End Wishlist Tab -->
                <div class="tab-pane fade" id="wallet">
                  <div class="section-header" data-aos="fade-up">
                    <h2>Payment Methods</h2>
                  </div>
                  <div class="payment-cards-grid">
                    <div v-for="(paymentMethod, index) in person.paymentMethods" :key="index" :class="{ default: index == 0 }" class="payment-card" data-aos="fade-up" data-aos-delay="100">
                      <div class="card-header">
                        <i class="bi bi-credit-card"></i>
                        <div class="card-badges">
                          <span v-if="index == 0" class="default-badge">Default</span>
                          <span class="card-type">{{ paymentMethod.paySystem }}</span>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="card-number">{{ paymentMethod.number }}</div>
                        <div class="card-info">
                          <span>Expires {{ paymentMethod.expires }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- End Payment Card -->
                  </div>
                </div>
                <!-- End Payment Methods Tab -->
                <div class="tab-pane fade" id="reviews">
                  <div class="section-header" data-aos="fade-up">
                    <h2>My Reviews</h2>
                  </div>
                  <div class="reviews-grid">
                    <div v-for="(review, index) in reviewsList" :key="index" class="review-card" data-aos="fade-up" data-aos-delay="100">
                      <div class="review-header">
                        <img :src="review.image" alt="Product" class="product-image"
                          loading="lazy">
                        <div class="review-meta">
                          <h4>{{ review.title }}</h4>
                          <div class="rating">
                            <i v-for="n in Math.round(review.rate)" :key="n" class="bi bi-star-fill"></i>
                            <i v-for="n in (5 - Math.round(review.rate))" :key="n" class="bi bi-star"></i>
                            <span>({{ review.count }})</span>
                          </div>
                          <div class="review-date">Reviewed on {{ review.date }}</div>
                        </div>
                      </div>
                      <div class="review-content">
                        <p>{{ review.review }}</p>
                      </div>
                    </div>
                    <!-- End Review Card -->
                  </div>
                </div>
                <!-- End Reviews Tab -->
                <div class="tab-pane fade" id="settings">
                  <div class="section-header" data-aos="fade-up">
                    <h2>Account Settings</h2>
                  </div>
                  <div class="settings-content">
                    <div class="settings-section" data-aos="fade-up">
                      <h3>Personal Information</h3>
                      <form class="php-email-form settings-form">
                        <div class="row g-3">
                          <div class="col-md-6">
                            <label for="firstName" class="form-label">First Name</label>
                            <input v-model="person.firstName" type="text" class="form-control" id="firstName" required>
                          </div>
                          <div class="col-md-6">
                            <label for="lastName" class="form-label">Last Name</label>
                            <input v-model="person.lastName" type="text" class="form-control" id="lastName" required>
                          </div>
                          <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="person.email" type="email" class="form-control" id="email" required>
                          </div>
                          <div class="col-md-6">
                            <label for="phone" class="form-label">Phone</label>
                            <input v-model="person.phone" type="tel" class="form-control" id="phone">
                          </div>
                        </div>
                        <div class="form-buttons">
                          <button type="submit" class="btn-save">Save Changes</button>
                        </div>
                        <div class="sent-message">Your changes have been saved successfully!</div>
                      </form>
                    </div>
                    <!-- End Personal Information -->
                    <div class="settings-section" data-aos="fade-up" data-aos-delay="100">
                      <h3>Email Preferences</h3>
                      <div class="preferences-list">
                        <div class="preference-item">
                          <div class="preference-info">
                            <h4>Order Updates</h4>
                            <p>Receive notifications about your order status</p>
                          </div>
                          <div class="form-check form-switch">
                            <input v-model="person.orderUpdates" class="form-check-input" type="checkbox" id="orderUpdates" >
                          </div>
                        </div>
                        <div class="preference-item">
                          <div class="preference-info">
                            <h4>Promotions</h4>
                            <p>Receive emails about new promotions and deals</p>
                          </div>
                          <div class="form-check form-switch">
                            <input v-model="person.promotions" class="form-check-input" type="checkbox" id="promotions">
                          </div>
                        </div>
                        <div class="preference-item">
                          <div class="preference-info">
                            <h4>Newsletter</h4>
                            <p>Subscribe to our weekly newsletter</p>
                          </div>
                          <div class="form-check form-switch">
                            <input v-model="person.newsletter" class="form-check-input" type="checkbox" id="newsletter">
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Email Preferences -->
                    <div class="settings-section" data-aos="fade-up" data-aos-delay="200">
                      <h3>Security</h3>
                      <form class="php-email-form settings-form">
                        <div class="row g-3">
                          <div class="col-md-12">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input v-model="person.password" type="password" class="form-control" id="currentPassword" required>
                          </div>
                          <div class="col-md-6">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input v-model="person.password" type="password" class="form-control" id="newPassword" required>
                          </div>
                          <div class="col-md-6">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input v-model="person.password" type="password" class="form-control" id="confirmPassword" required>
                          </div>
                        </div>
                        <div class="form-buttons">
                          <button type="submit" class="btn-save">Update Password</button>
                        </div>
                        <div class="sent-message">Your password has been updated successfully!</div>
                      </form>
                    </div>
                    <!-- End Security Settings -->
                    <div class="settings-section danger-zone" data-aos="fade-up" data-aos-delay="300">
                      <h3>Delete Account</h3>
                      <div class="danger-zone-content">
                        <p>Once you delete your account, there is no going back. Please be certain.</p>
                        <button type="button" class="btn-danger">Delete Account</button>
                      </div>
                    </div>
                    <!-- End Delete Account -->
                  </div>
                </div>
                <!-- End Settings Tab -->
              </div>
            </div>
          </div>
          <!-- End Content Area -->
        </div>
      </div>
    </section>
    <!-- End Account Section -->
  </main>

  <AppFooter />
</template>

<style scoped>
/** Account Section */
.account .mobile-menu .mobile-menu-toggle {
  width: 100%;
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  color: var(--heading-color);
  transition: all 0.3s ease;
}
.account .mobile-menu .mobile-menu-toggle i {
  font-size: 20px;
}
.account .mobile-menu .mobile-menu-toggle:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
}
.account .profile-menu {
  background-color: var(--surface-color);
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}
.account .profile-menu .user-info {
  text-align: center;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.account .profile-menu .user-info .user-avatar {
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 16px;
}
.account .profile-menu .user-info .user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--surface-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.account .profile-menu .user-info .user-avatar .status-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: #ff4757;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--surface-color);
}
.account .profile-menu .user-info .user-avatar .status-badge i {
  color: var(--contrast-color);
  font-size: 14px;
}
.account .profile-menu .user-info h4 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}
.account .profile-menu .user-info .user-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
  border-radius: 20px;
  font-size: 13px;
}
.account .profile-menu .user-info .user-status i {
  font-size: 14px;
}
.account .profile-menu .menu-nav .nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--default-color);
  margin-bottom: 4px;
  transition: all 0.3s ease;
}
.account .profile-menu .menu-nav .nav-link i {
  font-size: 20px;
  margin-right: 12px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  transition: all 0.3s ease;
}
.account .profile-menu .menu-nav .nav-link span {
  flex: 1;
}
.account .profile-menu .menu-nav .nav-link .badge {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex: 0;
}
.account .profile-menu .menu-nav .nav-link .badge {
  background-color: #ff4757;
  color: var(--contrast-color);
}
.account .profile-menu .menu-nav .nav-link:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
}
.account .profile-menu .menu-nav .nav-link:hover i {
  color: var(--accent-color);
}
.account .profile-menu .menu-nav .nav-link.active {
  background-color: var(--accent-color);
  color: var(--contrast-color);
  font-weight: 500;
}
.account .profile-menu .menu-nav .nav-link.active i {
  color: var(--contrast-color);
}
.account .profile-menu .menu-nav .nav-link.active .badge {
  background-color: #ff4757;
  color: var(--accent-color);
}
.account .profile-menu .menu-footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.account .profile-menu .menu-footer a {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--default-color);
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}
.account .profile-menu .menu-footer a i {
  font-size: 20px;
  margin-right: 12px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  transition: all 0.3s ease;
}
.account .profile-menu .menu-footer a:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
}
.account .profile-menu .menu-footer a:hover i {
  color: var(--accent-color);
}
.account .profile-menu .menu-footer a.logout-link {
  color: #ef4444;
}
.account .profile-menu .menu-footer a.logout-link i {
  color: #ef4444;
}
.account .profile-menu .menu-footer a.logout-link:hover {
  background-color: rgba(239, 68, 68, 0.08);
}
.account .content-area {
  background-color: var(--surface-color);
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}
.account .content-area .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}
.account .content-area .section-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}
.account .content-area .section-header .header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.account .content-area .section-header .header-actions .search-box {
  position: relative;
}
.account .content-area .section-header .header-actions .search-box i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  font-size: 16px;
}
.account .content-area .section-header .header-actions .search-box input {
  width: 240px;
  height: 44px;
  padding: 0 16px 0 44px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
}
.account .content-area .section-header .header-actions .search-box input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color), transparent 90%);
}
.account .content-area .section-header .header-actions .filter-btn {
  height: 44px;
  padding: 0 20px;
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--default-color);
  transition: all 0.3s ease;
}
.account .content-area .section-header .header-actions .filter-btn i {
  font-size: 16px;
}
.account .content-area .section-header .header-actions .filter-btn:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
}
.account .content-area .orders-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 32px;
}
.account .content-area .orders-grid .order-card {
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}
.account .content-area .orders-grid .order-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.account .content-area .orders-grid .order-card .order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
}
.account .content-area .orders-grid .order-card .order-header .order-id .label {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  margin-right: 6px;
}
.account .content-area .orders-grid .order-card .order-header .order-id .value {
  font-weight: 500;
  font-family: var(--heading-font);
}
.account .content-area .orders-grid .order-card .order-header .order-date {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .content-area .orders-grid .order-card .tracking-info,
.account .content-area .orders-grid .order-card .order-details {
  margin-top: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.account .content-area .orders-grid .order-card .tracking-info.collapse:not(.show),
.account .content-area .orders-grid .order-card .order-details.collapse:not(.show) {
  display: none;
}
.account .content-area .orders-grid .order-card .tracking-info.collapsing,
.account .content-area .orders-grid .order-card .order-details.collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline {
  position: relative;
  padding: 24px 24px 24px 56px;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline:before {
  content: "";
  position: absolute;
  left: 39px;
  top: 24px;
  bottom: 24px;
  width: 2px;
  background-color: #e5e7eb;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item {
  position: relative;
  padding-bottom: 24px;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item:last-child {
  padding-bottom: 0;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-icon {
  position: absolute;
  left: -32px;
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-icon i {
  font-size: 14px;
  color: #9ca3af;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-content {
  padding-left: 16px;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-content h5 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-content p {
  margin: 0 0 4px;
  font-size: 14px;
  color: color-mix(in srgb, var(--default-color), transparent 30%);
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-content .timeline-date {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-content .shipping-info {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #ffffff;
  border-radius: 8px;
  font-size: 13px;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item .timeline-content .shipping-info .tracking-number {
  font-family: var(--heading-font);
  font-weight: 500;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item.completed .timeline-icon {
  background-color: #f0fdf4;
  border-color: #22c55e;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item.completed .timeline-icon i {
  color: #22c55e;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item.active .timeline-icon {
  background-color: #fff7ed;
  border-color: #f97316;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item.active .timeline-icon i {
  color: #f97316;
}
.account .content-area .orders-grid .order-card .tracking-info .tracking-timeline .timeline-item.active .timeline-content h5 {
  color: #f97316;
}
.account .content-area .orders-grid .order-card .order-details .details-content {
  padding: 24px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section h5 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .info-grid .info-item .label {
  display: block;
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  margin-bottom: 4px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .info-grid .info-item .value {
  font-size: 14px;
  font-weight: 500;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item:last-child {
  margin-bottom: 0;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item .item-info {
  flex: 1;
  min-width: 0;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item .item-info h6 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 500;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item .item-info .item-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .order-items .item .item-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--heading-color);
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .price-breakdown {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .price-breakdown .price-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .price-breakdown .price-row:not(.total) {
  color: color-mix(in srgb, var(--default-color), transparent 30%);
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .price-breakdown .price-row.total {
  padding-top: 12px;
  margin-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 600;
  color: var(--accent-color);
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .address-info {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .address-info p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}
.account .content-area .orders-grid .order-card .order-details .details-content .detail-section .address-info p.contact {
  margin-top: 8px;
  color: color-mix(in srgb, var(--default-color), transparent 30%);
}
.account .content-area .orders-grid .order-card .order-content {
  margin-bottom: 20px;
}
.account .content-area .orders-grid .order-card .order-content .product-grid {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.account .content-area .orders-grid .order-card .order-content .product-grid::-webkit-scrollbar {
  display: none;
}
.account .content-area .orders-grid .order-card .order-content .product-grid img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.04);
}
.account .content-area .orders-grid .order-card .order-content .product-grid .more-items {
  min-width: 64px;
  height: 64px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row:last-child {
  margin-bottom: 0;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row span:first-child {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row .status {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row .status.processing {
  background-color: #fff7ed;
  color: #f97316;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row .status.shipped {
  background-color: #ecfeff;
  color: #06b6d4;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row .status.delivered {
  background-color: #f0fdf4;
  color: #22c55e;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row .status.cancelled {
  background-color: #fef2f2;
  color: #ef4444;
}
.account .content-area .orders-grid .order-card .order-content .order-info .info-row .price {
  font-weight: 600;
  color: var(--heading-color);
}
.account .content-area .orders-grid .order-card .order-footer {
  display: flex;
  gap: 12px;
}
.account .content-area .orders-grid .order-card .order-footer button {
  flex: 1;
  height: 40px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.account .content-area .orders-grid .order-card .order-footer button.btn-track {
  background-color: var(--accent-color);
  color: var(--contrast-color);
  border: none;
}
.account .content-area .orders-grid .order-card .order-footer button.btn-track:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.account .content-area .orders-grid .order-card .order-footer button.btn-details {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
  border: none;
}
.account .content-area .orders-grid .order-card .order-footer button.btn-details:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 88%);
}
.account .content-area .orders-grid .order-card .order-footer button.btn-review {
  background-color: #f0fdf4;
  color: #22c55e;
  border: none;
}
.account .content-area .orders-grid .order-card .order-footer button.btn-review:hover {
  background-color: #dcfce7;
}
.account .content-area .orders-grid .order-card .order-footer button.btn-reorder {
  background-color: #fef2f2;
  color: #ef4444;
  border: none;
}
.account .content-area .orders-grid .order-card .order-footer button.btn-reorder:hover {
  background-color: #fee2e2;
}
.account .content-area .pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.account .content-area .pagination-wrapper button {
  min-width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: all 0.3s ease;
  background-color: transparent;
  color: var(--default-color);
}
.account .content-area .pagination-wrapper button:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
}
.account .content-area .pagination-wrapper button.active {
  background-color: var(--accent-color);
  color: var(--contrast-color);
}
.account .content-area .pagination-wrapper button:disabled {
  color: color-mix(in srgb, var(--default-color), transparent 60%);
  cursor: not-allowed;
}
.account .content-area .pagination-wrapper button i {
  font-size: 18px;
}
.account .content-area .pagination-wrapper .page-numbers {
  display: flex;
  align-items: center;
  gap: 8px;
}
.account .content-area .pagination-wrapper .page-numbers span {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
@media (max-width: 991.98px) {
  .account .profile-menu {
    margin-bottom: 24px;
  }
}
@media (max-width: 767.98px) {
  .account .content-area {
    padding: 20px;
  }
  .account .content-area .section-header .header-actions {
    width: 100%;
  }
  .account .content-area .section-header .header-actions .search-box {
    flex: 1;
  }
  .account .content-area .section-header .header-actions .search-box input {
    width: 100%;
  }
}
.account .wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.account .wishlist-grid .wishlist-card {
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.account .wishlist-grid .wishlist-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.account .wishlist-grid .wishlist-card:hover .wishlist-image img {
  transform: scale(1.05);
}
.account .wishlist-grid .wishlist-card:hover .wishlist-image .btn-remove {
  opacity: 1;
  transform: translateY(0);
}
.account .wishlist-grid .wishlist-card .wishlist-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}
.account .wishlist-grid .wishlist-card .wishlist-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.account .wishlist-grid .wishlist-card .wishlist-image .btn-remove {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1;
}
.account .wishlist-grid .wishlist-card .wishlist-image .btn-remove:hover {
  background-color: #ef4444;
  color: #ffffff;
}
.account .wishlist-grid .wishlist-card .wishlist-image .sale-badge,
.account .wishlist-grid .wishlist-card .wishlist-image .out-of-stock-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
.account .wishlist-grid .wishlist-card .wishlist-image .sale-badge {
  background-color: #fef2f2;
  color: #ef4444;
}
.account .wishlist-grid .wishlist-card .wishlist-image .out-of-stock-badge {
  background-color: #f3f4f6;
  color: #6b7280;
}

.account .wishlist-grid .wishlist-card .wishlist-content {
  padding: 20px;
}
.account .wishlist-grid .wishlist-card .wishlist-content h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta {
  margin-bottom: 16px;
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta .rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta .rating i {
  color: #f59e0b;
  font-size: 14px;
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta .rating span {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta .price {
  display: flex;
  align-items: center;
  gap: 8px;
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta .price .current {
  font-size: 18px;
  font-weight: 600;
  color: var(--heading-color);
}
.account .wishlist-grid .wishlist-card .wishlist-content .product-meta .price .original {
  font-size: 14px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  text-decoration: line-through;
}
.account .wishlist-grid .wishlist-card .wishlist-content .btn-add-cart,
.account .wishlist-grid .wishlist-card .wishlist-content .btn-notify {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.account .wishlist-grid .wishlist-card .wishlist-content .btn-add-cart {
  background-color: var(--accent-color);
  color: var(--contrast-color);
  border: none;
}
.account .wishlist-grid .wishlist-card .wishlist-content .btn-add-cart:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.account .wishlist-grid .wishlist-card .wishlist-content .btn-notify {
  background-color: #f3f4f6;
  color: #6b7280;
  border: none;
}
.account .wishlist-grid .wishlist-card .wishlist-content .btn-notify:hover {
  background-color: #e5e7eb;
}
.account .payment-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.account .payment-cards-grid .payment-card {
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}
.account .payment-cards-grid .payment-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.account .payment-cards-grid .payment-card.default {
  border-color: var(--accent-color);
}
.account .payment-cards-grid .payment-card .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.account .payment-cards-grid .payment-card .card-header i {
  font-size: 24px;
  color: var(--accent-color);
}
.account .payment-cards-grid .payment-card .card-header .card-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}
.account .payment-cards-grid .payment-card .card-header .card-badges span {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
.account .payment-cards-grid .payment-card .card-header .card-badges .default-badge {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
}
.account .payment-cards-grid .payment-card .card-header .card-badges .card-type {
  background-color: #f3f4f6;
  color: #6b7280;
}
.account .payment-cards-grid .payment-card .card-body {
  margin-bottom: 16px;
}
.account .payment-cards-grid .payment-card .card-body .card-number {
  font-family: var(--heading-font);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.account .payment-cards-grid .payment-card .card-body .card-info {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .payment-cards-grid .payment-card .card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.account .payment-cards-grid .payment-card .card-actions button {
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}
.account .payment-cards-grid .payment-card .card-actions button i {
  font-size: 14px;
}
.account .payment-cards-grid .payment-card .card-actions button.btn-edit {
  background-color: #f3f4f6;
  color: #6b7280;
  border: none;
}
.account .payment-cards-grid .payment-card .card-actions button.btn-edit:hover {
  background-color: #e5e7eb;
}
.account .payment-cards-grid .payment-card .card-actions button.btn-remove {
  background-color: #fef2f2;
  color: #ef4444;
  border: none;
}
.account .payment-cards-grid .payment-card .card-actions button.btn-remove:hover {
  background-color: #fee2e2;
}
.account .payment-cards-grid .payment-card .card-actions button.btn-make-default {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
  border: none;
}
.account .payment-cards-grid .payment-card .card-actions button.btn-make-default:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 88%);
}
.account .reviews-grid {
  display: grid;
  gap: 24px;
  margin-bottom: 32px;
}
.account .reviews-grid .review-card {
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}
.account .reviews-grid .review-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.account .reviews-grid .review-card .review-header {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.account .reviews-grid .review-card .review-header .product-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
}
.account .reviews-grid .review-card .review-header .review-meta {
  flex: 1;
}
.account .reviews-grid .review-card .review-header .review-meta h4 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}
.account .reviews-grid .review-card .review-header .review-meta .rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}
.account .reviews-grid .review-card .review-header .review-meta .rating i {
  color: #f59e0b;
  font-size: 14px;
}
.account .reviews-grid .review-card .review-header .review-meta .rating span {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .reviews-grid .review-card .review-header .review-meta .review-date {
  font-size: 13px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .reviews-grid .review-card .review-content {
  margin-bottom: 16px;
}
.account .reviews-grid .review-card .review-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}
.account .reviews-grid .review-card .review-footer {
  display: flex;
  gap: 12px;
}
.account .reviews-grid .review-card .review-footer button {
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.account .reviews-grid .review-card .review-footer button.btn-edit {
  background-color: #f3f4f6;
  color: #6b7280;
  border: none;
}
.account .reviews-grid .review-card .review-footer button.btn-edit:hover {
  background-color: #e5e7eb;
}
.account .reviews-grid .review-card .review-footer button.btn-delete {
  background-color: #fef2f2;
  color: #ef4444;
  border: none;
}
.account .reviews-grid .review-card .review-footer button.btn-delete:hover {
  background-color: #fee2e2;
}
.account .settings-content .settings-section {
  background-color: var(--surface-color);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}
.account .settings-content .settings-section:last-child {
  margin-bottom: 0;
}
.account .settings-content .settings-section h3 {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 600;
}
.account .settings-content .settings-section.danger-zone {
  border-color: #fee2e2;
}
.account .settings-content .settings-section.danger-zone h3 {
  color: #ef4444;
}
.account .settings-content .settings-section.danger-zone .danger-zone-content p {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.6;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
}
.account .settings-content .settings-section.danger-zone .danger-zone-content .btn-danger {
  height: 40px;
  padding: 0 20px;
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.account .settings-content .settings-section.danger-zone .danger-zone-content .btn-danger:hover {
  background-color: #dc2626;
}
.account .settings-content .settings-form .form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}
.account .settings-content .settings-form .form-control {
  height: 44px;
  padding: 0 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
}
.account .settings-content .settings-form .form-control:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color), transparent 90%);
}
.account .settings-content .settings-form .form-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.account .settings-content .settings-form .form-buttons .btn-save {
  height: 40px;
  padding: 0 24px;
  background-color: var(--accent-color);
  color: var(--contrast-color);
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.account .settings-content .settings-form .form-buttons .btn-save:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.account .settings-content .preferences-list .preference-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.account .settings-content .preferences-list .preference-item:first-child {
  padding-top: 0;
}
.account .settings-content .preferences-list .preference-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.account .settings-content .preferences-list .preference-item .preference-info {
  margin-right: 16px;
}
.account .settings-content .preferences-list .preference-item .preference-info h4 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
}
.account .settings-content .preferences-list .preference-item .preference-info p {
  margin: 0;
  font-size: 14px;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.account .settings-content .preferences-list .preference-item .form-check {
  margin: 0;
  min-height: auto;
}
.account .settings-content .preferences-list .preference-item .form-check .form-check-input {
  width: 3rem;
  height: 1.5rem;
  margin: 0;
}
.account .settings-content .preferences-list .preference-item .form-check .form-check-input:checked {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
.account .settings-content .preferences-list .preference-item .form-check .form-check-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--accent-color), transparent 75%);
}
@media (max-width: 575.98px) {
  .account .orders-grid .order-card .order-header {
    flex-direction: column;
    gap: 8px;
  }
  .account .section-header .header-actions {
    width: 100%;
    justify-content: stretch;
  }
  .account .section-header .header-actions .search-box,
  .account .section-header .header-actions .dropdown,
  .account .section-header .header-actions button {
    width: 100%;
  }
  .account .payment-cards-grid,
  .account .addresses-grid {
    grid-template-columns: 1fr;
  }
  .account .review-card .review-header {
    flex-direction: column;
    text-align: center;
  }
  .account .review-card .review-header .product-image {
    margin: 0 auto;
  }
  .account .review-card .review-header .rating {
    justify-content: center;
  }
}
</style>