import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

export const slice = createSlice({
    name: 'topics',
    initialState: {
        lists: {
            data: [],
            hasNext: 0,
            page: 1,
            path: ''
        }
    },
    reducers: {
        ['receiveTopics']: (state, action) => {
            const { data, page, pathname } = action.payload
            const lists = page === 1 ? [].concat(data) : state.lists.data.concat(data)
            state.lists = {
                data: lists,
                page,
                path: pathname,
                hasNext: data.length > 0
            }
        }
    }
})

export const { receiveTopics } = slice.actions

export const getTopics = config => async dispatch => {
    const { data, success } = await api.get('/api/v1/topics', config)
    if (success === true) {
        return dispatch(receiveTopics({ data, ...config }))
    }
    return dispatch(setMessage(errConfig))
}

export const topicsState = state => state.topics.lists

export default slice.reducer
