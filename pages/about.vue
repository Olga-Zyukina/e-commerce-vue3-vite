<script setup>
useHead({
  title: 'E-commerce - About',
    meta: [
    {
      name: 'description',
      content: 'E-commerce - About',
    },
  ]
})
import PureCounter from '@srexi/purecounterjs'
import siteSettings from '@/app/settings'

const open = ref(false);
const featured = siteSettings.aboutFeaturedBoxes
const stats = siteSettings.aboutStats
const testimonials = siteSettings.aboutTestimonial

onMounted(async () => {
  const pure = new PureCounter();
})
</script>
<template>
  <div>
    <section id="about-2" class="about-2 section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <span class="section-badge"><i class="bi bi-info-circle"></i> About Us</span>
        <div class="row">
          <div class="col-lg-6">
            <h2 class="about-title">Nemo enim ipsam voluptatem quia voluptas aspernatur</h2>
            <p class="about-description">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
              saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
          </div>
          <div class="col-lg-6">
            <p class="about-text">Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
              maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
            <p class="about-text">Amet eos ut. Officiis soluta ab id dolor non sint. Corporis omnis consequatur quisquam
              ex consequuntur quo omnis. Quo eligendi cum. Amet mollitia qui quidem dolores praesentium quasi ut et.</p>
          </div>
        </div>
        <div class="row features-boxes gy-4 mt-3">
          <div v-for="(item, index) in featured" :key="index" class="col-lg-4" data-aos="fade-up"
            :data-aos-delay="item.delay">
            <div class="feature-box">
              <div class="icon-box">
                <i :class="item.icon"></i>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div id="about-modal" class="row mt-5">
          <div class="col-lg-12" data-aos="zoom-in" data-aos-delay="200">
            <div class="video-box">
              <img src="../public/img/about/about.jpg" class="img-fluid" alt="Video Thumbnail">
              <a @click="open = true" class="glightbox pulsating-play-btn"></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End About Section -->
    <section id="stats" class="stats section light-background">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div v-for="(item, index) in stats" :key="index" class="col-lg-3 col-md-6">
            <div class="stats-item">
              <i :class="item.icon"></i>
              <!-- <ClientOnly> -->
              <span data-purecounter-start="0" :data-purecounter-end="item.purecounterEnd" data-purecounter-duration="1"
                class="purecounter"></span>
              <!-- </ClientOnly> -->

              <p><strong>{{ item.title }}</strong> <span>{{ item.description }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Stats Section -->
    <section id="testimonials" class="testimonials section">
      <div class="container">
        <div class="testimonial-masonry">
          <div v-for="(item, index) in testimonials" :key="index"
            :class="['testimonial-item', { highlight: item.highlight }]" data-aos="fade-up"
            :data-aos-delay="item.delay">
            <div class="testimonial-content">
              <div class="quote-pattern">
                <i class="bi bi-quote"></i>
              </div>
              <p>{{ item.text }}</p>
              <div class="client-info">
                <div class="client-image">
                  <NuxtImg :src="item.imgsrc" />
                </div>
                <div class="client-details">
                  <h3>{{ item.name }}</h3>
                  <span class="position">{{ item.position }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   <Teleport to="#teleports">
      <div v-if="open" class="modal-container">
        <div class="modal-wrapper">
          <span @click="open = false" class="close">×</span>
          <video controls="true" poster="../public/img/about/about.jpg" src="../assets/video/About.mp4">
          </video>
        </div>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
/* Pulsating Play Button */
.pulsating-play-btn {
  width: 94px;
  height: 94px;
  background: radial-gradient(var(--accent-color) 50%, color-mix(in srgb, var(--accent-color), transparent 75%) 52%);
  border-radius: 50%;
  display: block;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.pulsating-play-btn:before {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  animation-delay: 0s;
  animation: pulsate-play-btn 2s;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: steps;
  opacity: 1;
  border-radius: 50%;
  border: 5px solid color-mix(in srgb, var(--accent-color), transparent 30%);
  top: -15%;
  left: -15%;
  background: rgba(198, 16, 0, 0);
}

.pulsating-play-btn:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-40%) translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 100;
  transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.pulsating-play-btn:hover:before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-40%) translateY(-50%);
  width: 0;
  height: 0;
  border: none;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 200;
  animation: none;
  border-radius: 0;
}

.pulsating-play-btn:hover:after {
  border-left: 15px solid var(--accent-color);
  transform: scale(20);
}

@keyframes pulsate-play-btn {
  0% {
    transform: scale(0.6, 0.6);
    opacity: 1;
  }

  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}

/** About 2 Section */
.about-2 .section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  color: var(--accent-color);
  background-color: color-mix(in srgb, var(--accent-color) 10%, transparent);
  margin-bottom: 1rem;
}

.about-2 .section-badge i {
  font-size: 1rem;
}

.about-2 .about-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
}

.about-2 .about-description,
.about-2 .section-text {
  color: color-mix(in srgb, var(--default-color) 80%, transparent);
  line-height: 1.6;
}

