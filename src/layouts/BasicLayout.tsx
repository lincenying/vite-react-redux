import { Outlet } from 'react-router'

import Nav from '~/components/Nav'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'nprogress/nprogress.css'
import '~/assets/scss/style.scss'

function BasicLayout() {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    )
}

export default BasicLayout
