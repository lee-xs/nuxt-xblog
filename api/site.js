import request from '@/service'

/**
 * 站点信息
 */
export const getSite = () => {
    return request({
        url: '/site',
        method: 'get'
    })
}

/**
 * 站点详情
 */
export const getSiteInfo = () => {
    return request({
        url: '/site/info',
        method: 'get'
    })
}

/**
 * 更新站点信息
 */
export const update = (site) => {
    return request({
        url: '/admin/site',
        method: 'put',
        data: site
    })
}