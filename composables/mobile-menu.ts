
const isMobileMenuOpen = ref(false);
const openMobileMenu = () => {
  document.body?.classList.toggle("mobile-nav-active");
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

export const useMobileMenu = () => {
  return {
    isMobileMenuOpen,
    openMobileMenu,
  };
};
