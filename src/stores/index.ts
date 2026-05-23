import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './articleSlice'
import globalReducer from './globalSlice'
import topicsReducer from './topicsSlice'

const store = configureStore({
    reducer: {
        global: globalReducer,
        article: articleReducer,
        topics: topicsReducer,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
