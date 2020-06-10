<template>
    <el-row class="index-container">
        <el-col :span="24" class="hidden-md-and-down">
            <v-notice :noticeList="noticeList"/>
        </el-col>

        <!-- list -->
        <el-col :span="17" :xs="24" class="left">
            <!-- 幻灯片 -->
            <v-slide :slideList="slideList"></v-slide>

            <!-- 文章list -->
            <v-article-list :list="list" :total="total" @pageCode="handleCurrentChange"></v-article-list>
        </el-col>

        <!-- crad -->
        <el-col :span="7" :xs="24" class="hidden-md-and-down right">
            <!-- 站点信息 -->
            <v-aboutme :siteInfo="siteInfo"></v-aboutme>
             <!-- 热门文章 -->
            <v-hot-card :hotList="hotList"></v-hot-card>
            <!-- 标签列表 -->
            <v-tag-card :tagList="tagList"></v-tag-card>
            <Affix :offset-top="83">
                 <!-- 站点信息 -->
                <v-site-card :siteInfo="siteInfo"></v-site-card>
            </Affix>
        </el-col>
    </el-row>
</template>

<script>
import VSlide from '~/components/home/slide'
import VArticleList from '~/components/home/article-list'
import VNotice from '~/components/home/notice'
import VAboutme from '~/components/home/aboutme.vue'
import VSiteCard from '~/components/home/site-card'
import VHotCard from '~/components/home/hot-card'
import VTagCard from '~/components/home/tag-card'
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
            title: `【${this.$store.state.siteInfo.site.siteName}】一觉醒来，诸事完美`,
        }
    },
    components:{
        VSlide,
        VNotice,
        VArticleList,
        VAboutme,
        VSiteCard,
        VHotCard,
        VTagCard,
    }, 
    async asyncData({ app, store }) {
        // let ipRes = await app.$axios({
        //     method: 'get',
        //     url: 'http://pv.sohu.com/cityjson?ie=utf-8',
        //     changeOrigin: true,
        //     withCredentials: true,
        // })
        // var ipJson = ipRes.substring(19, ipRes.length - 1)
        // let ip = JSON.parse(ipJson).cip
        // store.commit('SET_IPADDRESS', ip)
        // console.log(store.state.ipAddress)

        

        //获取文章列表
        let { data } = await app.$api.selectArticlePage(1, 10)
        //获取站点信息
        let siteInfoData = await app.$api.selectSite()
        //获取全部标签
        let tagData = await app.$api.selectTagAll()
        //获取热门文章
        let hotData = await app.$api.selectHotList()
        //获取通知
        let noticeData = await app.$api.selectNotice()
        //获取幻灯片
        let slideData = await app.$api.selectSlideAll()
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
            this.$api.selectArticlePage(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
                document.documentElement.scrollTop = 0
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


