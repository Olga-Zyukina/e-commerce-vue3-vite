export const useOrdersStore = defineStore("orders", () => {
  const orders = ref<OrderData>({
    idPerson: 0,
    orders: [
      {
        id: "",
        date: "",
        status: "",
        products: [
          {
            idProduct: 0,
            quantity: 0,
            price: 0,
          },
        ],
      },
    ],
  });
  const countOrders = ref<number>(0);

  return { orders, countOrders };
});
