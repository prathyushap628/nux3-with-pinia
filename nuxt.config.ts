import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: "server",
   ssr: false,

   typescript: {
      shim: false,
   },

    buildModules: [
        '@pinia/nuxt',
      ],
    
      
     
      hooks: {
        "vite:extendConfig"(config, { isServer }) {
           if (isServer) {
              // Workaround for netlify issue
              // https://github.com/nuxt/framework/issues/6204
              (config.build.rollupOptions.output as any).inlineDynamicImports =
                 true;
           }
        },
     },

      
})
