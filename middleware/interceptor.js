import axios from 'axios'
import config from '@/service/config'
import { setToken, getToken } from '@/service/auth'
import { Form } from 'element-ui'

const cookie = process.client? require('js-cookie') : undefined

//访问拦截
export default function({store, req, redirect }){
    //console.log(store.state.token)

    let cookie = req != undefined? req.headers.cookie : 'Hm_lvt_86a28727a22fc484486d01e00c8e3776=1585538834;'
    //cookie.set("cookie", cookie)

    // axios({
    //     method: 'get',
    //     url: `${config.baseURL}/admin/isLogin`,
    //     withCredentials: true,
    //     headers: {
    //         'token': store.state.token
    //     }
    // }).then(res => {
    //     if(res.data.code == 20002){  
    //         redirect('/login')
    //     }
    // })   
}
