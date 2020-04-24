import request from '@/service'

export const page = (pageCode, pageSize) => {
    return request({
        url: '/admin/log/page',
        method: 'get',
        params: {
            pageCode,
            pageSize
        }
    })
}