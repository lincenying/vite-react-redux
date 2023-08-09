import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './store'
import Root from './pages/app'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>,
)
