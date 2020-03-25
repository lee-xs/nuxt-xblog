import request from '@/service'

export const save = (name) => {
    return request({
        url: '/tag',
        method: 'post',
        params: {
            name
        }
    })
}

export const getAll = () => {
    return request({
        url: '/tag/all',
        method: 'get'
    })
}

export const page = (pageCode, pageSize) => {
    return request({
        url: '/tag/page',
        method: 'get',
        params: {
            pageCode, 
            pageSize
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/tag',
        method: 'delete',
        data: ids
    })
}

export const change = (tag) => {
    return request({
        url: '/tag',
        method: 'put',
        data: tag
    })
}