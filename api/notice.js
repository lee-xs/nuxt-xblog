import request from '@/service'

export const page = (pageCode, pageSize) => {
    return request({
        url: '/notice/page',
        method: 'get',
        params: {
            pageCode,
            pageSize
        }
    })
}

export const save = (notice) => {
    return request({
        url: '/admin/notice',
        method: 'post',
        data: notice
    })
}

export const remove = (id) => {
    return request({
        url: `/admin/notice/${id}`,
        method: 'delete',
    })
}

export const change = (notice) => {
    return request({
        url: '/admin/notice',
        method: 'put',
        data: notice
    })
}

export const changeState = (id, state) => {
    return request({
        url: `/admin/notice/state/${id}/${state}`,
        method: 'put',
    })
}