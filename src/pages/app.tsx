import { StyleProvider } from '@ant-design/cssinjs'

// import ScrollToTop from '~/components/global/ScrollToTop.jsx'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// import DevTools from '@devtools'

import Nav from '../components/nav'
import PageArticle from './article/index'
import Main from './topics/index'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import 'nprogress/nprogress.css'

function App() {
    const nodeRef = useRef(null)

    return (
        <StyleProvider hashPriority="high">
            <div>
                <Nav />

                <div ref={nodeRef}>
                    <Routes>
                        <Route element={<Main />} path="/" />
                        <Route element={<PageArticle />} path="/article/:id" />
                    </Routes>
                </div>
            </div>
        </StyleProvider>
    )
}
export default App
