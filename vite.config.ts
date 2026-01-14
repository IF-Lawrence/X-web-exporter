import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import preact from '@preact/preset-vite';
import monkey from 'vite-plugin-monkey';
import i18nextLoader from 'vite-plugin-i18next-loader';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import prefixSelector from 'postcss-prefix-selector';
import remToPx from 'postcss-rem-to-pixel-next';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: false,
  },
  // Enable preview HTML page in dev mode
  server: {
    open: '/preview.html',
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        remToPx({ propList: ['*'] }),
        // Use scoped CSS.
        prefixSelector({
          prefix: '#twe-root',
          exclude: [/^#twe-root/], // This may be a bug.
        }),
      ],
    },
  },
  plugins: [
    preact(),
    i18nextLoader({ paths: ['./src/i18n/locales'], namespaceResolution: 'basename' }),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: 'Orbit Exporter',
        description: {
          '': 'Export tweets, bookmarks, lists and much more to JSON/CSV/HTML from Twitter(X) web app. Enhanced fork with auto-capture and global controls.',
          'zh-CN': '从 Twitter(X) 网页版导出推文、书签、列表等各种数据，支持导出 JSON/CSV/HTML。增强版，包含自动抓取和全局控制功能。',
          'zh-TW': '從 Twitter(X) 網頁版匯出推文、書籤、列表等各種資料，支援匯出 JSON/CSV/HTML。增強版，包含自動抓取和全域控制功能。',
          ja: 'Twitter(X) ブラウザ版からツイート、ブックマーク、リストなどを取得し JSON/CSV/HTML に出力します。自動取得とグローバル制御機能を備えた強化版。',
        },
        namespace: 'https://github.com/IF-Lawrence/X-web-exporter',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABGCAYAAABBovOlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgMTAuMC1jMDAwIDc5LmQwNGNjMTY5OCwgMjAyNS8wNy8wMi0xMjoxODoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI3LjIgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDI2LTAxLTE0VDE3OjQxOjA5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNi0wMS0xNFQxNzo0ODo0OCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNi0wMS0xNFQxNzo0ODo0OCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTA3YWE2YWQtZmZhZi00YzIyLWE2ZTAtNTc2YjNiZTY2Y2ZkIiB4bXBNTTpEb2N1bWVu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',
        match: ['*://twitter.com/*', '*://x.com/*', '*://mobile.x.com/*'],
        grant: ['unsafeWindow'],
        'run-at': 'document-start',
        updateURL:
          'https://github.com/IF-Lawrence/Orbit-Exporter/releases/latest/download/orbit-exporter.user.js',
        downloadURL:
          'https://github.com/IF-Lawrence/Orbit-Exporter/releases/latest/download/orbit-exporter.user.js',
        require: [
          'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js',
          'https://cdn.jsdelivr.net/npm/dexie@4.0.11/dist/dexie.min.js',
          'https://cdn.jsdelivr.net/npm/dexie-export-import@4.1.4/dist/dexie-export-import.js',
          'https://cdn.jsdelivr.net/npm/file-saver-es@2.0.5/dist/FileSaver.min.js',
          'https://cdn.jsdelivr.net/npm/i18next@24.2.3/i18next.min.js',
          'https://cdn.jsdelivr.net/npm/preact@10.26.4/dist/preact.min.js',
          'https://cdn.jsdelivr.net/npm/preact@10.26.4/hooks/dist/hooks.umd.js',
          'https://cdn.jsdelivr.net/npm/@preact/signals-core@1.8.0/dist/signals-core.min.js',
          'https://cdn.jsdelivr.net/npm/@preact/signals@2.0.0/dist/signals.min.js',
          'https://cdn.jsdelivr.net/npm/@tanstack/table-core@8.21.2/build/umd/index.production.js',
        ],
      },
      build: {
        externalGlobals: {
          dayjs: 'dayjs',
          dexie: 'Dexie',
          'dexie-export-import': 'DexieExportImport',
          'file-saver-es': 'FileSaver',
          i18next: 'i18next',
          preact: 'preact',
          'preact/hooks': 'preactHooks',
          '@preact/signals': 'preactSignals',
          '@tanstack/table-core': 'TableCore',
        },
      },
    }),
  ],
});
