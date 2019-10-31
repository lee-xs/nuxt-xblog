import request from '@/service'



/**
 * 获取通知
 */
export const getNotice = () => {
    return request({
        url: '/notice',
        method: 'get'
    })
}