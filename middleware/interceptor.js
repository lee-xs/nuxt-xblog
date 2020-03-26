import { getToken } from '~/service/auth'

//访问拦截
export default function({store, route, redirect, error}){
    const redirectURL = '/login'
    if(store.state.token == undefined && getToken() == undefined){
        redirect(redirectURL)
    }
}