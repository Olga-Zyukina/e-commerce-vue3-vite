<script setup lang="ts">
import { computed, ref } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
import { useRootStore } from '../stores/root';

const rootStore = useRootStore();
const cartItems = ref(rootStore.cartItems);
const taxes = ref(rootStore.taxes);
const totalSum = computed(() =>  cartItems.value.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0));
const sumTaxes = computed(() =>  taxes.value.reduce((sum: number, item: { value: number }) => sum + item.value, 0));

const increase = (item: { quantity: number; }) => {
  item.quantity += 1;
}
const decrease = (item: { quantity: number; }) => {
  if (item.quantity > 1) {
    item.quantity -= 1;
  }
}
const remove = (index: any) => {
  cartItems.value.splice(index, 1);
}
</script>

<template>
  <AppHeader />

  <main class="main">
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Cart</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">Cart</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <section id="cart" class="cart section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row">
          <div class="col-lg-8" data-aos="fade-up" data-aos-delay="200">
            <div class="cart-items">
              <div class="cart-header d-none d-lg-block">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <h5>Product</h5>
                  </div>
                  <div class="col-lg-2 text-center">
                    <h5>Price</h5>
                  </div>
                  <div class="col-lg-2 text-center">
                    <h5>Quantity</h5>
                  </div>
                  <div class="col-lg-2 text-center">
                    <h5>Total</h5>
                  </div>
                </div>
              </div>
              <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
                <div class="row align-items-center">
                  <div class="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                    <div class="product-info d-flex align-items-center">
                      <div class="product-image">
                        <img :src="item.image" :alt="item.title" class="img-fluid" loading="lazy">
                      </div>
                      <div class="product-details">
                        <h6 class="product-title">{{ item.title }}</h6>
                        <button @click="remove(index)" class="remove-item" type="button">
                          <i class="bi bi-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                    <div class="price-tag">
                      <span class="current-price">${{ item.price }}</span>
                    </div>
                  </div>
                  <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                    <div class="quantity-selector">
                      <button @click="decrease(item)" class="quantity-btn decrease">
                        <i class="bi bi-dash"></i>
                      </button>
                      <input type="number" v-model="item.quantity" value="item.quantity" min="1" class="quantity-input">
                      <button @click="increase(item)" class="quantity-btn increase">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                    <div class="item-total">
                      <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Cart Items -->
          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <div class="cart-summary">
              <h4 class="summary-title">Order Summary</h4>
              <div class="summary-item">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${{ totalSum.toFixed(2) }}</span>
              </div>
              <div v-for="tax in taxes" :key="tax.id" class="summary-item">
                <span class="summary-label">{{ tax.title }}</span>
                <span class="summary-value">{{ (totalSum * tax.value).toFixed(2) }}$</span>
              </div>
              <div class="summary-total">
                <span class="summary-label">Total</span>
                <span class="summary-value">{{ (totalSum * (1 + sumTaxes)).toFixed(2) }}$</span>
              </div>
              <div class="checkout-button">
                <RouterLink :to="{ name: 'checkout' }" class="btn btn-accent w-100">
                  Proceed to Checkout <i class="bi bi-arrow-right"></i>
                </RouterLink>
              </div>
              <div class="continue-shopping">
                <RouterLink :to="{ name: 'catalog' }" class="btn btn-link w-100">
                  <i class="bi bi-arrow-left"></i> Continue Shopping
                </RouterLink>
              </div>
              <div class="payment-methods">
                <p class="payment-title">We Accept</p>
                <div class="payment-icons">
                  <i class="bi bi-credit-card"></i>
                  <i class="bi bi-wallet2"></i>
                  <i class="bi bi-bank"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- End Cart Summary -->
        </div>
      </div>
    </section>
    <!-- End Cart Section -->
  </main>

  <AppFooter />
</template>

<style scoped>
</style>