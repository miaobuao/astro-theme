export interface ThemeConfig {
  site: {
    title: string
    description: string
    locale: `${string}-${string}`
    url?: string
  }
  author: {
    name: string
    email: string
    signature: string
    avatar: {
      url: string
      alt: string
    }
  }
}

export function defineThemeConfig(config: ThemeConfig) {
  return config
}
