/**
 * 请求查询参数
 */
export interface IApiQueryParams {
    all?: number
    by?: string | string[]
    from?: string
    id?: string | string[]
    limit?: number
    page?: number
    path?: string
    pathname?: string
    key?: string | string[]
}

/**
 * 文章详情
 */
export interface IArticle {
    c_id: string
    c_title: string
    c_content: string
    c_posttime?: string
}

export interface IArticleItemState {
    data: IArticle | null
    pathname?: string
    isLoad?: boolean
}

export interface IArticleListState {
    data: IArticle[]
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    pathname?: string
}

export interface ITopicsState {
    lists: IArticleListState
}
