import { getSite } from '~/api/site'
import { getMenuAll } from '~/api/menu'
import { getTimer } from '~/api/admin'
//import { getToken } from '~/service/auth'

export const state = () => ({
    siteInfo: {},
    compileArticle: {},
    menuList: {},
    timer: '',
    token: '',
})

export const mutations = {
    SET_SITEINFO: (state, data) => {
        state.siteInfo = data
    },
    SET_COMPILEARTICLE: (state, data) => {
        state.compileArticle = data
    },
    SET_MENU: (state, data) => {
        state.menuList = data
    },
    SET_TIMER: (state, data) => {
        state.timer = data
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    }    
}

export const actions = {
    //设置站点,导航菜单信息
    async nuxtServerInit({commit, state}, {req}){
        let cookie = req.headers.cookie
        let token = parseCookie(cookie)
        console.log('nuxtServerInit')
        await getTimer()
        commit('SET_TOKEN', token.AdminToken)
        commit('SET_SITEINFO', (await getSite()).data)
        commit('SET_MENU', (await getMenuAll()).data)
    },

    async isLogin(){
        ///console.log('111111111111')
        await getTimer().then(res => {
            //console.log('222222222222')
        })
        //console.log('333333333333')
    }
}

/**
 * 格式化cookie
 * @param {*} cookie 
 */
export const parseCookie = (cookie) => {
    var result = "";
    cookie = cookie + ";"
    var cookies = cookie.split(";");
    for (var i = 0; i < cookies.length - 1; i++) {
        if (cookie[i].split("=").length > 0) {
            result = result + ",\"" + cookies[i].split("=")[0].trim() + "\":\"" + cookies[i].split("=")[1] + "\"";
        }
    }
    cookie = JSON.parse("{" + result.substr(1).replace("\\", "") + "}");
    result = cookie;
    return result
}