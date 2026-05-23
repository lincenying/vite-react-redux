import '@ant-design/v5-patch-for-react-19'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './stores'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

if (!window.$timeout) {
    window.$timeout = {}
}

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
