import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-60vh">
            <Result
                extra={(
                    <Button onClick={() => navigate('/')} type="primary">
                        返回首页
                    </Button>
                )}
                status="404"
                subTitle="抱歉，您访问的页面不存在"
                title="404"
            />
        </div>
    )
}

export default NotFoundPage
