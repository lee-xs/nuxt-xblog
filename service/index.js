import axios from 'axios'
import config from './config'
import { Message } from 'element-ui'
import { state } from '@/store'

if(process.server){
    //config.baseURL = `http://${process.env.HOST || 'alees.cn'}:${process.env.PORT || 2922}`
    config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 2922}`
}

const service = axios.create(config)


//请求处理
service.interceptors.request.use(
    config => {
        console.log(state.cookie)
        //config.headers['Token'] = state.cookie
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//返回结果处理
service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code != 20000){
            
            Message({
                type: 'error',
                message: res.message
            })

        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service