import request from '@/service'

const prefix = '/admin/article'

/**
 * 发布文章
 */
export const save = (article) => {
    return request({
        url: `${prefix}`,
        method: 'post',
        data: article
    })
}

/**
 * 首页默认分页查询文章
 */
export const getPageArticle = (pageCode, pageSize) => {
    return request({
        url: '/article/page',
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
        url: `/article/${params}`,
        method: 'get'
    })
}

/**
 * 根据分页查询文章列表
 */
// export const getPageArticleByCategoryId = (pageCode, pageSize, categoryId) => {
//     return request({
//         url: '/article/category',
//         method: 'get',
//         params: {
//             pageCode,
//             pageSize,
//             categoryId
//         }
//     })
// }


/**
 * 根据标签查询文章列表
 */
export const getPageArticleByTagId = (pageCode, pageSize, tagId) => {
    return request({
        url: '/article/tag',
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
        url: '/article/category',
        method: 'get',
        params: {
            pageCode,
            pageSize,
            name
        }
    })
}

/**
 * 查询草稿箱
 */
export const getDrafts = (pageCode, pageSize) => {
    return request({
        url: `${prefix}/drafts`,
        method: 'get',
        params: {
            pageCode,
            pageSize,
        }
    })
}

/**
 * 查询回收站
 */
export const getRecycle = (pageCode, pageSize) => {
    return request({
        url: `${prefix}/recycle`,
        method: 'get',
        params: {
            pageCode,
            pageSize,
        }
    })
}

/**
 * 获取热门文章列表
 */
export const getHotList = () => {
    return request({
        url: '/article/hot',
        method: 'get',
    })
}

/**
 * 获取随机文章列表
 */
export const getRandList = () => {
    return request({
        url: '/article/rand',
        method: 'get',
    })
}

/**
 * 归档
 */
export const getArchives = () => {
    return request({
        url: '/article/archives',
        method: 'get'
    })
}

/**
 * 修改文章
 * @param {*} article 
 */
export const change = (article) => {
    return request({
        url: `${prefix}`,
        method: 'put',
        data: article
    })
}

export const recycle = (id) => {
    return request({
        url: `${prefix}/recycle/` + id,
        method: 'delete',
    })
}

/**
 * 删除文章
 * @param {*} ids 
 */
export const remove = (ids) => {
    return request({
        url: `${prefix}`,
        method: 'delete',
        data: ids
    })
}


/**
 * 生成锚点
 */
export const createAnchor = (content) => {
    const regex = /<(h[1-6])[\s\S]*?>/g
    const arr = content.match(regex)

    const arr2 = []
    if(arr != null && arr.length > 0){
        arr.forEach(item => {
            if(item.length <= 4){
                let index = content.indexOf(item)+3
                let front = content.substring(0,index)
                content = content.substring(index,content.length)
                arr2.push(front)
            }
        });
    }
    arr2.push(content)
    
    let str = ''
    for(var i = 0; i < arr2.length-1; i++){
        str += (arr2[i] + ' id="A' + Math.random().toString(36).substr(-10) + '"')
    }
    str+=arr2[arr2.length-1]
    return str
}