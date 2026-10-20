<script setup lang="ts">
</script>
<template>
  <div>
    <Header />
    <main class="main">
      <PageTitle />
      <slot></slot>
    </main>
    <Footer />
    <ClientOnly>
      <BackToTop />
    </ClientOnly>
  </div>
</template>
<style></style>