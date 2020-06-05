<template>
  <div>
    <v-header/>
    <v-middle/>
    <v-footer/>
  </div>
</template>

<script>
import axios from 'axios'
const jsonp = require('jsonp')
import VHeader from '~/components/home/header'
import VFooter from '~/components/home/footer'
import VMiddle from '~/components/home/middle'
export default {
  components:{
    VHeader,
    VMiddle,
    VFooter,
  },
  mounted(){
    // this.$api.sohuIp().then(res => {
    //   console.log(res)
    // })


    // this.$axios({
    //     method: 'get',
    //     url: 'http://pv.sohu.com/cityjson?ie=utf-8',
    //     changeOrigin: true,
    //     withCredentials: true,
    // }).then(res => {
    //   console.log(res)
    // })

   

    // var ipJson = ipRes.substring(19, ipRes.length - 1)
    // let ip = JSON.parse(ipJson).cip
    // store.commit('SET_IPADDRESS', ip)
    // console.log(store.state.ipAddress)

  
    // var ipJson = ipRes.substring(19, ipRes.length - 1)
    // let ip = JSON.parse(ipJson).cip
    // console.log(ip)
    // store.commit('SET_IPADDRESS', ip)
  },
  created(){
    this.$axios({
      method: 'get',
      url: 'http://api.k780.com/?app=ip.local&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json',
      changeOrigin: true,
      withCredentials: true,
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
