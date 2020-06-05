const cookie = process.client? require('js-cookie') : undefined

//访问拦截
export default function({store, app }){
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
