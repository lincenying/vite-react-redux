import { configureStore } from '@reduxjs/toolkit'
import { routerReducer } from 'react-router-redux'

import global from './global'
import article from './article'
import topics from './topics'

const store = configureStore({
    reducer: {
        global,
        article,
        topics,
        routing: routerReducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
