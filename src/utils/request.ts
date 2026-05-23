import type { AxiosResponse } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'

import type { IApiResponse } from '~/types'
import { apiConfig } from './config'
import { showMessage } from './message'

const TOKEN_KEY = 'token'

export const request = axios.create({
    timeout: apiConfig.timeout,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})

request.interceptors.request.use(
    (config) => {
        NProgress.start()
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error),
)

request.interceptors.response.use(
    response => response,
    (error) => {
        const response = {} as AxiosResponse
        response.config = error.config
        response.data = null
        response.headers = error.config?.headers
        response.status = error.code
        response.statusText = error.message
        response.request = error.request
        return Promise.resolve(response)
    },
)

function checkStatus<T>(response: AxiosResponse): IApiResponse<T> {
    NProgress.done()
    if (response.status === 200 || response.status === 304) {
        return response.data as IApiResponse<T>
    }
    if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        window.location.href = '/login'
        return {
            code: 401,
            message: '您还没有登录, 或者登录超时!',
            data: null as T,
            info: response.statusText,
        }
    }
    return {
        code: -404,
        message: `接口返回数据错误, 错误代码: ${response.status || '未知'}`,
        data: null as T,
        info: response.statusText,
    }
}

function checkCode<T>(data: IApiResponse<T>): IApiResponse<T> {
    if (data.code === -500) {
        window.location.href = '/backend'
    }
    else if (data.code === -400) {
        window.location.href = '/'
    }
    else if (data.code !== 200) {
        showMessage(data.message)
    }
    return data
}

/**
 * GET 请求
 */
export async function get<T>(url: string, params?: Record<string, unknown>): Promise<IApiResponse<T>> {
    const response = await request({
        method: 'get',
        url: apiConfig.api + url,
        params,
        timeout: apiConfig.timeout,
    })
    return checkCode(checkStatus<T>(response))
}

/**
 * POST 请求（form-urlencoded）
 */
export async function post<T>(url: string, data?: Record<string, unknown>): Promise<IApiResponse<T>> {
    const response = await request({
        method: 'post',
        url: apiConfig.api + url,
        data: qs.stringify(data),
        timeout: apiConfig.timeout,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    })
    return checkCode(checkStatus<T>(response))
}

/**
 * 文件上传
 */
export async function uploadFile<T>(url: string, data?: FormData): Promise<IApiResponse<T>> {
    const response = await request({
        method: 'post',
        url,
        data,
    })
    return checkCode(checkStatus<T>(response))
}
