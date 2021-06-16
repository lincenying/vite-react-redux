/* eslint-disable no-inline-comments */
import React, { useRef, useEffect } from 'react'
import { Link, Prompt } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useUpdateEffect, useBoolean } from 'ahooks'
import ls from 'store2'

import { Avatar, Button, List } from 'antd'

import { getTopics, topicsState } from '@/store/topics'

export default function Main(props) {
    const pathname = props.location.pathname

    const topics = useSelector(topicsState)

    const dispatch = useDispatch()

    const firstPathname = useRef(pathname)
    const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBoolean(false)

    useEffect(() => {
        console.log('useEffect:' + topics.pathname + ' $$ ' + props.location.pathname)
        if (topics.pathname !== props.location.pathname) {
            dispatch(getTopics({ page: 1, pathname }))
        }
    }, [dispatch])

    useMount(() => {
        console.log('componentDidMount')
        const scrollTop = ls.get(pathname) || 0
        ls.remove(pathname)
        if (scrollTop) window.scrollTo(0, scrollTop)
    })

    useUpdateEffect(() => {
        console.log('componentDidUpdate')
        console.log(firstPathname.current, pathname)
    }, [props.location.pathname])

    const handleLoadMore = async () => {
        setLoadingTrue()
        await dispatch(getTopics({ page: topics.page + 1, pathname }))
        setLoadingFalse()
    }

    const { data } = topics

    return (
        <div>
            {/* <Prompt when message={() => '确定要离开页面吗？'} /> */}
            <Prompt
                when
                message={() => {
                    const path = props.location.pathname
                    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
                    ls.set(path, scrollTop)
                    return true
                }}
            />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.author.avatar_url} />}
                            title={
                                <Link to={`/article/${item.id}`} className="li-name">
                                    {item.title}
                                </Link>
                            }
                        />
                    </List.Item>
                )}
            />
            <ul>
                <li className="page">
                    <Button loading={loading} type="primary" onClick={handleLoadMore}>
                        加载下一页
                    </Button>
                </li>
            </ul>
        </div>
    )
}
