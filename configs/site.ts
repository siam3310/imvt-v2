export type TSiteInfo = typeof siteInfo
export type TNavItem = typeof siteInfo.navItems
export const siteInfo = {
  name: 'Imvt',
  description: 'Movies and TV Series Database App',
  authors: {
    url: 'https://github.com/VISHWAJ33T',
    name: 'Vishwajeet Yadav',
  },
  generator: 'Meta generator word for My App',
  navItems: [
    { name: 'Home', href: '/' },
    { name: 'Live TV', href: '/iptv' },
    { name: 'Movies', href: '/movies' },
    { name: 'TV', href: '/tv' },
  ],
}

