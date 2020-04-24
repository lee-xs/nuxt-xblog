import request from '@/service'

/**
 * 登录后，定时请求后台
 */
export const timerAccess = () => {
    return request({
        url: '/admin/timer',
        method: 'get'
    })
}

export const removeAllRedis = () => {
    return request({
        url: '/admin/redis',
        method: 'get'
    })
}