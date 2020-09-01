<template>
  <div>
    <v-header/>
    <v-middle/>
    <v-footer/>
  </div>
</template>

<script>
import { initMouse } from '~/assets/js/cursor-effects'
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
      script: [
        /* { 
          type: 'text/javascript',
          src: 'http://pv.sohu.com/cityjson?ie=utf-8'
        } */
      ]
    }
  },
  mounted(){
    // this.$axios({
    //   method: 'get',
    //   //url: 'http://ip-api.com/json/?lang=zh-CN',
    //  // url: 'https://api.ip138.com/query/?token=416f448c2932a7e2562bab97559de3d8',
    // }).then(res => {
    //   //发送访问网站的请求
    //   this.$api.visit(res.query).then(res => {})
    // })
    jsonp('https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=A4BBZ-67HC6-Z6RSV-EPT44-5WE4F-XFFEP', null, (err, data) => {
      //发送访问网站的请求
      this.$api.visit(data.result.ip).then(res => {})
    })
    
    if(process.browser){
      initMouse();
    }

    //控制台输出
    console.log("%c Ver 1.0.1 %c Aria By Star https://aleestar.cn", "color: #FFFFFF; background-color: #2F4F4F; font-size: 16px; padding: 5px 2.5px;", "color: #FFFFFF; background-color: #778899; font-size: 16px; padding: 5px 10px 5px 5px;")
    console.log("%c 博客名称 %c Aleestar'Blogs", "color: #FFFFFF; background-color: #000000; font-size: 20px; padding: 5px 0;", "font-size: 20px; color: #007aff;")
    console.log("%c 博客地址 %c https://blog.aleestar.cn", "color: #FFFFFF; background-color: #000000; font-size: 20px; padding: 5px 0;", "font-size: 20px; color: #007aff;")
  },
}
</script>

<style>

</style>
