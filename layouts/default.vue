<template>
  <div>
    <v-header/>
    <v-middle/>
    <v-footer/>
  </div>
</template>

<script>
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
  data: () => ({
    ipAddress: ''
  }),
  mounted(){
    this.$axios({
      method: 'get',
      url: 'http://ip-api.com/json/?lang=zh-CN',
    }).then(res => {
      this.ipAddress = res.query
      //发送访问网站的请求
      this.$api.visit(this.ipAddress).then(res => {})
    })
  },
}
</script>

<style>

</style>
