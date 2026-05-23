import { Card, Spin } from 'antd'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router'

import { fetchArticleItem, selectArticle } from '~/stores/articleSlice'
import { useAppDispatch, useAppSelector } from '~/stores/hooks'

function ArticlePage() {
    if (window.$timeout.list)
        clearTimeout(window.$timeout.list)

    const location = useLocation()
    const params = useParams()
    const pathname = location.pathname
    const id = params.id

    const article = useAppSelector(selectArticle)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (article.pathname !== pathname && id) {
            dispatch(fetchArticleItem({ id, pathname }))
        }
    }, [article.pathname, dispatch, id, pathname])

    const { data } = article

    return (
        <div className="main">
            <Spin
                size="large"
                spinning={article.pathname !== pathname}
            >
                <Card
                    variant="outlined"
                    title={data?.c_title}
                >
                    <div
                        className="article-content"
                        // eslint-disable-next-line react/no-danger -- 文章 HTML 内容由后端返回
                        dangerouslySetInnerHTML={{ __html: data?.c_content || '' }}
                    />
                </Card>
            </Spin>
        </div>
    )
}

export default ArticlePage
