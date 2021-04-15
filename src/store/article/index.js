import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

export const slice = createSlice({
    name: 'article',
    initialState: {
        data: {},
        pathname: ''
    },
    reducers: {
        ['receiveArticle']: (state, action) => {
            const { data, pathname } = action.payload
            state.data = data
            state.pathname = pathname
        }
    }
})

export const { receiveArticle } = slice.actions

export const getArticle = config => async dispatch => {
    const { data, success } = await api.get('/api/v1/topic/' + config.id)
    if (success === true) {
        return dispatch(receiveArticle({ data, ...config }))
    }
    return dispatch(setMessage(errConfig))
}

export const articleState = state => state.article

export default slice.reducer
