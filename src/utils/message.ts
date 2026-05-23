import { message } from 'antd'

import type { IMessage, TMessageType } from '~/types'

/**
 * 统一消息提示（Ant Design message）
 */
export function showMessage(config: IMessage | string): void {
    let content: string
    let type: TMessageType
    if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }
    message[type](content)
}
