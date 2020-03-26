import request from '@/service'

export const getMenuAll = () => {
    return request({
        url: '/menu',
        method: 'get',
    })
}

export const save = (menu) => {
    return request({
        url: '/admin/menu',
        method: 'post',
        data: menu
    })
}

export const change = (menu) => {
    return request({
        url: '/admin/menu',
        method: 'put',
        data: menu
    })
}

export const remove = (id) => {
    return request({
        url: `/admin/menu/${id}`,
        method: 'delete',
    })
}

export const changeState = (id, state) => {
    return request({
        url: `/admin/menu/state/${id}/${state}`,
        method: 'put',
    })
}

export const page = (pageCode, pageSize) => {
    return request({
        url: `/admin/menu/page`,
        method: 'get',
        params: {
            pageCode, 
            pageSize
        }
    })
}