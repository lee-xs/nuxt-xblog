import request from '@/service'

/**
 * 获取幻灯片
 */
export const getSlideAll = () => {
    return request({
        url: '/slide',
        method: 'get'
    })
}

/**
 * 修改幻灯片
 */
export const updateSlide = (slide) => {
    return request({
        url: '/slide',
        method: 'put',
        data: slide
    })
}

/**
 * 删除幻灯片
 */
export const delSlide = (id) => {
    return request({
        url: '/slide/' + id,
        method: 'delete'
    })
}

/**
 * 添加幻灯片
 */
export const save = (slide) => {
    return request({
        url: '/slide',
        method: 'post',
        data: slide
    })
}