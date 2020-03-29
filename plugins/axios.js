import { Message } from 'element-ui'
import axios from 'axios'

export default function ({store, redirect}) {

    axios.defaults.baseURL = 'http://localhost:2922'

    axios.onRequest(config => {
        config.headers.common['Cookie'] = store.state.token
    })

    //$axios.interceptors.request.use(config => {
    //    config.headers['Cookie'] = store.state.token
    //})

    axios.interceptors.response.use(response => {
        const res = response.data
        if(res.code != 20000){
            Message({
                type: 'error',
                message: res.message
            })

            if(res.code == 20002){
                return redirect('/login')
            }
        }
        return res
    })

}