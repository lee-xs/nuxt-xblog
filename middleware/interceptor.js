import { getToken } from '~/service/auth'
import { timer } from '~/api/admin'

//访问拦截
export default function({store, redirect}){
    console.log('111111111111111111')
    //timer();

    //timer()

    store.dispatch('isLogin')
    
    console.log('22222222222222222222')
    //store.commit('SET_TIMER', setInterval(timer, 1000))
    // const redirectURL = '/login'
    // if(store.state.token == '' || store.state.token == undefined){
    //     redirect(redirectURL)
    // }
            // if(process.browser){
            //     console.log(getToken())
            //     if(getToken() == undefined){
            //         redirect(redirectURL)
            //     }
            //     //console.log(window.sessionStorage.getItem("token"))
            // }
    // if(process.client || process.browser){
        
    //     if(store.state.token == '' && window.sessionStorage.getItem("token") == null){
    //         redirect(redirectURL)
    //     }
    // }
}