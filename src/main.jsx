import { Modal } from 'antd'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './store'
import Root from './pages/app'

const getConfirmation = (message, callback) => {
    Modal.confirm({
        title: message,
        onCancel: () => {
            callback(false)
        },
        onOk: () => {
            callback(true)
        }
    })
}

render(
    <Provider store={store}>
        <StoreContext.Provider value={store}>
            <Router getUserConfirmation={getConfirmation}>
                <Root />
            </Router>
        </StoreContext.Provider>
        ,
    </Provider>,
    document.getElementById('root')
)
