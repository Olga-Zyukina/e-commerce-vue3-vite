<script setup lang="ts">
const { navsSocial } = useNavMenu()
</script>
<template>
  <div class="col-lg-4 col-md-6">
    <div class="footer-widget footer-about">
      <NuxtLink to="/" class="logo">
        <span class="sitename">E-commerce</span>
      </NuxtLink>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh vehicula, facilisis magna ut,
        consectetur lorem. Proin eget tortor risus.</p>
      <div class="social-links mt-4">
        <h5>Connect With Us</h5>
        <div class="social-icons">
          <NuxtLink v-for="(nav, index) in navsSocial" :to="nav.to" :key="index" class="logo">
            <i :class="nav.icon"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
