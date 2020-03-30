import { getSite } from '~/api/site'
import { getMenuAll } from '~/api/menu'
import { setToken, getToken } from '~/service/auth'

export const state = () => ({
    siteInfo: {},
    compileArticle: {},
    menuList: {},
    timer: '',
    cookie: '222222222222222222222222222',
    token: '111',
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
    },
    SET_COOKIE: (state, data) => {
        state.token = data
    }    
}

export const actions = {
    //设置站点,导航菜单信息
    async nuxtServerInit({commit, state}, {req}){

        commit('SET_SITEINFO', (await getSite()).data)
        commit('SET_MENU', (await getMenuAll()).data)
    },
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
