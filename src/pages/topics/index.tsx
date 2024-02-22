import { Link } from 'react-router-dom'
import ls from 'store2'

import { Button, List } from 'antd'

import { getTopics, topicsState } from '@/store/topics'

export default function Main() {
    const location = useLocation()
    const pathname = location.pathname

    const topics = useSelector(topicsState)

    const dispatch = useDispatch()

    const firstPathname = useRef(pathname)
    const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBoolean(false)

    useEffect(() => {
        const handlefetchPosts = async (page = 1) => {
            dispatch(await getTopics({ pathname, page }))
        }
        console.log(`useEffect:${topics.pathname} $$ ${pathname}`)
        if (topics.pathname !== pathname)
            handlefetchPosts()
    }, [dispatch, pathname, topics.pathname])

    useMount(() => {
        console.log('componentDidMount')
        const scrollTop = ls.get(pathname) || 0
        ls.remove(pathname)
        if (scrollTop)
            window.scrollTo(0, scrollTop)
    })

    useUpdateEffect(() => {
        console.log('componentDidUpdate')
        console.log(firstPathname.current, pathname)
    }, [pathname])

    const handleLoadMore = async () => {
        setLoadingTrue()
        dispatch(await getTopics({ page: topics.page + 1, pathname }))
        setLoadingFalse()
    }

    const { data } = topics

    return (
        <div className="main">
            <List
                dataSource={data}
                itemLayout="horizontal"
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta title={(
                            <Link
                                className="li-name"
                                to={`/article/${item.c_id}`}
                            >
                                {item.c_title}
                            </Link>
                        )}
                        />
                    </List.Item>
                )}
            />
            <ul>
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
