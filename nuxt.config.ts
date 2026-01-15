// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@vueuse/nuxt', 'nuxt-charts', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://gymratlog.app',
    name: 'GymRat Log',
    description: 'Track your gym progress with GymRat Log - a free workout tracker and training log. Monitor exercise performance, visualize strength gains, and manage your fitness journey with detailed workout history and progress charts.',
  },
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
    alias: {
      // Replace the Node.js native binding with the Wasm implementation
      '@resvg/resvg-js': '@resvg/resvg-wasm',
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
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
})
