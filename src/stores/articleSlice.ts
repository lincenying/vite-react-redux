import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchArticleDetail } from '~/api/articleApi'
import type { IApiQueryParams, IArticleItemState } from '~/types'
import { showMessage } from '~/utils/message'

import { API_ERROR_MESSAGE } from './globalSlice'

const initialState: IArticleItemState = {
    data: null,
    pathname: '',
    isLoad: false,
}

export const fetchArticleItem = createAsyncThunk(
    'article/fetchItem',
    async (config: IApiQueryParams, { rejectWithValue }) => {
        const { code, data, message } = await fetchArticleDetail({
            id: config.id,
            pathname: config.pathname,
        })
        if (code === 200) {
            return { data, pathname: config.pathname ?? '' }
        }
        showMessage(message || API_ERROR_MESSAGE.content)
        return rejectWithValue(message)
    },
)

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleItem.pending, (state, action) => {
                state.pathname = action.meta.arg.pathname ?? ''
                state.isLoad = false
            })
            .addCase(fetchArticleItem.fulfilled, (state, action: PayloadAction<{ data: IArticleItemState['data']; pathname: string }>) => {
                state.data = action.payload.data
                state.pathname = action.payload.pathname
                state.isLoad = true
            })
            .addCase(fetchArticleItem.rejected, (state) => {
                state.isLoad = true
            })
    },
})

export const selectArticle = (state: { article: IArticleItemState }) => state.article
export default articleSlice.reducer
