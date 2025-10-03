<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
import { useRootStore } from '../stores/root';

const rootStore = useRootStore();
const cartItems = ref(rootStore.cartItems);
const taxes = ref(rootStore.taxes);
const totalSum = computed(() =>  cartItems.value.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0));
const sumTaxes = computed(() =>  taxes.value.reduce((sum: number, item: { value: number }) => sum + item.value, 0));

const checkoutForm = () => {
  const checkoutForm = document.querySelector('.checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const requiredFields = checkoutForm.querySelectorAll<HTMLInputElement>('[required]');
      let isValid: boolean | null = true;
      requiredFields.forEach(field  => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
          if (isValid === false) {
            field.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
            field.focus();
            isValid = null;
          }
        } else {
          field.classList.remove('is-invalid');
        }
      });
      if (isValid === true) {
        const sections = document.querySelectorAll<HTMLElement>('.checkout-section');
        sections.forEach((section, index) => {
          if (index < sections.length - 1) {
            section.style.display = 'none';
          }
        });
        const termsCheck = document.querySelector<HTMLElement>('.terms-check');
        const placeOrderContainer = document.querySelector<HTMLElement>('.place-order-container');
        if (termsCheck) termsCheck.style.display = 'none';
        if (placeOrderContainer) placeOrderContainer.style.display = 'none';
        const successMessage = document.querySelector<HTMLElement>('.success-message');
        if (successMessage) {
          successMessage.classList.remove('d-none');
          successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
        }
        const orderReview = document.getElementById('order-review');
        if (orderReview) {
          orderReview.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        setTimeout(() => {
          console.log('Redirecting to order confirmation page...');
        }, 3000);
      }
    });
  }
}
onMounted(() => {
  checkoutForm();
})
</script>

