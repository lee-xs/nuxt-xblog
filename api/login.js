import request from '@/service'

export const login = (username, password) => {
    return request({
        url: '/login',
        method: 'post',
        params: {
            username,
            password
        }
    })
}