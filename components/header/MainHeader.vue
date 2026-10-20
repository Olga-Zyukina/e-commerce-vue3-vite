<script setup lang="ts">
const { navsProfile, navsSecondary } = useNavMenu()
const { isMobileMenuOpen, openMobileMenu } = useMobileMenu()
const userStore = useUserStore()
const cartStore = useCartsStore()
</script>
<template>
  <div class="main-header">
    <div class="container-fluid container-xl">
      <div class="d-flex py-3 align-items-center justify-content-between">
        <NuxtLink to="/" class="logo d-flex align-items-center">
          <NuxtImg src="./logo.png" alt="logo"/>
          <h1 class="sitename">E-commerce</h1>
        </NuxtLink>
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
              <NuxtLink v-for="(nav, index) in navsProfile" :key="index" :label="nav.title" :to="nav.to" class="dropdown-item d-flex align-items-center">
                <i :class="nav.icon"></i>
                <span>{{ nav.title }}</span>
              </NuxtLink>
              </div>
            </div>
          </div>
          <!-- End Account -->
          <NuxtLink v-for="(nav, index) in navsSecondary" :key="index" :label="nav.to" :to="nav.to" class="header-action-btn">
            <i :class="nav.icon"></i>
            <span v-if="index==0" class="badge">{{ userStore.countWish }}</span>
            <span v-else class="badge">{{ cartStore.countCartItems }}</span>
          </NuxtLink>
          <!-- End Secondary Menu -->
          <i @click="openMobileMenu" :class="['mobile-nav-toggle d-xl-none bi me-0', isMobileMenuOpen == true ? 'bi-x' : 'bi-list']"></i>
          <!-- End Mobile Navigation Toggle -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
