import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: [">0.2%", "not dead", "last 2 versions"]
    }),
    viteStaticCopy({
      targets: [
        { src: 'CNAME', dest: '.' },
      ]
    })
  ],
  build: {
    target: 'es2015',
    sourcemap: true,
  },
})
