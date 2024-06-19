// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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

  devtools: { enabled: true }

})
