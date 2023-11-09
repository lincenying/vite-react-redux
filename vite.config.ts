import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

import Components from './vite.config.components'
import Build from './vite.config.build'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const config = {
        base: './',
        server: Build.server,
        build: Build.build,
        css: Css,

        plugins: [
            reactRefresh(),
            ...Components(),
            UnoCSS(),
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
            },
        },
    }
    return config
})
