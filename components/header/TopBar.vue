<script setup lang="ts">
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

onMounted(async () => { setInterval(toggleSlide, 3000); })
</script>
<template>
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
              <NuxtLink to="/" class="dropdown-toggle" data-bs-toggle="dropdown">
                <i class="bi bi-translate me-2"></i>EN
              </NuxtLink>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink to="/" class="dropdown-item">
                    <i class="bi bi-check2 me-2 selected-icon"></i>
                    English
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="top-bar-item dropdown">
              <NuxtLink to="/" class="dropdown-toggle" data-bs-toggle="dropdown">
                <i class="bi bi-currency-dollar me-2"></i>USD
              </NuxtLink>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink to="/" class="dropdown-item">
                    <i class="bi bi-check2 me-2 selected-icon"></i>
                    USD
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
