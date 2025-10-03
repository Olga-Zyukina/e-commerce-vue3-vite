<script setup lang="ts">
</script>

<template>
  <footer id="footer" class="footer dark-background">
    <div class="footer-main">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6">
            <div class="footer-widget footer-about">
              <RouterLink :to="{ name: 'home' }" class="logo">
                <span class="sitename">E-commerce</span>
              </RouterLink>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh vehicula, facilisis magna ut,
                consectetur lorem. Proin eget tortor risus.</p>
              <div class="social-links mt-4">
                <h5>Connect With Us</h5>
                <div class="social-icons">
                  <RouterLink v-for="value in 6" :to="{ name: 'home' }" class="logo">
                    <i v-if="value == 1" class="bi bi-facebook"></i>
                    <i v-if="value == 2" class="bi bi-instagram"></i>
                    <i v-if="value == 3" class="bi bi-twitter-x"></i>
                    <i v-if="value == 4" class="bi bi-tiktok"></i>
                    <i v-if="value == 5" class="bi bi-pinterest"></i>
                    <i v-if="value == 6" class="bi bi-youtube"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-sm-6">
            <div class="footer-widget">
              <h4>Shop</h4>
              <ul class="footer-links">
                <li>
                  <RouterLink :to="{ name: 'catalog' }">New Arrivals</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'catalog' }">Bestsellers</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'catalog' }">Women's Clothing</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'catalog' }">Men's Clothing</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'catalog' }">Electronics</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'catalog' }">Sale</RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-sm-6">
            <div class="footer-widget">
              <h4>Support</h4>
              <ul class="footer-links">
                <li>
                  <RouterLink :to="{ name: 'home' }">Help Center</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'account', hash: '#orders' }">Order Status</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'account', hash: '#orders' }">Shipping Info</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'account', hash: '#orders' }">Returns &amp; Exchanges</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'account', hash: '#orders' }">Size Guide</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'contact' }">Contact Us</RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="footer-widget">
              <h4>Contact Information</h4>
              <div class="footer-contact">
                <div class="contact-item">
                  <i class="bi bi-geo-alt"></i>
                  <span>123 Fashion Street, Moscow, 10001</span>
                </div>
                <div class="contact-item">
                  <i class="bi bi-telephone"></i>
                  <span>+1 (234) 567-890</span>
                </div>
                <div class="contact-item">
                  <i class="bi bi-envelope"></i>
                  <span>contact@ecommerce.ru</span>
                </div>
                <div class="contact-item">
                  <i class="bi bi-clock"></i>
                  <span>Monday-Friday: 9am-6pm<br>Saturday: 10am-4pm<br>Sunday: Closed</span>
                </div>
              </div>
              <div class="app-buttons mt-4">
                <RouterLink :to="{ name: 'home' }" class="app-btn">
                  <i class="bi bi-apple"></i>
                  <span>App Store</span>
                </RouterLink>
                <RouterLink :to="{ name: 'home' }" class="app-btn">
                  <i class="bi bi-google-play"></i>
                  <span>Google Play</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="row gy-3 align-items-center">
          <div class="col-lg-6 col-md-12">
            <div class="copyright">
              <p>© <span>Copyright</span><strong class="sitename">Ecommerce</strong>. All Rights Reserved</p>
            </div>
            <div class="credits mt-1">
              Designed by
              <RouterLink :to="{ name: 'home' }" class="sitename">
                Ecommerce
              </RouterLink>
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
                <RouterLink :to="{ name: 'home' }">
                  Terms
                </RouterLink>
                <RouterLink :to="{ name: 'home' }">
                  Privacy
                </RouterLink>
                <RouterLink :to="{ name: 'home' }">
                  Cookies
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sitename {
  padding-left: 10px;
}
</style>