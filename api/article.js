import request from '@/service'

const prefix = '/article'

/**
 * 首页默认分页查询文章
 */
export const getPageArticle = (pageCode, pageSize) => {
    return request({
        url: `${prefix}/page`,
        method: 'get',
        params: {
            pageCode,
            pageSize,
        }
    })
}

/**
 * 查询文章信息
 */
export const getArticle = (params) => {
    return request({
        url: `${prefix}/${params}`,
        method: 'get'
    })
}

/**
 * 根据分页查询文章列表
 */
export const getPageArticleByCategoryId = (pageCode, pageSize, categoryId) => {
    return request({
        url: `${prefix}/category`,
        method: 'get',
        params: {
            pageCode,
            pageSize,
            categoryId
        }
    })
}


/**
 * 根据标签查询文章列表
 */
export const getPageArticleByTagId = (pageCode, pageSize, tagId) => {
    return request({
        url: `${prefix}/tag`,
        method: 'get',
        params: {
            pageCode,
            pageSize,
            tagId
        }
    })
}

/**
 * 根据分类查询文章列表
 */
export const getPageArticleByCategory = (pageCode, pageSize, name) => {
    return request({
        url: `${prefix}/category`,
        method: 'get',
        params: {
            pageCode,
            pageSize,
            name
        }
    })
}

/**
 * 获取热门文章列表
 */
export const getHotList = () => {
    return request({
        url: `${prefix}/hot`,
        method: 'get',
    })
}

/**
 * 获取热门文章列表
 */
export const getRandList = () => {
    return request({
        url: `${prefix}/rand`,
        method: 'get',
    })
}

/**
 * 归档
 */
export const getArchives = () => {
    return request({
        url: `${prefix}/archives`,
        method: 'get'
    })
}