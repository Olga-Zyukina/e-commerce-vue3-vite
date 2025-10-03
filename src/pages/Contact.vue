<script setup lang="ts">
import { onMounted } from "vue";
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";

// Form Validation
const checkoutForm = () => {
  const checkoutForm = document.querySelector('.php-email-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const successMessage = document.querySelector<HTMLElement>('.sent-message');
      if (successMessage) {
        successMessage.classList.remove('d-none');
        successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
      }
      const formInputs = checkoutForm.querySelectorAll<HTMLInputElement>('input, select, textarea');
      formInputs.forEach(input => {
        input.value = "";
      });
      setTimeout(() => {
        console.log('Redirecting to order confirmation page...');
      }, 3000);
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
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Contact</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">Contact</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <section id="contact-2" class="contact-2 section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4 mb-5">
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="contact-info-box">
              <div class="icon-box">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div class="info-content">
                <h4>Our Address</h4>
                <p>123 Fashion Street, Moscow, 10001</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div class="contact-info-box">
              <div class="icon-box">
                <i class="bi bi-envelope"></i>
              </div>
              <div class="info-content">
                <h4>Email Address</h4>
                <p>info@ecommerce.ru</p>
                <p>contact@ecommerce.ru</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div class="contact-info-box">
              <div class="icon-box">
                <i class="bi bi-headset"></i>
              </div>
              <div class="info-content">
                <h4>Hours of Operation</h4>
                <p>Monday-Friday: 9 AM - 6 PM</p>
                <p>Saturday: 10 AM - 4 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Contact Info Boxes -->
      <div class="map-section" data-aos="fade-up" data-aos-delay="200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4490.545069631029!2d37.62228177978517!3d55.753767751350125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a598b4552fd%3A0xd2f2265b70fe6a05!2z0JPQo9Cc!5e0!3m2!1sru!2sru!4v1758712533806!5m2!1sru!2sru"
          width="600" height="450" style="border:0;" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <!-- End Google Maps -->
      <div class="container form-container-overlap">
        <div class="row justify-content-center" data-aos="fade-up" data-aos-delay="300">
          <div class="col-lg-10">
            <div class="contact-form-wrapper">
              <h2 class="text-center mb-4">Get in Touch</h2>
              <form method="post" class="php-email-form">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="input-with-icon">
                        <i class="bi bi-person"></i>
                        <input type="text" class="form-control" name="name" placeholder="First Name" required>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="input-with-icon">
                        <i class="bi bi-envelope"></i>
                        <input type="email" class="form-control" name="email" placeholder="Email Address" required>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <div class="input-with-icon">
                        <i class="bi bi-text-left"></i>
                        <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <div class="input-with-icon">
                        <i class="bi bi-chat-dots message-icon"></i>
                        <textarea class="form-control" name="message" placeholder="Write Message..."
                          style="height: 180px" required></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message d-none">Your message has been sent. Thank you!</div>
                  </div>
                  <div class="col-12 text-center">
                    <button type="submit" class="btn btn-primary btn-submit">SEND MESSAGE</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- End Contact Form Section -->
    </section>
    <!-- End Contact Section -->
  </main>

  <AppFooter />
</template>

<style scoped>
/** Contact 2 Section */
.contact-2 .contact-info-box {
  background-color: var(--surface-color);
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  padding: 25px;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 15px;
}
.contact-2 .contact-info-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}
.contact-2 .contact-info-box .icon-box {
  background-color: color-mix(in srgb, var(--accent-color), transparent 90%);
  color: var(--accent-color);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-2 .contact-info-box .icon-box i {
  font-size: 24px;
}
.contact-2 .contact-info-box .info-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.contact-2 .contact-info-box .info-content p {
  margin-bottom: 5px;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
  font-size: 15px;
  line-height: 1.5;
}
.contact-2 .contact-info-box .info-content p:last-child {
  margin-bottom: 0;
}
.contact-2 .map-section {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}
.contact-2 .map-section iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.contact-2 .form-container-overlap {
  position: relative;
  margin-top: -150px;
  margin-bottom: 60px;
  z-index: 10;
}
.contact-2 .contact-form-wrapper {
  background-color: var(--surface-color);
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  padding: 40px;
}
.contact-2 .contact-form-wrapper h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
}
.contact-2 .contact-form-wrapper h2:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: var(--accent-color);
}
.contact-2 .contact-form-wrapper .form-group {
  margin-bottom: 20px;
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon {
  position: relative;
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  font-size: 18px;
  z-index: 10;
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon i.message-icon {
  top: 28px;
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon textarea+i {
  top: 25px;
  transform: none;
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon .form-control {
  border-radius: 8px;
  padding: 12px 15px 12px 45px;
  height: 3.5rem;
  color: var(--default-color);
  background-color: var(--surface-color);
  font-size: 15px;
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 80%);
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon .form-control:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--accent-color), transparent 90%);
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon .form-control::placeholder {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
}
.contact-2 .contact-form-wrapper .form-group .input-with-icon textarea.form-control {
  height: 180px;
  resize: none;
  padding-top: 15px;
}
.contact-2 .contact-form-wrapper .btn-submit {
  background-color: var(--accent-color);
  border: none;
  color: var(--contrast-color);
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px color-mix(in srgb, var(--accent-color), transparent 70%);
}
.contact-2 .contact-form-wrapper .btn-submit:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color), transparent 60%);
}
.contact-2 .contact-form-wrapper .btn-submit:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px color-mix(in srgb, var(--accent-color), transparent 70%);
}
.contact-2 .contact-form-wrapper .loading,
.contact-2 .contact-form-wrapper .error-message,
.contact-2 .contact-form-wrapper .sent-message {
  margin-top: 10px;
  margin-bottom: 20px;
}
@media (max-width: 992px) {
  .contact-2 .form-container-overlap {
    margin-top: -120px;
  }
  .contact-2 .contact-form-wrapper {
    padding: 30px;
  }
}
@media (max-width: 768px) {
  .contact-2 .contact-info-box {
    margin-bottom: 20px;
  }
  .contact-2 .form-container-overlap {
    margin-top: -100px;
  }
  .contact-2 .contact-form-wrapper {
    padding: 25px;
  }
  .contact-2 .contact-form-wrapper h2 {
    font-size: 24px;
  }
  .contact-2 .map-section {
    height: 450px;
  }
}
@media (max-width: 576px) {
  .contact-2 .form-container-overlap {
    margin-top: -80px;
  }
  .contact-2 .contact-form-wrapper {
    padding: 20px;
  }
  .contact-2 .btn-submit {
    width: 100%;
  }
  .contact-2 .map-section {
    height: 400px;
  }
}
</style>