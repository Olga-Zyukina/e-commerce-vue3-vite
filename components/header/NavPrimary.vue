<script setup lang="ts">
const { navsPrimary } = useNavMenu()
const { isMobileMenuOpen, openMobileMenu } = useMobileMenu()
</script>
<template>
  <div>
    <div class="header-nav">
      <div class="container-fluid container-xl position-relative">
        <nav id="navmenu" class="navmenu">
          <ul>
            <li v-for="(nav, index) in navsPrimary" :key="index" :label="nav.title" class="nav-item">
              <NuxtLink :to="nav.to" active-class="active" @click="isMobileMenuOpen ? openMobileMenu() : null">
                {{ nav.title }}
              </NuxtLink>
            </li>
         </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: var(--nav-active-color)!important;
}
</style>
