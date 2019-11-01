<template>
  <div>
    <v-header/>
    <v-middle/>
    <v-footer :icp="icp" :run="run" :siteName="siteName"/>
  </div>
</template>

<script>
import { getSite } from '~/api/site'
import VHeader from '~/components/header'
import VFooter from '~/components/footer'
import VMiddle from '~/components/middle'
export default {
  components:{
    VHeader,
    VMiddle,
    VFooter,
  },
  data(){
    return{
      icp: '',
      run: '',
      siteName: '',
    }
  },
  created(){
    getSite().then(res => {
      this.icp = res.data.site.icp
      this.run = res.data.site.run
      this.siteName = res.data.site.siteName
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
