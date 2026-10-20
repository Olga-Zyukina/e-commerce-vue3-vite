<script setup lang="ts">
const { navsShop } = useNavMenu()
</script>
<template>
  <div class="col-lg-2 col-md-6 col-sm-6">
    <div class="footer-widget">
      <h4>Shop</h4>
      <ul class="footer-links">
        <li v-for="(nav, index) in navsShop" :key="index">
          <NuxtLink :to="nav.to">
            {{ nav.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
