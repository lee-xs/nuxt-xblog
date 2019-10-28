import request from '@/service'

/**
 * 添加友链
 * @param {*} links 
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