import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { dirname, relative } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { URL, fileURLToPath } from 'url'
import { defineConfig, type Plugin } from 'vite'
// import VueDevTools from 'vite-plugin-vue-devtools'
import { defineViteConfig as define } from './define.config'
import manifest from './manifest.config'
import packageJson from './package.json'
import svgLoader from 'vite-svg-loader';

const transformHtmlPlugin = (data) =>
  <Plugin>{
    name: 'transform-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<%=\s*(\w+)\s*%>/gi, (match, p1) => data[p1] || '')
      },
    },
  }

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    crx({ manifest }),

    VueRouter({
      root: '.',
      routesFolder: [
        { src: 'src/pages', path: 'common/' },
        { src: 'src/options/pages', path: 'options/' },
        { src: 'src/popup/pages', path: 'popup/' },
        { src: 'src/setup/pages', path: 'setup/' },
      ],
      dts: 'src/typed-router.d.ts',
      extensions: ['.vue'],
    }),

    vue(),

    svgLoader(),

    // VueDevTools(),

    AutoImport({
      imports: ['vue', VueRouterAutoImports, 'vue/macros', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/'],
    }),

    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'i',
          enabledCollections: ['mdi'],
        }),
      ],
    }),

    Icons({
      autoInstall: true,
      compiler: 'vue3',
      scale: 1.5,
    }),

    {
      name: 'assets-rewrite',
      order: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), '/assets')}/`
        )
      },
    },

    transformHtmlPlugin({
      HTML_TITLE: packageJson.displayName || packageJson.name,
    }),
  ],
  define,
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: true,
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
})
