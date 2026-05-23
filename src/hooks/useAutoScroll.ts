import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ls from 'store2'

/**
 * 路由切换时恢复/记录滚动位置
 */
export function useAutoScroll(key: string) {
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        const handleScroll = () => {
            if (window.$timeout[key])
                clearTimeout(window.$timeout[key])

            window.$timeout[key] = window.setTimeout(() => {
                ls.set(`scroll_path_${pathname}`, window.scrollY)
            }, 200)
        }

        const scrollY = ls.get(`scroll_path_${pathname}`) || 0
        window.scrollTo(0, scrollY)
        ls.set(`scroll_path_${pathname}`, 0)

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [key, pathname])
}
