export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ReneguideAdmin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAR9VGdvOm5bcne_Rb4wkk1_7aPc3zOiH4",
          authDomain: "reneguide.firebaseapp.com",
          projectId: "reneguide",
          storageBucket: "reneguide.appspot.com",
          messagingSenderId: "714799792232",
          appId: "1:714799792232:web:b64eeb518d35c7997efbdd"
        },
        services: {
          firestore: {
            memoryOnly: false, // default
            chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
            enablePersistence: true,
            settings: {
              // Firestore Settings - currently only works in SPA mode
            }
          },
          storage: true,
          auth: {
            persistance: 'local',
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: {
              ignorePaths: [
                '/login', // path is ignored if url.pathname.startsWith('/admin')
              ]
            }
          }
        }
      }
    ],
    'cookie-universal-nuxt',
    ['nuxt-i18n',
    {
      lazy: true,
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n-redirected',
        alwaysRedirect: true,
        fallbackLocale: 'en'
      },
      locales: [
        {
          name: 'Portugues',
          code: 'pt',
          iso: 'pt-BR',
          file: 'pt-BR.js'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        }
      ],
      langDir: 'src/locales/',
      defaultLocale: 'pt',
      strategy: 'no_prefix',
      parsePages: false

    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
