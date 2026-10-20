import siteSettings from '../app/settings'

export const useNavMenu = () => {
  const navs = siteSettings.navs

  const allNavs = Object.values(navs).reduce((acc, navMenu) => {
    return [...acc, ...navMenu]
  }, [])

  const currentRoute = useRoute()
  const currentPath = computed(() => {
    return currentRoute.path
  })

  return {
    allNavs,
    navsPrimary: navs.primary,
    navsSecondary: navs.secondary,
    navsProfile: navs.profile,
    navsSocial: navs.social,
    navsShop: navs.shop,
    navsSupport: navs.support,
    currentPath,
  }
}
