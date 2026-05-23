import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router'

import { router } from '~/router'
import { antdTheme } from '~/styles/antd-theme'

function App() {
    return (
        <StyleProvider hashPriority="high">
            <ConfigProvider theme={antdTheme}>
                <RouterProvider router={router} />
            </ConfigProvider>
        </StyleProvider>
    )
}

export default App
