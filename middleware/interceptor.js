import { timerAccess } from '~/api/admin'

//访问拦截
export default function({redirect, req}){
    //store.commit('SET_TOKEN', req.headers.cookie)
    
    console.log('>>>>>>>>>>>>>>>>>>>')
    //if(route.path.substring(0,6) == '/admin'){
    //    console.log(route)
    //}

    timerAccess().then(res => {
        console.log("res =====> ", res)
        if(res.code == 20002){  
            return redirect('/login')
        }
    })
    
    console.log('<<<<<<<<<<<<<<<<<<<')
}
