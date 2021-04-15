import { Avatar, Card, List, Spin } from 'antd'
import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useUpdateEffect } from 'ahooks'

import { getArticle, articleState } from '@/store/article'

export default function Article(props) {
    const pathname = props.location.pathname
    const id = props.match.params.id

    const article = useSelector(articleState)

    const firstPathname = useRef(pathname)
    const dispatch = useDispatch()

    useEffect(() => {
        if (article.pathname !== props.location.pathname) {
            dispatch(getArticle({ id, pathname }))
        }
    }, [dispatch])

    useMount(() => {
        console.log('componentDidMount')
        window.scrollTo(0, 0)
    })

    useUpdateEffect(() => {
        console.log('componentDidUpdate')
        console.log(firstPathname.current, pathname)
    }, [props])

    const { data } = article

    return (
        <Spin spinning={article.pathname !== props.location.pathname} delay={100} size="large">
            <Card title={data.title} bordered={false}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
            </Card>
            <div className="reply">
                <List
                    itemLayout="horizontal"
                    dataSource={data.replies}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.author.avatar_url} />}
                                title={<a href="https://ant.design">{item.author.loginname}</a>}
                                description={
                                    <div
                                        className="reply-item-content"
                                        dangerouslySetInnerHTML={{
                                            __html: item.content
                                        }}
                                    />
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Spin>
    )
}
