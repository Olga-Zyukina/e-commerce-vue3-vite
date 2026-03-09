<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useRootStore } from './stores/root';

const rootStore = useRootStore();

onMounted(async () => {
  await rootStore.fetchProducts();
  rootStore.fetchTaxes();
  rootStore.fetchPersons(rootStore.idPersons);
  rootStore.fetchOrders(rootStore.idPersons);
  if (rootStore.countCartItems == 0 || (rootStore.countCartItems == 1 &&rootStore.cartItems[0].id == 0)) {
    rootStore.addToCart(14);
  };
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
