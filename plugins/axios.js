import { Message } from 'element-ui'
//import config from '@/service/config'

const cookie = process.client? require('js-cookie') : undefined

export default function({ $axios, store, redirect }){
    //$axios.defaults.baseURL = 'http://127.0.0.1:2922'
    $axios.defaults.baseURL = 'https://alees.cn/api' || 'https://49.232.156.194/api'
    $axios.defaults.timeout = 30000
    //$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    $axios.interceptors.request.use(config => {
        const token = (store.state.token != undefined && store.state.token != null)? store.state.token : ''

        config.headers['token'] = token
        //config.headers['ipAddress'] = store.state.ipAddress
        return config
    })

    $axios.interceptors.response.use(response => {
        const res = response.data
        if(res.code == 20001){
            Message({
                type: 'error',
                message: res.message
            })
        }

        /**
         * 登录失效或未登录
         */
        if(res.code == 20002) {
            Message({
                type: 'error',
                message: res.message
            })

            store.commit('SET_TOKEN', null)
            redirect('/login')
        }
        return res
    })
}
