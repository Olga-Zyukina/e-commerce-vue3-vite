import * as dotenv from 'dotenv'
dotenv.config()
const userId = process.env.USER_ID ? Number(process.env.USER_ID) : 1

import { useProductsStore } from "../stores/products"
import { useUserStore } from "../stores/user"
import { useCartsStore } from "../stores/cart"
import { useOrdersStore } from "../stores/orders"
import { useTaxesStore } from "../stores/taxes"

const fetchData = async (url: string) => {
  try {
    const { data: data } = await useFetch(url);
    return data.value;
  } catch (e) {
    console.error("API Error: No data available", e);
  }
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const productsStore = useProductsStore();
  const userStore = useUserStore();
  const cartStore = useCartsStore();
  const orderStore = useOrdersStore();
  const taxesStore = useTaxesStore();

  const productsData = await fetchData("/api/products") as Omit<ProductsListData,"rate" | "count">[];
  productsStore.products = productsData as Omit<ProductsListData,"rate" | "count">[];
  productsStore.categories = [
    ...new Set<string>(
      productsData.map((p: { category: string }) => p.category),
    ),
  ];

  const usersData = await fetchData("/api/users") as UserData[];
  let userById = usersData?.find((item: { id: number }) => item.id === userId);
  if (userById) {
    userStore.user = userById;
    userStore.countWish = userById.wish.length;
  }

  const cartsData = await fetchData("/api/carts") as Cart[];
  let cartById = cartsData?.find((item: { id: number }) => item.id === userId);
  if (cartById) {
    cartById.cart.forEach((item) => {
      let product = productsData?.find(
        ({ id }: { id: number }) => id == item.idProduct,
      );
      let newsItem = {
        id: item.idProduct || 0,
        title: product?.title || "",
        price: product?.price || 0,
        description: product?.description || "",
        category: product?.category || "",
        image: product?.image || "",
        quantity: item.count,
        rating: {
          rate: product?.rating.rate || 0,
          count: product?.rating.count || 0,
        },
      };
      cartStore.cart.push(newsItem);
    });
  }

  const ordersData = await fetchData("/api/orders") as OrderData[];
  let ordersById = ordersData?.find(
    (item: { idPerson: number }) => item.idPerson === userId,
  );
  if (ordersById) {
    orderStore.orders = ordersById;
    orderStore.countOrders = orderStore.orders.orders.length;
  }

  const taxesData = await fetchData("/api/taxes") as TaxesData[];
  taxesStore.taxes = taxesData as TaxesData[];
});