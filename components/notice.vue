<template>
  <el-row class="notice animated fadeInUp">
    <el-col>
      <i class="el-icon-bell" style="float:left;line-height: 20px;"></i>
      <el-carousel height="20px" direction="vertical" :interval="7000">
        <el-carousel-item v-for="(item,index) in noticeList" :key="index">
          <h3 class="medium" v-text="item.content"></h3>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css' //element布局隐藏css
export default {
  props: ['noticeList'], 
}
</script>

<style lang="scss" scoped>
.notice {
  margin: 10px 0;
  font-size: 14px;
  .el-icon-bell {
    margin-right: 10px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 20px;
  margin: 0;
}
</style>
