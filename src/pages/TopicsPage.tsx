import { useBoolean } from 'ahooks'
import { Button } from 'antd'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'

import { useAutoScroll } from '~/hooks/useAutoScroll'
import { fetchTopics, selectTopics } from '~/stores/topicsSlice'
import { useAppDispatch, useAppSelector } from '~/stores/hooks'

function TopicsPage() {
    const location = useLocation()
    const pathname = location.pathname

    const topics = useAppSelector(selectTopics)
    const dispatch = useAppDispatch()

    const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBoolean(false)

    useEffect(() => {
        if (topics.pathname !== pathname) {
            dispatch(fetchTopics({ pathname, page: 1 }))
        }
    }, [dispatch, pathname, topics.pathname])

    useAutoScroll('list')

    const handleLoadMore = async () => {
        setLoadingTrue()
        await dispatch(fetchTopics({ page: topics.page + 1, pathname }))
        setLoadingFalse()
    }

    const { data } = topics

    return (
        <div className="main">
            <ul>
                {
                    data.map(item => (
                        <li key={item.c_id}>
                            <Link className="li-name" to={`/article/${item.c_id}`}>
                                {item.c_title}
                            </Link>
                        </li>
                    ))
                }
                <li className="page">
                    <Button
                        loading={loading}
                        onClick={handleLoadMore}
                        type="primary"
                    >
                        加载下一页
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default TopicsPage
