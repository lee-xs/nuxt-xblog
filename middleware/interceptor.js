import config from '@/service/config'
import { setToken, getToken } from '@/service/auth'
import { Form } from 'element-ui'

const cookie = process.client? require('js-cookie') : undefined

//访问拦截
export default function({store, redirect, app }){
    const token = (store.state.token != undefined && store.state.token != null)? store.state.token : ""

    app.$axios({
        method: 'get',
        url: '/admin/isLogin',
        withCredentials: true,
        headers:{
            'token': token
        }
    })
}
