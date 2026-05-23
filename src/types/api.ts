/**
 * 全局统一 API 响应类型
 */
export interface IApiResponse<T = unknown> {
    code: number
    message: string
    data: T
    info?: string
}

/**
 * 分页列表数据
 */
export interface IApiListData<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    page: number
    list: T[]
}

export type TMessageType = 'success' | 'warning' | 'info' | 'error'

export interface IMessage {
    type: TMessageType
    title?: string
    content: string
}
