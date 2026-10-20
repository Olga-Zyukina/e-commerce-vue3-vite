import { fileURLToPath, URL } from 'node:url'
import siteMeta from './app/settings'
const {
  title,
  description,
  url,
  defaultLocale,
} = siteMeta

export default defineNuxtConfig({
  target: "static", 
  router: {
    base: '/e-commerce-vue3-vite/dist/' 
  },
  routeRules: {
    account: { ssr: false },
    cart: { ssr: false },
    checkout: { ssr: false },
  },
  modules: [
    "usebootstrap",
    "@pinia/nuxt",
    "@nuxtjs/seo"],
  css: [
    "assets/css/main.css",
    "assets/vendor/bootstrap-icons/bootstrap-icons.min.css",
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  app: {
    baseURL: "/e-commerce-vue3-vite/dist/",
    head: {
      title: title,
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      htmlAttrs: {
        lang: defaultLocale,
      },
      meta: [
        { name: "description", content: description },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "./favicon.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
    },
  },
  plugins: [
    {
      src: "./plugins/bootstrap.js",
      mode: "client",
    },
  ],
  robots: {
    blockNonSeoBots: true,
  },
  sitemap: {
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '12.5%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      {
        label: 'Change Frequency',
        select: 'sitemap:changefreq',
        width: '12.5%',
      },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '12.5%' },
    ],
    strictNuxtContentPaths: true,
  },
});