<template>
  <AppHeader />

  <main class="main">
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Checkout</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">Checkout</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <section id="checkout" class="checkout section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row">
          <div class="col-lg-7">
            <div class="checkout-container" data-aos="fade-up">
              <form class="checkout-form">
                <div class="checkout-section" id="customer-info">
                  <div class="section-header">
                    <div class="section-number">1</div>
                    <h3>Customer Information</h3>
                  </div>
                  <div class="section-content">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <label for="first-name">First Name</label>
                        <input type="text" name="first-name" class="form-control" id="first-name" placeholder="Your First Name" required>
                      </div>
                      <div class="col-md-6 form-group">
                        <label for="last-name">Last Name</label>
                        <input type="text" name="last-name" class="form-control" id="last-name" placeholder="Your Last Name" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="email">Email Address</label>
                      <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone Number</label>
                      <input type="tel" class="form-control" name="phone" id="phone" placeholder="Your Phone Number" required>
                    </div>
                  </div>
                </div>
                <!-- End Customer Information -->
                <div class="checkout-section" id="shipping-address">
                  <div class="section-header">
                    <div class="section-number">2</div>
                    <h3>Shipping Address</h3>
                  </div>
                  <div class="section-content">
                    <div class="form-group">
                      <label for="address">Street Address</label>
                      <input type="text" class="form-control" name="address" id="address" placeholder="Street Address" required>
                    </div>
                    <div class="form-group">
                      <label for="apartment">Apartment, Suite, etc. (optional)</label>
                      <input type="text" class="form-control" name="apartment" id="apartment" placeholder="Apartment, Suite, Unit, etc.">
                    </div>
                    <div class="row">
                      <div class="col-md-4 form-group">
                        <label for="city">City</label>
                        <input type="text" name="city" class="form-control" id="city" placeholder="City" required>
                      </div>
                      <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input type="text" name="state" class="form-control" id="state" placeholder="State" required>
                      </div>
                      <div class="col-md-4 form-group">
                        <label for="zip">ZIP Code</label>
                        <input type="text" name="zip" class="form-control" id="zip" placeholder="ZIP Code" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="country">Country</label>
                      <select class="form-select" id="country" name="country" required>
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="save-address" name="save-address">
                      <label class="form-check-label" for="save-address">
                        Save this address for future orders
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="billing-same" name="billing-same" required checked>
                      <label class="form-check-label" for="billing-same">
                        Billing address same as shipping
                      </label>
                    </div>
                  </div>
                </div>
                <!-- End Shipping Address -->
                <div class="checkout-section" id="payment-method">
                  <div class="section-header">
                    <div class="section-number">3</div>
                    <h3>Payment Info</h3>
                  </div>
                  <div class="section-content">
                    <div class="payment-details" id="credit-card-details">
                      <div class="form-group">
                        <label for="card-number">Credit / Debit Card Number</label>
                        <div class="card-number-wrapper">
                          <input type="text" class="form-control" name="card-number" id="card-number" placeholder="1234 5678 9012 3456" required>
                          <div class="card-icons">
                            <i class="bi bi-credit-card-2-front"></i>
                            <i class="bi bi-credit-card"></i>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="expiry">Expiration Date</label>
                          <input type="text" class="form-control" name="expiry" id="expiry" placeholder="MM/YY" required>
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="cvv">Security Code (CVV)</label>
                          <div class="cvv-wrapper">
                            <input type="text" class="form-control" name="cvv" id="cvv" placeholder="123" required>
                            <span class="cvv-hint" data-bs-toggle="tooltip" data-bs-placement="top" title="3-digit code on the back of your card">
                              <i class="bi bi-question-circle"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="card-name">Name on Card</label>
                        <input type="text" class="form-control" name="card-name" id="card-name" placeholder="Lorem, ipsum" required>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Payment Info -->
                <div class="checkout-section" id="order-review">
                  <div class="section-header">
                    <div class="section-number">4</div>
                    <h3>Review &amp; Place Order</h3>
                  </div>
                  <div class="section-content">
                    <div class="form-check terms-check">
                      <input class="form-check-input" type="checkbox" id="terms" name="terms" required checked>
                      <label class="form-check-label" for="terms">
                        I agree to the 
                        <RouterLink :to="{ name: 'checkout' }">
                          Terms and Conditions
                        </RouterLink>
                        and
                        <RouterLink :to="{ name: 'checkout' }">
                          Privacy Policy
                        </RouterLink>
                       </label>
                    </div>
                    <div class="success-message d-none">Your order has been placed successfully! Thank you for your purchase</div>
                    <div class="place-order-container">
                      <button type="submit" class="btn btn-primary place-order-btn">
                        <span class="btn-text">Place Order</span>
                        <span class="btn-price">${{ (totalSum * ( 1 + sumTaxes)).toFixed(2) }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- End Order Review -->
          <div class="col-lg-5">
            <div class="order-summary" data-aos="fade-left" data-aos-delay="200">
              <div class="order-summary-header">
                <h3>Order Summary</h3>
                <span class="item-count">{{ cartItems.length }} Items</span>
              </div>
              <div class="order-summary-content">
                <div class="order-items">
                  <div v-for="(item, index) in cartItems" :key="index" class="order-item">
                    <div class="order-item-image">
                      <img :src="item.image" :alt="item.title" class="img-fluid">
                    </div>
                    <div class="order-item-details">
                      <h4>{{ item.title }}</h4>
                      <div class="order-item-price">
                        <span class="quantity">{{ item.quantity }} ×</span>
                        <span class="price">${{ item.price }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="promo-code">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Promo Code" aria-label="Promo Code">
                    <button class="btn btn-outline-primary" type="button">Apply</button>
                  </div>
                </div>
                <div class="order-totals">
                  <div class="order-subtotal d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>{{ totalSum.toFixed(2) }}$</span>
                  </div>
                  <div v-for="tax in taxes" :key="tax.id" class="order-tax d-flex justify-content-between">
                    <span>{{ tax.title }}</span>
                    <span>{{ (totalSum * tax.value).toFixed(2) }}$</span>
                  </div>
                  <div class="order-total d-flex justify-content-between">
                    <span>Total</span>
                    <span>{{ (totalSum * (1 + sumTaxes)).toFixed(2) }}$</span>
                  </div>
                </div>
                <div class="secure-checkout">
                  <div class="secure-checkout-header">
                    <i class="bi bi-shield-lock"></i>
                    <span>Secure Checkout</span>
                  </div>
                  <div class="payment-icons">
                    <i class="bi bi-credit-card-2-front"></i>
                    <i class="bi bi-credit-card"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Order Summary -->
        </div>
      </div>
    </section>
    <!-- End Checkout Section -->
  </main>

  <AppFooter />
</template>

<style scoped>
/*--------------------------------------------------------------
# Checkout Section
--------------------------------------------------------------*/
.checkout .checkout-container {
  margin-bottom: 2rem;
}
.checkout .checkout-container .checkout-form {
  position: relative;
}
.checkout .checkout-section {
  background-color: var(--surface-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.checkout .checkout-section:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}
.checkout .checkout-section .section-header {
  padding: 20px 24px;
  background-color: color-mix(in srgb, var(--surface-color), var(--background-color) 30%);
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
}
.checkout .checkout-section .section-header .section-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: var(--contrast-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.checkout .checkout-section .section-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--heading-color);
}
.checkout .checkout-section .section-content {
  padding: 24px;
}
.checkout .checkout-section .section-content .form-group {
  margin-bottom: 20px;
}
.checkout .checkout-section .section-content .form-group:last-child {
  margin-bottom: 0;
}
.checkout .checkout-section .section-content .form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--heading-color);
}
.checkout .checkout-section .section-content .form-group .form-control,
.checkout .checkout-section .section-content .form-group .form-select {
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 85%);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.95rem;
  height: auto;
  background-color: var(--surface-color);
  transition: all 0.25s ease;
}
.checkout .checkout-section .section-content .form-group .form-control:hover,
.checkout .checkout-section .section-content .form-group .form-select:hover {
  border-color: color-mix(in srgb, var(--accent-color), transparent 60%);
}
.checkout .checkout-section .section-content .form-group .form-control:focus,
.checkout .checkout-section .section-content .form-group .form-select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color), transparent 85%);
  outline: none;
}
.checkout .checkout-section .section-content .form-group .form-control::placeholder,
.checkout .checkout-section .section-content .form-group .form-select::placeholder {
  color: color-mix(in srgb, var(--default-color), transparent 60%);
  font-size: 0.9rem;
}
.checkout .checkout-section .section-content .form-group .form-control.is-invalid,
.checkout .checkout-section .section-content .form-group .form-select.is-invalid {
  border-color: #dc3545;
  background-image: none;
}
.checkout .checkout-section .section-content .form-group .form-control.is-invalid:focus,
.checkout .checkout-section .section-content .form-group .form-select.is-invalid:focus {
  box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.15);
}
.checkout .checkout-section .section-content .form-group .form-select {
  background-position: right 16px center;
  padding-right: 40px;
}
.checkout .checkout-section .section-content .form-group .card-number-wrapper {
  position: relative;
}
.checkout .checkout-section .section-content .form-group .card-number-wrapper .card-icons {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
}
.checkout .checkout-section .section-content .form-group .card-number-wrapper .card-icons i {
  font-size: 1.2rem;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.checkout .checkout-section .section-content .form-group .card-number-wrapper input {
  padding-right: 80px;
}
.checkout .checkout-section .section-content .form-group .cvv-wrapper {
  position: relative;
}
.checkout .checkout-section .section-content .form-group .cvv-wrapper .cvv-hint {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  cursor: pointer;
  transition: color 0.2s ease;
}
.checkout .checkout-section .section-content .form-group .cvv-wrapper .cvv-hint:hover {
  color: var(--accent-color);
}
.checkout .checkout-section .section-content .form-check {
  margin-bottom: 12px;
  padding-left: 1.8rem;
}
.checkout .checkout-section .section-content .form-check:last-child {
  margin-bottom: 0;
}
.checkout .checkout-section .section-content .form-check .form-check-input {
  width: 18px;
  height: 18px;
  margin-left: -1.8rem;
  margin-top: 0.2rem;
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 70%);
  background-color: var(--surface-color);
  cursor: pointer;
}
.checkout .checkout-section .section-content .form-check .form-check-input:checked {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
.checkout .checkout-section .section-content .form-check .form-check-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color), transparent 85%);
}
.checkout .checkout-section .section-content .form-check .form-check-label {
  font-size: 0.9rem;
  cursor: pointer;
}
.checkout .checkout-section .section-content .form-check .form-check-label a {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
}
.checkout .checkout-section .section-content .form-check .form-check-label a:hover {
  text-decoration: underline;
}

