import type { IApiListData, IApiQueryParams, IApiResponse, IArticle } from '~/types'
import { get } from '~/utils/request'

/**
 * 获取文章列表
 */
export function fetchArticleList(
    params: IApiQueryParams,
): Promise<IApiResponse<IApiListData<IArticle>>> {
    return get<IApiListData<IArticle>>('fetch/article/lists', {
        ...params,
        limit: params.limit ?? 20,
    } as Record<string, unknown>)
}

/**
 * 获取文章详情
 */
export function fetchArticleDetail(
    params: Pick<IApiQueryParams, 'id' | 'pathname'>,
): Promise<IApiResponse<IArticle>> {
    return get<IArticle>('fetch/article/detail', params as Record<string, unknown>)
}
