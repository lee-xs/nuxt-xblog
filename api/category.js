import request from '@/service'

export const getAll = () => {
    return request({
        url: '/category/all',
        method: 'get'
    })
}