<script setup lang="ts">
import AppHeader from "../components/Header.vue";
import AppFooter from "../components/Footer.vue";
</script>

<template>
  <AppHeader />
  <main class="main">
    <div class="page-title light-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">404</h1>
        <nav class="breadcrumbs">
          <ol>
            <li>
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li class="current">404</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->
    <section id="error-404" class="error-404 section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="text-center">
          <div class="error-icon mb-4" data-aos="zoom-in" data-aos-delay="200">
            <i class="bi bi-exclamation-circle"></i>
          </div>
          <h1 class="error-code mb-4" data-aos="fade-up" data-aos-delay="300">404</h1>
          <h2 class="error-title mb-3" data-aos="fade-up" data-aos-delay="400">Oops! Page Not Found</h2>
          <p class="error-text mb-4" data-aos="fade-up" data-aos-delay="500">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div class="error-action" data-aos="fade-up" data-aos-delay="700">
            <RouterLink :to="{ name: 'home' }" class="btn btn-primary">
              Back to Home
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <!-- End Error 404 Section -->
  </main>
  <AppFooter />
</template>

<style scoped>
/** Error 404 Section */
.error-404 {
  padding: 80px 0;
  margin: 0 auto;
}
.error-404 .error-icon {
  font-size: 5rem;
  color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.error-404 .error-code {
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 800;
  color: color-mix(in srgb, var(--heading-color), transparent 10%);
  font-family: var(--heading-font);
  line-height: 1;
}
.error-404 .error-title {
  font-size: 2rem;
  color: var(--heading-color);
  font-weight: 600;
}
.error-404 .error-text {
  font-size: 1.1rem;
  color: color-mix(in srgb, var(--default-color), transparent 20%);
  max-width: 600px;
  margin: 0 auto;
}
.error-404 .search-box {
  max-width: 500px;
  margin: 0 auto;
}
.error-404 .search-box .input-group {
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.error-404 .search-box .form-control {
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: var(--default-color);
  background-color: var(--surface-color);
  border-radius: 50px;
}
.error-404 .search-box .form-control:focus {
  box-shadow: none;
  border-color: var(--accent-color);
}
.error-404 .search-box .form-control::placeholder {
  color: color-mix(in srgb, var(--default-color), transparent 60%);
}
.error-404 .search-box .search-btn {
  background-color: var(--accent-color);
  color: var(--contrast-color);
  border: none;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}
.error-404 .search-box .search-btn:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
}
.error-404 .error-action .btn-primary {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  background-color: var(--accent-color);
  border: none;
  color: var(--contrast-color);
  border-radius: 50px;
  transition: all 0.3s ease;
}
.error-404 .error-action .btn-primary:hover {
  background-color: color-mix(in srgb, var(--accent-color), transparent 15%);
  transform: translateY(-2px);
}
@media (max-width: 768px) {
  .error-404 {
    padding: 60px 0;
  }
  .error-404 .error-code {
    font-size: clamp(4rem, 12vw, 8rem);
  }
  .error-404 .error-title {
    font-size: 1.5rem;
  }
  .error-404 .error-text {
    font-size: 1rem;
    padding: 0 20px;
  }
  .error-404 .search-box {
    margin: 0 20px;
  }
}
</style>