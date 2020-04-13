<template>
  <el-row class="archives-container">
    <el-col :span="24" class="hidden-md-and-down">
      <v-notice :noticeList="noticeList"/>
    </el-col>

    <!-- 时间线 -->
    <el-col :span="17" style="padding-right:5px;" class="animated bounceInLeft">
      <div class="timeline-container" style="background-color:#fff;">
        <div style="padding:10px 10px; margin-bottom:20px; border-bottom:1px solid #cccccc;">
          <p><span style="font-size:18px; margin-right:10px;"><b>文章归档</b></span><span>继续努力！</span></p>
        </div>
        <ul class="timeline" v-for="(list, index) in archivesList" :key="index">
          <li class="tl-header">
            <h3 class="tl-year-month" v-text="list.time"></h3>
          </li>
          <div class="tl-body">
            <li class="tl-item" v-for="(item,index) in list.articleList" :key="index">
              <div class="tl-wrap b-info">
                <span class="tl-date" v-text="item.publishTime.substring(8,10) + '日'"></span>
                <p class="tl-content panel padder bg-info">
                  <span class="arrow arrow-info left" aria-hidden="true"></span>
                  <nuxt-link :to="'/article/'+item.id" v-text="item.title"></nuxt-link>
                </p>
              </div>
            </li>
          </div>
        </ul>
        <div class="tl-footer">
          <h3 class="tl-begin">开始</h3>
        </div>
      </div>
    </el-col>

    <!-- 随机文章卡片 -->
    <el-col :span="7" style="padding-left:5px;">
      <v-rand-card :randList="randList"></v-rand-card>
      <Affix :offset-top="80">
        <v-tag-card :tagList="tagList"></v-tag-card>
      </Affix>
    </el-col>
  </el-row>
</template>

<script>
import '~/assets/css/archives.css'
import VNotice from '~/components/notice'
import VRandCard from "~/components/rand-card"
import VTagCard from "~/components/tag-card"
import { getNotice } from '~/api/index'
import { getAll } from '~/api/tag'
import { getRandList, getArchives } from "~/api/article"
export default {
  data() {
    return {};
  },
  head() {
    return {
      title: `【${this.$store.state.siteInfo.site.siteName}】归档`,
    };
  },
  components: {
    VNotice,
    VRandCard,
    VTagCard,
  },
  async asyncData() {
    //获取全部标签
    let tagData = await getAll()
    //随机文章
    let randData = await getRandList();
    //归档
    let archivesData = await getArchives();
    //获取通知
    let noticeData = await getNotice()
    return {
      randList: randData.data,
      archivesList: archivesData.data,
      tagList: tagData.data,//全部标签
      noticeList: noticeData.data,//通知列表
    };
  },
};
</script>

<style lang="scss" scoped>

</style>