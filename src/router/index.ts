import { createRouter, createWebHistory } from "vue-router";
import { ROUTES_PATHS } from "../constants";

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Catalog from "../pages/Catalog.vue";
import Product from "../pages/Product.vue";
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";
import Contact from "../pages/Contact.vue";
import Account from "../pages/Account.vue";
import Error from "../pages/Error-404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: "home",
      component: Home,
      props: true,
    },
    {
      path: ROUTES_PATHS.ABOUT,
      name: "about",
      component: About,
    },
    {
      path: ROUTES_PATHS.CATALOG,
      name: "catalog",
      component: Catalog,
    },
    {
      path: ROUTES_PATHS.PRODUCT,
      name: "product",
      component: Product,
      props: true,
    },
    {
      path: ROUTES_PATHS.CART,
      name: "cart",
      component: Cart,
    },
    {
      path: ROUTES_PATHS.CHECKOUT,
      name: "checkout",
      component: Checkout,
    },
    {
      path: ROUTES_PATHS.CONTACT,
      name: "contact",
      component: Contact,
    },
    {
      path: ROUTES_PATHS.ACCOUNT,
      name: "account",
      component: Account,
    },
    {
      path: ROUTES_PATHS.ERROR,
      name: "error",
      component: Error,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
