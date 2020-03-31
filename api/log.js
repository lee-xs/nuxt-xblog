import request from '@/service'

export const page = (pageCode, pageSize) => {
    return request({
        url: '/log/page',
        method: 'get',
        params: {
            pageCode,
            pageSize
        }
    })
}