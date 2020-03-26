import request from '@/service'

export const getImagePage = (pageCode, pageSize) => {
    return request({
        url: '/admin/image/page',
        method: 'get',
        params: {
            pageCode,
            pageSize
        }
    })
}