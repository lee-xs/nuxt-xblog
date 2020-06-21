<template>
  <el-row class="animated fadeInUp">
      <el-col :span="24" class="card-container">
        <p class="card-container-title">随机文章</p>
        <div class="card-container-content">
            <el-row>
                <el-col :span="24" v-for="(item,index) in randList" :key="index">
                    <nuxt-link :to="'/' + item.id + '.html'" class="content-title">
                        <p v-text="item.title"></p>
                    </nuxt-link>
                    <p style="color: #969696; margin-bottom: 8px;"><span v-text="'阅读 ' + item.views"></span><span style="float:right;" v-text="item.publishTime.substring(5,10)"></span></p>
                    <!-- <el-row :gutter="10" class="content">
                        <el-col :span="8">
                            <nuxt-link :to="'/' + item.id + '.html'">
                               <div class="content-img-frame"><img :src="item.cover" class="content-img"/></div>
                            </nuxt-link>
                        </el-col>
                        <el-col :span="16" style="padding-top:3px;">
                            <nuxt-link :to="'/' + item.id + '.html'" class="content-title">
                                <p v-text="item.title.substring(0,21)"></p>
                            </nuxt-link>
                            <p>
                                <span><i class="el-icon-chat-square">&nbsp;<span class="list-tag" v-text="item.comments"></span></i></span>
                                <span><i class="el-icon-star-off">&nbsp;<span class="list-tag" v-text="item.likes">0</span></i></span>
                                <span><i class="el-icon-view">&nbsp;<span class="list-tag"  v-text="item.views">0</span></i></span>
                                <span style="float:right;"><span v-text="item.publishTime.substring(0,10)"></span></span>
                            </p>
                        </el-col>
                    </el-row> -->
                </el-col>
            </el-row>
        </div> 
      </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['randList'],
  data() {
    return {
  
    };
  },
  methods:{
      
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/css/common.scss';

</style>