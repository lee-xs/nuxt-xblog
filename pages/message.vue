<template>
  <el-row id="box">
    <el-carousel height="20px" direction="vertical" :interval="8000" style="border:1px solid red;">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">我放假佛期间饿哦请我of</h3>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>

<script>
export default {
  head(){
    return{
      title: `${this.$store.state.siteInfo.site.siteName} ♥ 留言板`,
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 20px;
  margin: 0;
}
</style>