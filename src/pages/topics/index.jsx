/* eslint-disable no-inline-comments */
import { Avatar, Button, List, Spin } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import { Link, Prompt } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useUpdateEffect } from 'ahooks'
import ls from 'store2'
import { getTopics, topicsState } from '@/store/topics'

export default function Main(props) {
    const pathname = props.location.pathname

    const topics = useSelector(topicsState)

    const dispatch = useDispatch()

    const firstPathname = useRef(pathname)
    const [showMoreBtn, setShowMoreBtn] = useState(true)

    useEffect(() => {
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
    }, [props])

    const handleLoadMore = async () => {
        setShowMoreBtn(false)
        await dispatch(getTopics({ page: topics.page + 1, pathname }))
        setShowMoreBtn(true)
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
                    {showMoreBtn ? (
                        <Button type="primary" onClick={handleLoadMore}>
                            加载下一页
                        </Button>
                    ) : (
                        <Spin />
                    )}
                </li>
            </ul>
        </div>
    )
}
