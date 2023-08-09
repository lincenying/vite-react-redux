import { Card, Spin } from 'antd'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMount, useUpdateEffect } from 'ahooks'

import { articleState, getArticleItem } from '@/store/article'

export default function Article() {
    const location = useLocation()
    const params = useParams()

    const pathname = location.pathname
    const id = params.id

    const article = useSelector(articleState)

    const firstPathname = useRef(pathname)
    const dispatch = useDispatch()

    useMount(async () => {
        console.log('componentDidMount')
        if (article.pathname !== pathname)
            dispatch(await getArticleItem({ id, pathname }))
        window.scrollTo(0, 0)
    })

    useUpdateEffect(() => {
        console.log('componentDidUpdate')
        console.log(firstPathname.current, pathname)
    }, [pathname])

    const { data } = article

    return (
        <Spin spinning={article.pathname !== pathname} delay={100} size="large">
            <Card title={data?.title} bordered={false}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
            </Card>
        </Spin>
    )
}
