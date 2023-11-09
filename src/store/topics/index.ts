import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { errConfig, setMessage } from '../global'
import type { RootState } from '..'
import api from '@/api'
import type { Article, ArticleStoreList } from '@/types'

const initialState: { lists: ArticleStoreList } = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        pathname: '',
    },
}

export const slice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        receiveTopics: (state, action: PayloadAction<Record<string, any>>) => {
            const { data, current_page, last_page, pathname } = action.payload
            const lists = current_page === 1 ? [].concat(data) : state.lists.data.concat(data)
            state.lists = {
                data: lists,
                hasNext: current_page < last_page,
                page: current_page,
                pathname,
            }
        },
    },
})

export const { receiveTopics } = slice.actions

export async function getTopics(config: Record<string, any>) {
    const { code, data } = await api.get<ResDataLists<Article[]>>('ajax/article-lists', config)
    if (code === 200)
        return receiveTopics({ ...data, ...config })

    return setMessage(errConfig)
}

export const topicsState = (state: RootState) => state.topics.lists

export default slice.reducer
