import request from '@/service'

export const getUserPage = (pageCode, pageSize) => {
    return request({
        url: '/admin/user/page',
        method: 'get',
        params:{
            pageCode,
            pageSize
        }
    })
}