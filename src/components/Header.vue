<script setup lang="ts">
import { onMounted } from "vue";
import { useRootStore } from '../stores/root';

const rootStore = useRootStore();

const toggleSlide = () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  if (swiperWrapper?.classList.contains("swiper-first")) {
    swiperWrapper.classList.remove("swiper-first");
    swiperWrapper.classList.add("swiper-second");
  } else if (swiperWrapper?.classList.contains("swiper-second")) {
    swiperWrapper.classList.remove("swiper-second");
    swiperWrapper.classList.add("swiper-third");
  } else if (swiperWrapper?.classList.contains("swiper-third")) {
    swiperWrapper.classList.remove("swiper-third");
    swiperWrapper.classList.add("swiper-first");
  } else {
    swiperWrapper?.classList.add("swiper-first");
  }
}
const topSwiper = async () => {
  setInterval(toggleSlide, 3000);
}
const navToogle = () => {
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileNavToogle = () => {
    document.querySelector('body')?.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn?.classList.toggle('bi-list');
    mobileNavToggleBtn?.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });
}

onMounted(() => {
  topSwiper();
  if (rootStore.countCartItems == 0) {
    rootStore.addToCart(14);
  };
  navToogle();
})
</script>

<template>
  <header id="header" class="header sticky-top">
    <div class="top-bar py-2">
      <div class="container-fluid container-xl">
        <div class="row align-items-center">
          <div class="col-lg-4 d-none d-lg-flex">
            <div class="top-bar-item">
              <i class="bi bi-telephone-fill me-2"></i>
              <span>Need help? Call us: </span>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 text-center">
            <div class="announcement-slider swiper init-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">🚚 Free shipping on orders over $50</div>
                <div class="swiper-slide">💰 30 days money back guarantee</div>
                <div class="swiper-slide">🎁 20% off on your first order</div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 d-none d-lg-block">
            <div class="d-flex justify-content-end">
              <div class="top-bar-item dropdown me-3">
                <RouterLink :to="{ name: 'home' }" class="dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="bi bi-translate me-2"></i>EN
                </RouterLink>
                <ul class="dropdown-menu">
                  <li>
                    <RouterLink :to="{ name: 'home' }" class="dropdown-item">
                      <i class="bi bi-check2 me-2 selected-icon"></i>
                      English
                    </RouterLink>
                  </li>
                </ul>
              </div>
              <div class="top-bar-item dropdown">
                <RouterLink :to="{ name: 'home' }" class="dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="bi bi-currency-dollar me-2"></i>USD
                </RouterLink>
                <ul class="dropdown-menu">
                  <li>
                    <RouterLink :to="{ name: 'home' }" class="dropdown-item">
                      <i class="bi bi-check2 me-2 selected-icon"></i>
                      USD
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Top Bar -->
    <div class="main-header">
      <div class="container-fluid container-xl">
        <div class="d-flex py-3 align-items-center justify-content-between">
          <RouterLink :to="{ name: 'home' }" class="logo d-flex align-items-center">
            <img src="../assets/img/logo.png" alt="">
            <h1 class="sitename">E-commerce</h1>
          </RouterLink>
          <!-- End Logo -->
          <div class="header-actions d-flex align-items-center justify-content-end">
            <div class="dropdown account-dropdown">
              <button class="header-action-btn" data-bs-toggle="dropdown">
                <i class="bi bi-person"></i>
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-header">
                  <h6>Welcome to <span class="sitename">Store</span></h6>
                  <p class="mb-0">Access account &amp; manage orders</p>
                </div>
                <div class="dropdown-body">
                  <RouterLink :to="{ name: 'account', hash: '#orders' }"
                    class="dropdown-item d-flex align-items-center">
                    <i class="bi bi-person-circle me-2"></i>
                    <span>My Profile</span>
                  </RouterLink>
                  <RouterLink :to="{ name: 'account', hash: '#orders' }"
                    class="dropdown-item d-flex align-items-center">
                    <i class="bi bi-bag-check me-2"></i>
                    <span>My Orders</span>
                  </RouterLink>
                  <RouterLink :to="{ name: 'account', hash: '#wishlist' }"
                    class="dropdown-item d-flex align-items-center">
                    <i class="bi bi-heart me-2"></i>
                    <span>My Wishlist</span>
                  </RouterLink>
                  <RouterLink :to="{ name: 'account', hash: '#settings' }"
                    class="dropdown-item d-flex align-items-center">
                    <i class="bi bi-gear me-2"></i>
                    <span>Settings</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <!-- End Account -->
            <RouterLink :to="{ name: 'account', hash: '#wishlist' }" class="header-action-btn d-none d-md-block">
              <i class="bi bi-heart"></i>
              <span class="badge">{{ rootStore.countWish }}</span>
            </RouterLink>
            <!-- End Wishlist -->
            <RouterLink :to="{ name: 'cart' }" class="header-action-btn">
              <i class="bi bi-cart3"></i>
              <span class="badge">{{ rootStore.countCartItems }}</span>
            </RouterLink>
            <!-- End Cart -->
            <i class="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>
            <!-- End Mobile Navigation Toggle -->
          </div>
          <!-- End Actions -->
        </div>
      </div>
    </div>
    <!-- End Main Header -->
    <div class="header-nav">
      <div class="container-fluid container-xl position-relative">
        <nav id="navmenu" class="navmenu">
          <ul>
            <li class="nav-item">
              <RouterLink :to="{ name: 'home' }" active-class="active">
                Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'about' }" active-class="active">
                About
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'catalog' }" active-class="active">
                Catalog
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'contact' }" active-class="active">
                Contact
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- End Navigation -->
  </header>
</template>

<style scoped>
.active {
  color: var(--nav-active-color);
}
</style>