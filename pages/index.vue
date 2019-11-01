<template>
    <el-row class="index-container">
        <el-col :span="24" class="hidden-md-and-down">
            <v-notice :noticeList="noticeList"/>
        </el-col>

        <!-- list -->
        <el-col :span="17" :xs="24" class="left">
            <!-- 幻灯片 -->
            <v-slide v-if="pageCode == 1" :slideList="slideList"></v-slide>

            <!-- 文章list -->
            <v-article-list :list="list" :total="total" @pageCode="handleCurrentChange"></v-article-list>
        </el-col>

        <!-- crad -->
        <el-col :span="7" :xs="24" class="hidden-md-and-down right">
             <!-- 站点信息 -->
            <v-site-card :siteInfo="siteInfo"></v-site-card>
             <!-- 热门文章 -->
            <v-hot-card :hotList="hotList"></v-hot-card>
            <Affix :offset-top="80">
                <!-- 标签列表 -->
                <v-tag-card :tagList="tagList"></v-tag-card>
            </Affix>
        </el-col>
    </el-row>
</template>

<script>
import VSlide from '~/components/home/slide'
import VArticleList from '~/components/home/article-list'
import VNotice from '~/components/notice'
import VSiteCard from '~/components/site-card'
import VHotCard from '~/components/hot-card'
import VTagCard from '~/components/tag-card'
import { getPageArticle, getHotList } from '~/api/article'
import { getNotice } from '~/api/index'
import { getSlideAll } from '~/api/slide'
import { getSite } from '~/api/site'
import { getAll } from '~/api/tag'
export default {
    data(){
        return{
            pageCode: 1,
            pageSize: 10,
            loading: false,
        }
    },
    head(){
        return{
        title: '【XIN-BLOG】首页',
        }
    },
    components:{
        VSlide,
        VNotice,
        VArticleList,
        VSiteCard,
        VHotCard,
        VTagCard,
    },
    async asyncData() {
        //获取文章列表
        let { data } = await getPageArticle(1, 10)
        //获取站点信息
        let siteInfoData = await getSite()
        //获取全部标签
        let tagData = await getAll()
        //获取热门文章
        let hotData = await getHotList()
        //获取通知
        let noticeData = await getNotice()
        //获取幻灯片
        let slideData = await getSlideAll()
        return {
            list: data.records,//文章list
            total: data.total,//文章总数
            siteInfo: siteInfoData.data,//站点信息
            tagList: tagData.data,//全部标签
            hotList: hotData.data,//热门文章list
            noticeList: noticeData.data,//通知列表
            slideList: slideData.data,//幻灯片列表
        }       
    },
    methods: {
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            //默认分页
            getPageArticle(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
    },
}  
</script>

<style lang="scss" scoped>
.index-container{
    margin: 0 auto;
    overflow: hidden;  
    .right{
        padding-left: 5px;
    }
}
@media (max-width:768px) {
    .index-container{
        width: 100%;
    }
}
@media (min-width:1200px) {
    .index-container{
        width: 1010px;
        padding:0 10px;
        .left{
            padding-right: 5px;
        }
    }
}
</style>


