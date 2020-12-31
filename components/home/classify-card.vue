<template>
  <el-row class="animated fadeInUp">
      <el-col :span="24" class="card-container">
        <p class="card-container-title">全部分类</p>
        <div class="card-container-content">
          <Tag style="margin-bottom: 6px;" v-for="(item,index) in classifyList" :key="index" :color="color[index%17]">
            <nuxt-link :to="'/classify/' + item.name">
              <span v-text="'# '+item.name"></span>
            </nuxt-link>
          </Tag> 
        </div> 
      </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["classifyList"],
  data() {
    return {
      color: ["primary","success","warning","error","blue","green","red","yellow","pink","magenta","volcano","orange","gold","lime","cyan","geekblue","purple"]
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/common.scss';

</style>