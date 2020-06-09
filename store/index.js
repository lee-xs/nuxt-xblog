export const state = () => ({
    siteInfo: {},
    compileArticle: {},
    menuList: {},
    token: null,
    ipAddress: null,
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
    SET_TOKEN: (state, data) => {
        state.token = data
    },
    SET_IPADDRESS: (state, data) => {
        state.ipAddress = data
    }
}

export const actions = {
    //设置站点,导航菜单信息
    async nuxtServerInit({commit}, {req, app}){      
        const cookie = parseCookie(req.headers.cookie)
        commit('SET_TOKEN', cookie.token)
        commit('SET_SITEINFO', (await app.$api.selectSite()).data)
        commit('SET_MENU', (await app.$api.selectMenuAll()).data)
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
