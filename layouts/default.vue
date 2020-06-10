<template>
  <div>
    <v-header/>
    <v-middle/>
    <v-footer/>
  </div>
</template>

<script>
import jsonp from 'jsonp'
import VHeader from '~/components/home/header'
import VFooter from '~/components/home/footer'
import VMiddle from '~/components/home/middle'
export default {
  components:{
    VHeader,
    VMiddle,
    VFooter,
  },
  head(){
    return {
      // script: [
      //   { 
      //     type: 'text/javascript',
      //     src: 'http://pv.sohu.com/cityjson?ie=utf-8'
      //   }
      // ]
    }
  },
  mounted(){
    // this.$axios({
    //   method: 'get',
    //   //url: 'http://ip-api.com/json/?lang=zh-CN',
    //  // url: 'https://api.ip138.com/query/?token=416f448c2932a7e2562bab97559de3d8',
    // }).then(res => {
    //   //发送访问网站的请求
    //   console.log(res)
    //   this.$api.visit(res.query).then(res => {})
    // })
    jsonp('https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=A4BBZ-67HC6-Z6RSV-EPT44-5WE4F-XFFEP', null, (err, data) => {
      //发送访问网站的请求
      this.$api.visit(data.result.ip).then(res => {})
    })
  },
}
</script>

<style>

</style>
