import request from '@/service'

/**
 * 后台添加友链
 */
export const add = (links) => {
    return request({
        url: '/admin/links/add',
        method: 'post',
        data: links
    })
}

/**
 * 前台添加友链
 */
export const save = (links) => {
    return request({
        url: '/links',
        method: 'post',
        data: links
    })
}

/**
 * 查询所有友链
 */
export const getAll = () => {
    return request({
        url: '/links',
        method: 'get'
    })
}

export const page = (pageCode, pageSize) => {
    return request({
        url: '/admin/links/page',
        method: 'get',
        params: {
            pageCode, 
            pageSize
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/admin/links',
        method: 'delete',
        data: ids
    })
}

export const change = (links) => {
    return request({
        url: '/admin/links',
        method: 'put',
        data: links
    })
}

export const changeState = (id, state) => {
    return request({
        url: '/admin/links/state/'+id + '/' + state,
        method: 'put',
    })
}

