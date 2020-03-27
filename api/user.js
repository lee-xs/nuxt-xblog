import request from '@/service'

export const getUserPage = (pageCode, pageSize) => {
    return request({
        url: '/user/page',
        method: 'get',
        params:{
            pageCode,
            pageSize
        }
    })
}