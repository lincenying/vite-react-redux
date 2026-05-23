import type { IMessage } from './api'

export interface IGlobalState {
    ISDEV?: boolean
    ISPRE?: boolean
    ISPROD?: boolean
    message: IMessage
}
