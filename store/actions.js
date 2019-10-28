import request from '@/service'

export const findArticlePage = async (store, pageCode, pageSize) => {
    return await request.get('/article/page', {pageCode, pageSize})
}
