import { configureStore } from '@reduxjs/toolkit'
import { routerReducer } from 'react-router-redux'

import global from './global'
import article from './article'
import topics from './topics'

export default configureStore({
    reducer: {
        global,
        article,
        topics,
        routing: routerReducer
    }
})
