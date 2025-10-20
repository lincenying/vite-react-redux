import { Affix } from 'antd'
import React from 'react'

import { NavLink } from 'react-router'

function Nav() {
    return (
        <Affix offsetTop={20}>
            <h1 w-1024px mx-auto>
                <NavLink to="/">列表</NavLink>
            </h1>
        </Affix>
    )
}

export default Nav
