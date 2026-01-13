// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-charts',
  ],
  app: {
    head: {
      title: 'GymRatLog.app',
      meta: [
        { name: 'description', content: 'Track your workouts and progress with GymRatLog.app' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    experimental: {
      componentDetection: true,
    },
  },
  experimental: {
    inlineRouteRules: true,
    typescriptPlugin: true,
    extractAsyncDataHandlers: true,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  typescript: {
    typeCheck: 'build',
  },
  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
})
