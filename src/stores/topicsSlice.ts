import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchArticleList } from '~/api/articleApi'
import type { IApiQueryParams, IArticleListState } from '~/types'
import { showMessage } from '~/utils/message'

import { API_ERROR_MESSAGE } from './globalSlice'

interface ITopicsSliceState {
    lists: IArticleListState
}

const initialState: ITopicsSliceState = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        pathname: '',
    },
}

export const fetchTopics = createAsyncThunk(
    'topics/fetchList',
    async (config: IApiQueryParams, { getState, rejectWithValue }) => {
        const state = getState() as { topics: ITopicsSliceState }
        const currentPage = config.page ?? 1
        const isLoadMore = currentPage > 1

        const { code, data, message } = await fetchArticleList({
            ...config,
            page: currentPage,
            limit: 20,
        })

        if (code === 200) {
            const { list, page, hasNext } = data
            const prevList = isLoadMore ? state.topics.lists.data : []
            return {
                data: prevList.concat(list),
                hasNext,
                page,
                pathname: config.pathname ?? '',
            }
        }
        showMessage(message || API_ERROR_MESSAGE.content)
        return rejectWithValue(message)
    },
)

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchTopics.fulfilled,
            (state, action: PayloadAction<IArticleListState>) => {
                state.lists = action.payload
            },
        )
    },
})

export const selectTopics = (state: { topics: ITopicsSliceState }) => state.topics.lists
export default topicsSlice.reducer
