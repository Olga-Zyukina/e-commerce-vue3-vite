<script setup lang="ts">
import siteSettings from '@/app/settings'
const contacts = siteSettings.contacts
</script>
<template>
  <div class="col-lg-4 col-md-6">
    <div class="footer-widget">
      <h4>Contact Information</h4>
      <div class="footer-contact">
        <div v-for="(item, index) in contacts" :key="index" class="contact-item">
          <i :class="item.icon"></i>
          <span>{{ item.info }}</span>
        </div>
      </div>
      <div class="app-buttons mt-4">
        <NuxtLink to="/" class="app-btn">
          <i class="bi bi-apple"></i>
          <span>App Store</span>
        </NuxtLink>
        <NuxtLink to="/" class="app-btn">
          <i class="bi bi-google-play"></i>
          <span>Google Play</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
