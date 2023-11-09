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

type ArticleList = ResDataLists<Article> & {
    pathname?: string
}

export const slice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        receiveTopics: (state, action: PayloadAction<ArticleList>) => {
            const { list, page, hasNext, pathname } = action.payload
            const lists = state.lists.data.concat(list)
            state.lists = {
                data: lists,
                hasNext,
                page,
                pathname,
            }
        },
    },
})

export const { receiveTopics } = slice.actions

export async function getTopics(config: Record<string, any>) {
    const { code, data } = await api.get<ResDataLists<Article>>('ajax/article-lists', config)
    if (code === 200)
        return receiveTopics({ ...data, ...config })

    return setMessage(errConfig)
}

export const topicsState = (state: RootState) => state.topics.lists

export default slice.reducer
