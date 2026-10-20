export const useCartsStore = defineStore("carts", () => {
  const productsStore = useProductsStore();
  const products = computed(() => productsStore.products);
  const cart = ref<Omit<CartData, "rate" | "count">[]>([]);
  const countCartItems = computed(() => cart.value.length);

  const addToCart = (idProduct: number, count: number = 1) => {
    if (products.value.length >= 1) {
      const addItem = cart.value.find(
        ({ id }: { id: number }) => id == idProduct,
      );
      if (addItem) {
        addItem.quantity = addItem.quantity + count;
      } else {
        let searchItem = products.value.find(
          ({ id }: { id: number }) => id == idProduct,
        );
        const newsItem: Omit<CartData, "rate" | "count"> = {
          id: searchItem?.id || 0,
          title: searchItem?.title || "",
          price: searchItem?.price || 0,
          description: searchItem?.description || "",
          category: searchItem?.category || "",
          image: searchItem?.image || "",
          quantity: count,
          rating: {
            rate: searchItem?.rating.rate || 0,
            count: searchItem?.rating.count || 0,
          },
        };
        if (newsItem.id != 0) {
          cart.value.push(newsItem);
        }
      }
    } else {
      throw new Error("No news data available");
    }
  };

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1);
  };

  return { cart, countCartItems, addToCart, removeFromCart };
});
