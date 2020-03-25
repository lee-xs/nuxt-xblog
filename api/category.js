import request from '@/service'

export const save = (name) => {
    return request({
        url: '/category',
        method: 'post',
        params: {
            name
        }
    })
}

export const getAll = () => {
    return request({
        url: '/category/all',
        method: 'get'
    })
}

export const page = (pageCode, pageSize) => {
    return request({
        url: '/category/page',
        method: 'get',
        params: {
            pageCode, 
            pageSize
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/category',
        method: 'delete',
        data: ids
    })
}

export const change = (category) => {
    return request({
        url: '/category',
        method: 'put',
        data: category
    })
}