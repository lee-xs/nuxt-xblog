import request from '@/service'

export const getImagePage = (pageCode, pageSize) => {
    return request({
        url: '/image/page',
        method: 'get',
        params: {
            pageCode,
            pageSize
        }
    })
}