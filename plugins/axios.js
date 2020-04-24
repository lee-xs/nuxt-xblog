import { Message } from 'element-ui'
//import config from '@/service/config'

const cookie = process.client? require('js-cookie') : undefined

export default function({ $axios, store, redirect }){
    $axios.defaults.baseURL = 'http://127.0.0.1:2922'
    $axios.defaults.timeout = 5000
    //$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    //$axios.defaults.config = config

    $axios.interceptors.request.use(config => {
        if(store.state.token != undefined){
            config.headers['token'] = store.state.token
        }
        return config
    })

    $axios.interceptors.response.use(response => { 
        const res = response.data
        if(res.code != 20000){
            Message({
                type: 'error',
                message: res.message
            })
            /**
             * 登录失效或未登录
             */
            if(response.code = 20002) {
                //redirect('/login')
            }
        }
        return res
    })
}