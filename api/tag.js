import request from '@/service'

export const save = (name) => {
    return request({
        url: '/admin/tag',
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
        url: '/admin/tag',
        method: 'delete',
        data: ids
    })
}

export const change = (tag) => {
    return request({
        url: '/admin/tag',
        method: 'put',
        data: tag
    })
}