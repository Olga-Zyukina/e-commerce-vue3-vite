export default {
  title: "E-commerce Vite + Vue + TS + Nuxt",
  description: "E-commerce Vite + Vue + TS + Nuxt",
  author: "OZ",
  url: "http://localhost:3000",
  github: "/",
  defaultLocale: "en",
  navs: {
    primary: [
      { title: "Home", to: "/" },
      { title: "About", to: "/about" },
      { title: "Catalog", to: "/catalog" },
      { title: "Contact", to: "/contact" },
    ],
    secondary: [
      {
        title: "Account",
        to: "/account#wishlist",
        icon: "bi bi-heart",
      },
      {
        title: "Cart",
        to: "/cart",
        icon: "bi bi-cart3",
      },
    ],
    profile: [
      {
        title: "My Profile",
        to: "/account#orders",
        icon: "bi bi-person-circle me-2",
      },
      {
        title: "My Orders",
        to: "/account#orders",
        icon: "bi bi-bag-check me-2",
      },
      {
        title: "My Wishlist",
        to: "/account#wishlist",
        icon: "bi bi-heart me-2",
      },
      {
        title: "Settings",
        to: "/account#settings",
        icon: "bi bi-gear me-2",
      },
    ],
    social: [
      {
        title: "facebook",
        to: "/",
        icon: "bi bi-facebook",
      },
      {
        title: "instagram",
        to: "/",
        icon: "bi bi-instagram",
      },
      {
        title: "twitter",
        to: "/",
        icon: "bi bi-twitter-x",
      },
      {
        title: "tiktok",
        to: "/",
        icon: "bi bi-tiktok",
      },
      {
        title: "My Wishlist",
        to: "/",
        icon: "bi bi-pinterest",
      },
      {
        title: "youtube",
        to: "/",
        icon: "bi bi-youtube",
      },
    ],
    shop: [
      { title: "New Arrivals", to: "/catalog" },
      { title: "Bestsellers", to: "/catalog" },
      { title: "Women's Clothing", to: "/catalog" },
      { title: "Men's Clothing", to: "/catalog" },
      { title: "Electronics", to: "/catalog" },
      { title: "Sale", to: "/catalog" },
    ],
    support: [
      { title: "Help Center", to: "/" },
      { title: "Order Status", to: "/account#orders" },
      { title: "Shipping Info", to: "/account#orders" },
      { title: "Returns &amp; Exchanges", to: "/account#orders" },
      { title: "Size Guide", to: "/account#orders" },
      { title: "Contact Us", to: "/contact" },
    ],
  },
  contacts: {
    address: {
      title: "Our Address",
      info: "123 Fashion Street, Moscow, 10001",
      icon: "bi bi-geo-alt",
      delay: 100,
    },
    phone: {
      title: "Our Phone",
      info: "+1 (234) 567-890",
      icon: "bi bi-telephone",
      delay: 100,
    },
    email: {
      title: "Email Address",
      info: "info@ecommerce.ru",
      icon: "bi bi-envelope",
      delay: 200,
    },
    hours: {
      title: "Hours of Operation",
      info: "Monday-Friday: 9am-6pm Saturday: 10am-4pm Sunday: Closed",
      icon: "bi bi-clock",
      delay: 300,
    },
  },
  aboutFeaturedBoxes: [
    {
      title: "At vero eos",
      description:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
      icon: "bi bi-bullseye",
      delay: 200,
    },
    {
      title: "Sed ut perspiciatis",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque",
      icon: "bi bi-person-check",
      delay: 300,
    },
    {
      title: "Nemo enim ipsam",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.",
      icon: "bi bi-clipboard-data",
      delay: 400,
    },
  ],
  aboutStats: [
    {
      title: "Happy Clients",
      description: "consequuntur quae",
      icon: "bi bi-emoji-smile",
      purecounterEnd: 232,
    },
    {
      title: "Projects",
      description: "adipisci atque cum quia aut",
      icon: "bi bi-journal-richtext",
      purecounterEnd: 521,
    },
    {
      title: "Hours Of Support",
      description: "aut commodi quaerat",
      icon: "bi bi-headset",
      purecounterEnd: 1453,
    },
    {
      title: "Hard Workers",
      description: "rerum asperiores dolor",
      icon: "bi bi-people",
      purecounterEnd: 32,
    },
  ],
  aboutTestimonial: [
    {
      text: "Implementing innovative strategies has revolutionized our approach to market challenges and competitive positioning.",
      imgsrc: "./img/person/person-4.jpg",
      name: "Carla Bradley",
      position: "Strategy Director",
      highlight: false,
      delay: 0,
    },
    {
      text: "Exceptional service delivery and innovative solutions have transformed our business operations, leading to remarkable growth and enhanced customer satisfaction across all touchpoints.",
      imgsrc: "./img/person/person-7.jpg",
      name: "Chester Castillo",
      position: "Chief Innovation Officer",
      highlight: true,
      delay: 100,
    },
    {
      text: "Strategic partnership has enabled seamless digital transformation and operational excellence.",
      imgsrc: "./img/person/person-5.jpg",
      name: "Esther Myers",
      position: "Digital Lead",
      highlight: false,
      delay: 200,
    },
    {
      text: "Professional expertise and dedication have significantly improved our project delivery timelines and quality metrics.",
      imgsrc: "./img/person/person-8.jpg",
      name: "James Ballard",
      position: "Technical Director",
      highlight: false,
      delay: 300,
    },
    {
      text: "Collaborative approach and industry expertise have revolutionized our product development cycle, resulting in faster time-to-market and increased customer engagement levels.",
      imgsrc: "./img/person/person-6.jpg",
      name: "Emma Hunt",
      position: "Product Manager",
      highlight: true,
      delay: 400,
    },
    {
      text: "Innovative approach to user experience design has significantly enhanced our platform's engagement metrics and customer retention rates.",
      imgsrc: "./img/person/person-9.jpg",
      name: "Russell Obrien",
      position: "UX Director",
      highlight: false,
      delay: 500,
    },
  ],
};
