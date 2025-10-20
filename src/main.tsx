import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import Root from './pages/app'

import store from './stores/use-store'
import '@ant-design/v5-patch-for-react-19'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

if (!window.$timeout) {
    window.$timeout = {}
}

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>,
)
