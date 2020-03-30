import axios from 'axios'
import config from '@/service/config'
import { setToken, getToken } from '@/service/auth'
import { Form } from 'element-ui'

//访问拦截
export default function({req, redirect, store }){
    console.log('interceptor')
    let cookie = req != undefined? req.headers.cookie : 'Hm_lvt_86a28727a22fc484486d01e00c8e3776=1585538834;'

    axios({
        method: 'get',
        url: `${config.baseURL}/admin/isLogin`,
        withCredentials: true,
        headers: {
            'Cookie': cookie
        }
    }).then(res => {
        if(res.data.code == 20002){  
            redirect('/login')
        }
    })   
}
