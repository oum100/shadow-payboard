// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    CYBERPAY_URL: process.env.CYBERPAY_URL,
    CYBERPAY_PARTNER_ID: process.env.CYBERPAY_PARTNER_ID,
    CYBERPAY_SECRET: process.env.CYBERPAY_SECRET
  },

  modules: [
    'nuxt-quasar-ui',
    "@pinia/nuxt",
    ['@nuxtjs/google-fonts', {
      families: {
        Sarabun: true,
      }
    }],
  ],

  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons-outlined'],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-02-28'
})