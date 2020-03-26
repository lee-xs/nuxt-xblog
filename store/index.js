import { getSite } from '~/api/site'
import { getMenuAll } from '~/api/menu'
import { getToken} from '~/service/auth'

export const state = () => ({
    siteInfo: {},
    compileArticle: {},
    menuList: {},
    token: getToken(),
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
    SET_TOKEN: (state, token) => {
        state.token = token
    }    
}

export const actions = {
    //设置站点,导航菜单信息
    async nuxtServerInit({commit}){
        commit('SET_SITEINFO', (await getSite()).data)
        commit('SET_MENU', (await getMenuAll()).data)
    }
}