import { StyleProvider } from '@ant-design/cssinjs'

// import ScrollToTop from '~/components/global/ScrollToTop.jsx'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    const location = useLocation()
    const nodeRef = useRef(null)

    return (
        <StyleProvider hashPriority="high">
            <div>
                <Nav />
                <TransitionGroup
                    appear
                    component={null}
                >
                    <CSSTransition
                        nodeRef={nodeRef}
                        classNames="example"
                        in={false}
                        key={location.key}
                        timeout={{ appear: 300, enter: 300, exit: 300 }}
                    >
                        <div ref={nodeRef}>
                            <Routes>
                                <Route
                                    element={<Main />}
                                    path="/"
                                />
                                <Route
                                    element={<PageArticle />}
                                    path="/article/:id"
                                />
                            </Routes>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </StyleProvider>
    )
}
export default App
