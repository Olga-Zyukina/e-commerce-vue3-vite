import { computed, ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import {
  URL_ALL_PRODUCTS,
  URL_TAXES,
  URL_PERSONS,
  URL_ORDERS,
} from "../constants/api";
import type {
  ProductsListData,
  PersonData,
  CartItemsData,
  OrderData,
  TaxesData,
} from "../types/index";

export const useRootStore = defineStore("root", () => {
  const products = ref<Omit<ProductsListData, "rate" | "count">[]>([]);
  const categories = ref<string[]>([]);
  const cartItems = ref<Omit<CartItemsData, "rate" | "count">[]>([]);
  const error = ref<string | null>(null);
  const taxes = ref<TaxesData[]>();
  const person = ref<PersonData>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    status: "",
    orderUpdates: false,
    promotions: false,
    newsLetter: true,
    password: "",
    paymentMethods: [
      {
        paySystem: "",
        number: "",
        expires: "",
      },
    ],
    reviews: [
      {
        idProduct: 0,
        rating: 0,
        data: "",
        review: "",
      },
    ],
    wish: [],
  });
  const idPersons = ref<number>(1);
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
  const countWish = ref<number>(0);
  const countOrders = ref<number>(0);

  const countCartItems = computed(() => cartItems.value.length);
  const product1 = computed(() => getProduct(1));
  const product5 = computed(() => getProduct(5));
  const product14 = computed(() => getProduct(14));

  const getProduct = (_id: number) => {
    return products?.value?.find(({ id }: { id: number }) => id == _id) || {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    };
  };
  async function fetchProducts() {
    try {
      const data = await axios.get(URL_ALL_PRODUCTS);
      products.value = data?.data;
      categories.value = [
        ...new Set<string>(data?.data.map((p: { category: string }) => p.category))
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
  async function fetchPersons(idPersons: number) {
    try {
      const data = await axios.get(URL_PERSONS);
      person.value = data?.data.find(
        (item: { id: number }) => item.id === idPersons,
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
  async function fetchOrders(idPersons: number) {
    try {
      const data = await axios.get(URL_ORDERS);
      orders.value = data?.data.find(
        (item: { idPerson: number }) => item.idPerson === idPersons,
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
  async function addToCart(idProduct: number, count: number = 1) {
    if (products.value.length >= 1) {
      const addItem = cartItems.value.find(
        ({ id }: { id: number }) => id == idProduct,
      );
      if (addItem) {
        addItem.quantity = addItem.quantity + count;
      } else {
        let searchItem = products.value.find(
          ({ id }: { id: number }) => id == idProduct,
        );
        const newsItem: Omit<CartItemsData, "rate" | "count"> = {
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
        if (newsItem.id !=0) {
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
    getProduct,
  };
});
