import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteStaticCopy({
      targets: [
        { src: 'CNAME', dest: '.' },
      ]
    })
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
  },
})