.about-2 .features-boxes .feature-box {
  height: 100%;
  position: relative;
}

.about-2 .features-boxes .feature-box .icon-box {
  width: 60px;
  height: 60px;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: color-mix(in srgb, var(--accent-color) 15%, transparent);
  color: var(--accent-color);
  font-size: 1.75rem;
  transition: all 0.3s ease;
}

.about-2 .features-boxes .feature-box h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.about-2 .features-boxes .feature-box h3 a {
  color: var(--heading-color);
}

.about-2 .features-boxes .feature-box p {
  color: color-mix(in srgb, var(--default-color) 80%, transparent);
  margin-bottom: 0;
  line-height: 1.6;
}

.about-2 .features-boxes .feature-box:hover .icon-box {
  background-color: var(--accent-color);
  color: var(--contrast-color);
}

.about-2 .features-boxes .feature-box:hover h3 a {
  color: var(--accent-color);
}

.about-2 .video-box {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.about-2 .video-box img {
  width: 100%;
  border-radius: 20px;
}

.about-2 .pulsating-play-btn {
  position: absolute;
  left: calc(50% - 47px);
  top: calc(50% - 47px);
}

/** Stats Section */
.stats .stats-item {
  padding: 30px;
  width: 100%;
}

.stats .stats-item i {
  color: var(--accent-color);
  display: block;
  font-size: 44px;
  float: left;
  line-height: 0;
}

.stats .stats-item .purecounter {
  color: var(--heading-color);
  font-size: 48px;
  line-height: 40px;
  display: block;
  font-weight: 700;
  margin-left: 60px;
}

.stats .stats-item p {
  color: color-mix(in srgb, var(--default-color), transparent 40%);
  padding: 15px 0 0 0;
  margin: 0 0 0 60px;
  font-family: var(--heading-font);
  font-size: 14px;
}

/** Testimonials Section */
.testimonials .testimonial-masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
}

.testimonials .testimonial-masonry::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, color-mix(in srgb, var(--accent-color), transparent 95%), transparent);
  opacity: 0.5;
  z-index: -1;
}

.testimonials .testimonial-item:nth-child(3n-1) {
  margin-top: 3rem;
}

.testimonials .testimonial-item:nth-child(3n) {
  margin-top: 1.5rem;
}

.testimonials .testimonial-item.highlight .testimonial-content {
  background-color: color-mix(in srgb, var(--accent-color), transparent 92%);
  border: 1px solid color-mix(in srgb, var(--accent-color), transparent 70%);
}

.testimonials .testimonial-item.highlight .testimonial-content .quote-pattern {
  background-color: color-mix(in srgb, var(--accent-color), transparent 85%);
}

.testimonials .testimonial-item.highlight .testimonial-content .quote-pattern i {
  color: var(--accent-color);
}

.testimonials .testimonial-content {
  background-color: var(--surface-color);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
}

.testimonials .testimonial-content:hover {
  transform: translateY(-5px);
}

.testimonials .testimonial-content p {
  font-size: 1rem;
  line-height: 1.7;
  margin: 1.5rem 0;
  position: relative;
}

.testimonials .quote-pattern {
  position: absolute;
  top: -1.25rem;
  left: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--surface-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
}

.testimonials .quote-pattern i {
  font-size: 1.25rem;
  color: var(--accent-color);
}

.testimonials .client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
}

.testimonials .client-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.testimonials .client-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials .client-details h3 {
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.testimonials .client-details .position {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--heading-color), transparent 40%);
}

@media (max-width: 1199.98px) {
  .testimonials .testimonial-masonry {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .testimonials .testimonial-item:nth-child(3n-1),
  .testimonials .testimonial-item:nth-child(3n) {
    margin-top: 0;
  }

  .testimonials .testimonial-item:nth-child(even) {
    margin-top: 2rem;
  }
}

@media (max-width: 767.98px) {
  .testimonials .testimonial-masonry {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .testimonials .testimonial-item:nth-child(even) {
    margin-top: 0;
  }

  .testimonials .testimonial-content {
    padding: 1.5rem;
  }

  .testimonials .testimonial-content p {
    font-size: 0.9375rem;
    margin: 1.25rem 0;
  }

  .testimonials .quote-pattern {
    width: 2.25rem;
    height: 2.25rem;
    top: -1.125rem;
  }

  .testimonials .quote-pattern i {
    font-size: 1.125rem;
  }

  .testimonials .client-info {
    margin-top: 1.25rem;
    padding-top: 1.25rem;
  }

  .testimonials .client-image {
    width: 45px;
    height: 45px;
  }

  .testimonials .client-details h3 {
    font-size: 1rem;
  }

  .testimonials .client-details .position {
    font-size: 0.8125rem;
  }
}

video {
  max-width: 960px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

.modal-container {
  z-index: 9999 !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  background: rgba(0, 0, 0, .92);
}

.modal-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close {
  z-index: 1;
  position: absolute;
  top: 10%;
  right: 20px;
  font-size: 48px;
  color: #ddd;
  cursor: pointer;
}
</style>