.checkout .checkout-section .section-content .form-check.terms-check {
  margin-top: 10px;
  margin-bottom: 20px;
}
.checkout .checkout-section .section-content .form-check.terms-check .form-check-label {
  font-size: 0.85rem;
}
.checkout .checkout-section .section-content .payment-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}
.checkout .checkout-section .section-content .payment-options .payment-option {
  flex: 1;
  min-width: 120px;
  position: relative;
}
.checkout .checkout-section .section-content .payment-options .payment-option input[type=radio] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.checkout .checkout-section .section-content .payment-options .payment-option input[type=radio]:checked+label {
  border-color: var(--accent-color);
  background-color: color-mix(in srgb, var(--accent-color), transparent 95%);
}
.checkout .checkout-section .section-content .payment-options .payment-option input[type=radio]:checked+label .payment-icon {
  color: var(--accent-color);
}
.checkout .checkout-section .section-content .payment-options .payment-option input[type=radio]:focus+label {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color), transparent 85%);
}
.checkout .checkout-section .section-content .payment-options .payment-option label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 85%);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
  height: 100%;
}
.checkout .checkout-section .section-content .payment-options .payment-option label:hover {
  border-color: color-mix(in srgb, var(--accent-color), transparent 60%);
}
.checkout .checkout-section .section-content .payment-options .payment-option label .payment-icon {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: color-mix(in srgb, var(--default-color), transparent 30%);
  transition: color 0.25s ease;
}
.checkout .checkout-section .section-content .payment-options .payment-option label .payment-label {
  font-size: 0.9rem;
  font-weight: 500;
}
.checkout .checkout-section .section-content .payment-options .payment-option.active label {
  border-color: var(--accent-color);
  background-color: color-mix(in srgb, var(--accent-color), transparent 95%);
}
.checkout .checkout-section .section-content .payment-options .payment-option.active label .payment-icon {
  color: var(--accent-color);
}
@media (max-width: 575.98px) {
  .checkout .checkout-section .section-content .payment-options .payment-option {
    min-width: 100%;
  }
  .checkout .checkout-section .section-content .payment-options .payment-option label {
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
  }
  .checkout .checkout-section .section-content .payment-options .payment-option label .payment-icon {
    margin-bottom: 0;
  }
}
.checkout .checkout-section .section-content .payment-details {
  padding-top: 8px;
}
.checkout .checkout-section .section-content .payment-details.d-none {
  display: none;
}
.checkout .checkout-section .section-content .payment-details .payment-info {
  padding: 16px;
  background-color: color-mix(in srgb, var(--surface-color), var(--background-color) 50%);
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 0;
}
.checkout .checkout-section .section-content .success-message {
  padding: 16px;
  background-color: rgba(40, 167, 69, 0.1);
  border: 1px solid rgba(40, 167, 69, 0.2);
  border-radius: 12px;
  color: #28a745;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}
.checkout .checkout-section .section-content .success-message.d-none {
  display: none;
}
.checkout .checkout-section .section-content .place-order-container .place-order-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  background-color: var(--accent-color);
  border: none;
  box-shadow: 0 4px 12px rgba(54, 144, 231, 0.2);
  transition: all 0.3s ease;
}
.checkout .checkout-section .section-content .place-order-container .place-order-btn:hover {
  background-color: color-mix(in srgb, var(--accent-color), #000 10%);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(54, 144, 231, 0.25);
}
.checkout .checkout-section .section-content .place-order-container .place-order-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(54, 144, 231, 0.2);
}
.checkout .checkout-section .section-content .place-order-container .place-order-btn .btn-price {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
}

