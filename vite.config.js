const path = require('path')
import reactRefresh from '@vitejs/plugin-react-refresh'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default ({ mode }) => {
    const config = {
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        plugins: [
            getBabelOutputPlugin({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: '3'
                        }
                    ]
                ]
            }),
            reactRefresh(),
            styleImport({
                libs: [
                    {
                        libraryName: 'ant-design-vue',
                        esModule: true,
                        resolveStyle: name => {
                            return `ant-design-vue/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'antd',
                        esModule: true,
                        resolveStyle: name => {
                            return `antd/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'vant',
                        esModule: true,
                        resolveStyle: name => {
                            return `vant/es/${name}/style/index`
                        }
                    },
                    {
                        libraryName: 'element-plus',
                        resolveStyle: name => {
                            return `element-plus/lib/theme-chalk/${name}.css`
                        },
                        resolveComponent: name => {
                            return `element-plus/lib/${name}`
                        }
                    }
                ]
            })
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
                '@store': path.join(__dirname, './src/store/conf.prod'),
                '@devtools': path.join(__dirname, './src/components/global/devtools-prod')
            }
        },
        server: {
            port: 7772,
            proxy: {
                '/api': {
                    target: 'https://www.vue-js.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '/api'
                    }
                }
            }
        }
    }
    if (mode === 'development') {
        config.resolve.alias['@store'] = path.join(__dirname, './src/store/conf.dev')
        config.resolve.alias['@devtools'] = path.join(__dirname, './src/components/global/devtools')
    }
    return config
}
