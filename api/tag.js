import request from '@/service'

export const getAll = () => {
    return request({
        url: '/tag/all',
        method: 'get'
    })
}