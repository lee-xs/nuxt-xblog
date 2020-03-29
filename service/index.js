import axios from 'axios'
import config from './config'
import { Message } from 'element-ui'
import { state } from '@/store'

if(process.server){
   //config.baseURL = `http://${process.env.HOST || 'aleestar.cn'}:${process.env.PORT || 2922}`
   config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 2922}`
}

const service = axios.create(config)

//请求处理
service.interceptors.request.use(
    config => {
        //config.headers['Cookie'] = 'Hm_lvt_86a28727a22fc484486d01e00c8e3776=1585393262; JSESSIONID=4EF653634D332D0D1ACB66C0DD440842; Hm_lpvt_86a28727a22fc484486d01e00c8e3776=1585395034'
        config.headers['Cookie'] = state.cookie == undefined ? 'Hm_lvt_86a28727a22fc484486d01e00c8e3776=1585393262; JSESSIONID=4EF653634D332D0D1ACB66C0DD440842; Hm_lpvt_86a28727a22fc484486d01e00c8e3776=1585395034' : state.cookie
        console.log(state.cookie)
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

            //登录失效或未登录
            //if(res.code == 20002){
            //    Message({
            //        type: 'error',
            //        message: res.message
             //   })
            //}
        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service