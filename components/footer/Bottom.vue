<script setup lang="ts">
</script>
<template>
  <div class="footer-bottom">
    <div class="container">
      <div class="row gy-3 align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="copyright">
            <p>© <span>Copyright</span><strong class="sitename">Ecommerce</strong>. All Rights Reserved</p>
          </div>
          <div class="credits mt-1">
            Designed by
            <NuxtLink to="/" class="sitename">
              Ecommerce
            </NuxtLink>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="d-flex flex-wrap justify-content-lg-end justify-content-center align-items-center gap-4">
            <div class="payment-methods">
              <div class="payment-icons">
                <i class="bi bi-credit-card" aria-label="Credit Card"></i>
                <i class="bi bi-paypal" aria-label="PayPal"></i>
                <i class="bi bi-apple" aria-label="Apple Pay"></i>
                <i class="bi bi-google" aria-label="Google Pay"></i>
                <i class="bi bi-shop" aria-label="Shop Pay"></i>
                <i class="bi bi-cash" aria-label="Cash on Delivery"></i>
              </div>
            </div>
            <div class="legal-links">
              <NuxtLink to="/">
                Terms
              </NuxtLink>
              <NuxtLink to="/">
                Privacy
              </NuxtLink>
              <NuxtLink to="/">
                Cookies
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
