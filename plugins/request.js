export default ({ app : { $axios }}, inject) => {
    let requestList = {}
    let methods = ['get', 'post', 'put', 'delete']
    methods.forEach(method => {
        let dataKey = method == 'get' ? 'params' : 'data'
        requestList[method] = function(url, data){
            return $axios({
                method,
                url,
                [dataKey]: data,
                //headers
            })
        }
    })
    inject('request', requestList)
    // inject('request',  {
    //     get(url, params){
    //         return $axios({
    //             method: 'get',
    //             url,
    //             params,
    //         })
    //     },

    //     post222(url, params){
    //         return $axios({
    //             method: 'post',
    //             url,
    //             params: {
    //                 "username": "admin",
    //                 "password": "admin123"
    //             }
    //         })
    //     },

    //     post(url, data){
    //         return $axios({
    //             method: 'post',
    //             url,
    //             data,
    //         })
    //     },
    // })
}
