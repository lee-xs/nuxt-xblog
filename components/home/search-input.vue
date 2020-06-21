<template>
  <el-row class="animated fadeInUp">
      <el-col :span="24" class="card-container">
        <p class="card-container-title">站内搜索</p>
        <div class="card-container-content" style="padding: 10px;">
            <el-input @keyup.enter.native="handleSearch()" v-model="search" style="width: 82%;" placeholder="请输入搜索内容"></el-input><el-button @click="handleSearch()" style="width: 18%;" icon="el-icon-search" type="primary"></el-button>
        </div> 
      </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
        search: ''
    };
  },
  methods:{
      handleSearch(){
          if(this.search == '' || this.search == null){
              return;
          }

          this.$emit('search', this.search)
      }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/css/common.scss';
/deep/ .el-button--primary{
    padding: 12px;
}
/deep/ .el-button{
    border-radius: 0;
    vertical-align: top;
}
/deep/ .el-input__inner{
    border-radius: 0;
}
</style>