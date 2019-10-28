import request from '@/service'

/**
 * 获取幻灯片
 */
export const getSlide = () => {
    return request({
        url: '/slide',
        method: 'get'
    })
}

/**
 * 获取通知
 */
export const getNotice = () => {
    return request({
        url: '/notice',
        method: 'get'
    })
}