import request from '@/service'

export const getImagePage = (pageCode, pageSize) => {
    return request({
        url: '/image/page',
        method: 'get',
        params: {
            pageCode,
            pageSize
        }
    })
}

export const upload = (file) => {
    return request({
        url: '/upload',
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}