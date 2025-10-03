import { computed, ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import {
  URL_ALL_PRODUCTS,
  URL_TAXES,
  URL_PERSONS,
  URL_ORDERS,
} from "../constants/api";

export const useRootStore = defineStore("root", () => {
  const products: any = ref([]);
  const categories: any = ref([]);
  const cartItems: any = ref([]);
  const error: any = ref(null);
  const taxes: any = ref([]);
  const person: any = ref([]);
  const idPersons: any = ref(1);
  const orders: any = ref([]);
  const countWish: any = ref(null);
  const countOrders: any = ref(null);

  const countCartItems = computed(() => cartItems.value.length);
  const product1 = computed(() => getProduct(1));
  const product5 = computed(() => getProduct(5));
  const product14 = computed(() => getProduct(14));

  const getProduct = (_id: number) => {
    return products.value.find(({ id }: { id: number }) => id == _id);
  };
  async function fetchProducts() {
    try {
      const data = await axios.get(URL_ALL_PRODUCTS);
      products.value = data?.data;
      categories.value = [
        ...new Set(data?.data.map((p: { category: any }) => p.category)),
      ];
    } catch (e) {
      console.error("API Error:", e);
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          error.value =
            "Unable to connect to the server. Please try again later";
        } else {
          error.value =
            "An error occurred while fetching data. Please try again";
        }
      } else {
        error.value = "An unexpected error occurred. Please try again";
      }
    }
  }
  async function fetchTaxes() {
    try {
      const data = await axios.get(URL_TAXES);
      taxes.value = data?.data;
    } catch (e) {
      console.error("API Error:", e);
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          error.value =
            "Unable to connect to the server. Please try again later";
        } else {
          error.value =
            "An error occurred while fetching data. Please try again";
        }
      } else {
        error.value = "An unexpected error occurred. Please try again";
      }
    }
  }
  async function fetchPersons(idPersons: any) {
    try {
      const data = await axios.get(URL_PERSONS);
      person.value = data?.data.find(
        (item: { id: any }) => item.id == idPersons
      );
      countWish.value = person.value.wish.length;
    } catch (e) {
      console.error("API Error:", e);
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          error.value =
            "Unable to connect to the server. Please try again later";
        } else {
          error.value =
            "An error occurred while fetching data. Please try again";
        }
      } else {
        error.value = "An unexpected error occurred. Please try again";
      }
    }
  }
  async function fetchOrders(idPersons: any) {
    try {
      const data = await axios.get(URL_ORDERS);
      orders.value = data?.data.find(
        (item: { idPerson: any }) => item.idPerson == idPersons
      );
      countOrders.value = orders.value.orders.length;
    } catch (e) {
      console.error("API Error:", e);
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          error.value =
            "Unable to connect to the server. Please try again later";
        } else {
          error.value =
            "An error occurred while fetching data. Please try again";
        }
      } else {
        error.value = "An unexpected error occurred. Please try again";
      }
    }
  }
  function addToCart(idProduct: number, count: any = 1) {
    if (products.value) {
      const addItem: any = cartItems.value.find(
        ({ id }: { id: number }) => id == idProduct
      );
      if (addItem) {
        addItem.quantity = addItem.quantity + count;
      } else {
        const newsItem: any = products.value.find(
          ({ id }: { id: number }) => id == idProduct
        );
        if (newsItem) {
          newsItem.quantity = count;
          cartItems.value.push(newsItem);
        }
      }
    } else {
      throw new Error("No news data available");
    }
  }
  function addToWish(idProduct: number) {
    if (person.value) {
      if (!person.value.wish.includes(idProduct)) {
        person.value.wish.push(idProduct);
        countWish.value = person.value.wish.length;
      }
    } else {
      throw new Error("No news data available");
    }
  }
  return {
    products,
    cartItems,
    categories,
    taxes,
    idPersons,
    person,
    orders,
    countCartItems,
    error,
    product1,
    product5,
    product14,
    countWish,
    countOrders,
    fetchProducts,
    fetchTaxes,
    fetchPersons,
    fetchOrders,
    addToCart,
    addToWish,
    getProduct
  };
});
