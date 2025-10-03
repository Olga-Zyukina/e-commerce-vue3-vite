<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import { useRootStore } from './stores/root';

const rootStore = useRootStore();

onMounted(() => {
  rootStore.fetchProducts();
  rootStore.fetchTaxes();
  rootStore.fetchPersons(rootStore.idPersons);
  rootStore.fetchOrders(rootStore.idPersons);
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
