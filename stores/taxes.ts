export const useTaxesStore = defineStore("taxes", () => {
  const taxes = ref<TaxesData[]>([]);
  return { taxes };
});
