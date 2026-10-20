export const useProductsStore = defineStore("products", () => {
  const products = ref<Omit<ProductsListData, "rate" | "count">[]>([]);
  const categories = ref<string[]>([]);
  const fetchProduct = (productId: number) => {
    let searchItem = products?.value?.find(
      ({ id }: { id: number }) => id == productId,
    );
    return {
      id: searchItem?.id || 0,
      title: searchItem?.title || "",
      price: searchItem?.price || 0,
      description: searchItem?.description || "",
      category: searchItem?.category || "",
      image: searchItem?.image || "",
      rating: {
        rate: searchItem?.rating.rate || 0,
        count: searchItem?.rating.count || 0,
      },
    };
  };
  const product14 = computed(() => fetchProduct(14));
  const product1 = computed(() => fetchProduct(1));
  const product5 = computed(() => fetchProduct(5));

  return { products, categories, product1, product5, product14, fetchProduct };
});
