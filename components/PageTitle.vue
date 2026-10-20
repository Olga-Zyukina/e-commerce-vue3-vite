<script setup lang="ts">
const { navsPrimary, navsSecondary } = useNavMenu()
const route = useRoute()
const pageTitle = ref('')
const navs = [...navsPrimary, ...navsSecondary]
const foundPageTitle = (path: any) => {
  const foundPath = navs.find(item => item.to === path);
  pageTitle.value = foundPath ? foundPath.title : 'Account'
}
foundPageTitle(route.path)
watch(() => route.path, (newPath) => {
  foundPageTitle(newPath)
});
</script>
<template>
  <div v-if="route.path != '/'" class="page-title light-background">
    <div class="container d-lg-flex justify-content-between align-items-center">
      <h1 class="mb-2 mb-lg-0">{{ pageTitle }}</h1>
      <nav class="breadcrumbs">
        <ol>
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>
          <li class="current">{{ pageTitle }}</li>
        </ol>
      </nav>
    </div>
  </div>
</template>
<style scoped></style>