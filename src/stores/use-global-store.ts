import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './use-store'
import type { GlobalStore, Message } from '~/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: GlobalStore = {
    ISDEV: import.meta.env.VITE_APP_ENV === 'development',
    ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
    ISPROD: import.meta.env.VITE_APP_ENV === 'production',
    message: {
        type: 'info',
        content: '',
        title: '',
    },
}

const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<{ message: Message }>) => {
            let message = action.payload.message
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message,
                }
            }
            state.message = message
        },
    },
})

interface ErrConfig {
    type: string
    message: Message
}

export const errConfig: ErrConfig = {
    type: 'setMessage',
    message: {
        type: 'error',
        content: 'api 接口错误',
    },
}

export const { setMessage } = slice.actions

export const globalState = (state: RootState) => state.global

export default slice.reducer
