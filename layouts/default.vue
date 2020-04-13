<template>
  <div>
    <v-header/>
    <v-middle/>
    <v-footer/>
  </div>
</template>

<script>
import VHeader from '~/components/header'
import VFooter from '~/components/footer'
import VMiddle from '~/components/middle'
export default {
  components:{
    VHeader,
    VMiddle,
    VFooter,
  },
}
</script>

<style>

</style>
