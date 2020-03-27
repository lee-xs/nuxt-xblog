import axios from 'axios'
import config from './config'
import { getToken } from '~/service/auth'
import { Message } from 'element-ui'

if(process.server){
   //config.baseURL = `http://${process.env.HOST || 'aleestar.cn'}:${process.env.PORT || 2922}`
   config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 2922}`
}

const service = axios.create(config)


//请求处理
service.interceptors.request.use(
    config => {
        // if(store.state.token){
        //     onfig.headers['Token'] = getToken()
        // }
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
        console.log(">>>>>>>>>>>>>>>>>>")
        console.log(res)
        console.log("<<<<<<<<<<<<<")
        if(res.code != 20000){
            
            Message({
                type: 'error',
                message: res.message
            })

            //登录失效或未登录
            if(res.code == 20002){
                console.log('1111111111111111111111111111111111111111111')
                Message({
                    type: 'error',
                    message: res.message
                })
                
                //window.location.href = "/login"
                //redirect(true, '/login')
            }
        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service