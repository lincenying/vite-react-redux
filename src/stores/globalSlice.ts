import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { IGlobalState, IMessage } from '~/types'

const initialState: IGlobalState = {
    ISDEV: import.meta.env.VITE_APP_ENV === 'development',
    ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
    ISPROD: import.meta.env.VITE_APP_ENV === 'production',
    message: {
        type: 'info',
        content: '',
        title: '',
    },
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<IMessage>) => {
            state.message = action.payload
        },
    },
})

export const { setMessage } = globalSlice.actions
export const selectGlobal = (state: { global: IGlobalState }) => state.global
export default globalSlice.reducer

export const API_ERROR_MESSAGE: IMessage = {
    type: 'error',
    content: 'api 接口错误',
}
