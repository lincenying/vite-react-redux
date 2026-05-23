import { createBrowserRouter } from 'react-router'

import BasicLayout from '~/layouts/BasicLayout'
import ArticlePage from '~/pages/ArticlePage'
import NotFoundPage from '~/pages/NotFoundPage'
import TopicsPage from '~/pages/TopicsPage'

export const router = createBrowserRouter([
    {
        element: <BasicLayout />,
        children: [
            {
                index: true,
                element: <TopicsPage />,
            },
            {
                path: 'article/:id',
                element: <ArticlePage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
])
