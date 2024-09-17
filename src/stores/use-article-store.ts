import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './use-store'

import type { Article, ArticleItemConfig } from '~/types'
import { createSlice } from '@reduxjs/toolkit'
import { errConfig, setMessage } from './use-global-store'

const initialState: ArticleItemConfig = {
    data: null,
    pathname: '',
    isLoad: false,
}

const slice = createSlice({
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
    const { code, data } = await $api.get<Article>(`fetch/article/detail`, config)
    if (code === 200) {
        return receiveArticle({ data, ...config })
    }

    return setMessage(errConfig)
}

export const articleState = (state: RootState) => state.article

export default slice.reducer
