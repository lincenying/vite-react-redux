import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'global',
    initialState: {
        message: {
            type: '',
            content: '',
            title: ''
        }
    },
    reducers: {
        setMessage: (state, action) => {
            let message = action.payload.message
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message
                }
            }
            state.message = message
        }
    }
})

export const errConfig = {
    type: 'setMessage',
    message: {
        type: 'error',
        content: 'api 接口错误'
    }
}

export const { setMessage } = slice.actions

export default slice.reducer
