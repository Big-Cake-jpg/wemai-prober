// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    // ["nuxt-ssr-lit", { litElementPrefix: ["mdui-"] }],
    "nuxt-umami",
    '@pinia/nuxt',
    '@vueuse/nuxt',
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode",
    "@nuxtjs/robots",
    '@unocss/nuxt',
    'nuxt-vitalizer',
    'pinia-plugin-persistedstate/nuxt',
  ],

  image: {
    quality: 80,
    format: ["avif", "webp", "jpeg"],
    domains: ["maimai.wahlap.com", "www.diving-fish.com"],
    provider: "ipx",
  },

  umami: {
    id: 'f371cf9a-4793-47a0-9813-a0ce882b2efd',
    host: 'https://maimai.lihaoyu.cn',
    autoTrack: true,
    domains: ["https://maimai.lihaoyu.cn"],
    ignoreLocalhost: true,
    customEndpoint: '/api/send',
    enabled: true,
    logErrors: true,
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('mdui-')
    },
  },

  css: ['mdui/mdui.css', '@fontsource/noto-sans-sc/400.css'],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: 'mdui-theme-',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },

  sitemap: {
    xsl: false,
  },
});