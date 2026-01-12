// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-charts',
  ],
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