.checkout .order-summary {
  background-color: var(--surface-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 100px;
}
.checkout .order-summary .order-summary-header {
  padding: 20px 24px;
  border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkout .order-summary .order-summary-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.checkout .order-summary .order-summary-header .item-count {
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--default-color), transparent 30%);
  background-color: color-mix(in srgb, var(--surface-color), var(--background-color) 50%);
  padding: 4px 10px;
  border-radius: 20px;
}
.checkout .order-summary .order-summary-content {
  padding: 24px;
}
.checkout .order-summary .order-summary-content .order-items {
  margin-bottom: 24px;
}
.checkout .order-summary .order-summary-content .order-items .order-item {
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
}
.checkout .order-summary .order-summary-content .order-items .order-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-details {
  flex: 1;
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-details h4 {
  font-size: 1rem;
  margin-bottom: 4px;
  font-weight: 600;
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-details .order-item-variant {
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  margin-bottom: 8px;
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-details .order-item-price {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-details .order-item-price .quantity {
  color: color-mix(in srgb, var(--default-color), transparent 30%);
}
.checkout .order-summary .order-summary-content .order-items .order-item .order-item-details .order-item-price .price {
  color: var(--heading-color);
}
.checkout .order-summary .order-summary-content .promo-code {
  margin-bottom: 24px;
}
.checkout .order-summary .order-summary-content .promo-code .input-group .form-control {
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 85%);
  border-right: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  padding: 12px 16px;
  font-size: 0.95rem;
  transition: all 0.25s ease;
}
.checkout .order-summary .order-summary-content .promo-code .input-group .form-control:focus {
  border-color: var(--accent-color);
  box-shadow: none;
  outline: none;
}
.checkout .order-summary .order-summary-content .promo-code .input-group .form-control::placeholder {
  color: color-mix(in srgb, var(--default-color), transparent 60%);
  font-size: 0.9rem;
}
.checkout .order-summary .order-summary-content .promo-code .input-group .btn {
  border: 2px solid color-mix(in srgb, var(--default-color), transparent 85%);
  border-left: none;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 0 16px;
  font-weight: 500;
  color: var(--accent-color);
  background-color: var(--surface-color);
  transition: all 0.25s ease;
}
.checkout .order-summary .order-summary-content .promo-code .input-group .btn:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--contrast-color);
}
.checkout .order-summary .order-summary-content .promo-code .input-group .btn:focus {
  box-shadow: none;
}
.checkout .order-summary .order-summary-content .order-totals {
  background-color: color-mix(in srgb, var(--surface-color), var(--background-color) 30%);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}
.checkout .order-summary .order-summary-content .order-totals>div {
  margin-bottom: 12px;
  font-size: 0.95rem;
}
.checkout .order-summary .order-summary-content .order-totals>div:last-child {
  margin-bottom: 0;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed color-mix(in srgb, var(--default-color), transparent 80%);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--heading-color);
}
.checkout .order-summary .order-summary-content .secure-checkout {
  text-align: center;
}
.checkout .order-summary .order-summary-content .secure-checkout .secure-checkout-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--heading-color);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 12px;
}
.checkout .order-summary .order-summary-content .secure-checkout .secure-checkout-header i {
  color: #28a745;
  font-size: 1.1rem;
}
.checkout .order-summary .order-summary-content .secure-checkout .payment-icons {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.checkout .order-summary .order-summary-content .secure-checkout .payment-icons i {
  font-size: 1.5rem;
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
@media (max-width: 991.98px) {
  .checkout .order-summary {
    position: relative;
    top: 0;
    margin-top: 2rem;
  }
}
@media (max-width: 767.98px) {
  .checkout .checkout-section .section-header h3 {
    font-size: 1.1rem;
  }
  .checkout .order-summary .order-summary-header h3 {
    font-size: 1.1rem;
  }
}
</style>