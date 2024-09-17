import { configureStore } from '@reduxjs/toolkit'
import { routerReducer } from 'react-router-redux'

import article from './use-article-store'
import global from './use-global-store'
import topics from './use-topics-store'

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
