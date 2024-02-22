import { Card, Spin } from 'antd'
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
        <div className="main">
            <Spin
                delay={100}
                size="large"
                spinning={article.pathname !== pathname}
            >
                <Card
                    bordered={false}
                    title={data?.c_title}
                >
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: data?.c_content || '' }}
                    />
                </Card>
            </Spin>
        </div>
    )
}
