import http from 'http'
import https from 'https'

export default {
    //baseURL: 'http://aleestar.cn/api' || 'http://62.234.142.187/api',
    baseURL: 'http://localhost:2922',
    timeout: 50000,
    //自定义的请求头
    headers: {
        post: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        'X-Requested-With': 'XMLHttpRequest'
    },
    //超时设置 10s
    timeout: 10000,
    //跨域是否携带token
    withCredentials: true,
    //响应的数据格式 json/ blob/ document/ arraybuffer/ text/ stream
    responseType: 'json',
    //用于node.js
    httpAgent: new http.Agent({
        keepAlive: true
    }),
    httpsAgent: new https.Agent({
        keepAlive: true
    }),
}