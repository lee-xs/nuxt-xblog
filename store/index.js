import { getSite } from '~/api/site'

export const state = () => ({
    siteInfo: {},
    compileArticle: {},
})

export const mutations = {
    SET_SITEINFO: (state, data) => {
        state.siteInfo = data
    },
    SET_COMPILEARTICLE: (state, data) => {
        state.compileArticle = data
    }      
}

export const actions = {
    //设置站点信息
    async nuxtServerInit({commit}){
        commit('SET_SITEINFO', (await getSite()).data)
    }
}