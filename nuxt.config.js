
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      //{ 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
      { itemprop:"name", content:"Aleestar'Blog"},
      { itemprop:"image", content:"https://up.alees.cn/logo.jpg" },
      { name:"description", itemprop:"description", content:"一觉醒来，诸事完美，继续努力呀!" },
      { name:"baidu_union_verify", content:"2385b7b0e375df395d056152b0d59454" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?86a28727a22fc484486d01e00c8e3776' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/css/main.css',
    'assets/font-awesome-4.7.0/css/font-awesome.min.css',
    'assets/css/animate.css',
    'swiper/css/swiper.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/iview',
    '@/plugins/baidu',
    '@/plugins/axios',
    '@/plugins/request',
    '@/plugins/api',
    {src:'@/plugins/loading', ssr:false },
    {src:'@/plugins/markdown', ssr:false },
    {src:'@/plugins/vue-swiper', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    //prefix: '/', //BaseURL
    //baseURL: 'http://localhost:2922',
    // proxy: true,
    //timeout: 3000
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: [
      '(@vssue|vssue)\/((?!\/node_modules\/).)*\.js$',
    ],
  }
}
