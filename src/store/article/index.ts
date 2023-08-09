import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { errConfig, setMessage } from '../global'
import type { RootState } from '..'
import api from '@/api'
import type { Article, ArticleItemConfig } from '@/types'

const initialState: ArticleItemConfig = {
    data: null,
    pathname: '',
    isLoad: false,
}

export const slice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        receiveArticle: (state: ArticleItemConfig, action: PayloadAction<ArticleItemConfig>) => {
            state.data = action.payload.data
            state.pathname = action.payload.pathname
            state.isLoad = true
        },
    },
})

export const { receiveArticle } = slice.actions

export async function getArticleItem(config: Record<string, any>) {
    const { code, data } = await api.get<Article>('frontend/article/item', config)
    if (code === 200)
        return receiveArticle({ data, ...config })

    return setMessage(errConfig)
}

export const articleState = (state: RootState) => state.article

export default slice.reducer
