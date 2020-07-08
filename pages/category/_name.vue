<template>
    <el-row class="index-container">
        <el-col :span="24" class="hidden-md-and-down">
            <v-notice :noticeList="noticeList"/>
        </el-col>

        <!-- list -->
        <el-col :span="17" :xs="24" id="left">
            <v-article-list :list="list" :total="total" @pageCode="handleCurrentChange"></v-article-list>
        </el-col>

        <!-- crad -->
        <el-col :span="7" :xs="24" class="hidden-md-and-down" id="right">
            <!-- 搜索 -->
            <v-search-input @search="handleSearch"></v-search-input>
            <!-- 随机文章 -->
            <v-rand-card :randList="randList"></v-rand-card>
            <!-- 全部分类 -->
            <v-category-card :categoryList="categoryList"></v-category-card>
            <Affix :offset-top="80">
                <!-- 热门文章 -->
                <v-hot-card :hotList="hotList"></v-hot-card>
            </Affix>
        </el-col>
    </el-row>
</template>

<script>
import VArticleList from '~/components/home/article-list'
import VNotice from '~/components/home/notice'
import VSearchInput from "~/components/home/search-input"
import VCategoryCard from '~/components/home/category-card'
import VHotCard from '~/components/home/hot-card'
import VRandCard from '~/components/home/rand-card'
export default {
    data(){
        return{
            pageCode: 1,
            pageSize: 10,
            loading: false,
            title: '',
        }
    },
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ ${this.title}`,
        }
    },
    components:{
        VNotice,
        VArticleList,
        VSearchInput,
        VCategoryCard,
        VHotCard,
        VRandCard,
    },
    async asyncData({params, app}) {
        //获取文章列表
        let { data } = await app.$api.selectArticlePageByCategory(1, 10, params.name)
        //获取全部分类
        let categoryData = await app.$api.selectCategoryAll()
        //获取热门文章
        let hotData = await app.$api.selectHotList()
        //随机文章
        let randData = await app.$api.selectRandList()
        //获取通知
        let noticeData = await app.$api.selectNotice()
        return {
            title: '分类：' + params.name,
            name: params.name,//标签Id
            list: data.records,//文章list
            total: data.total,//文章总数
            categoryList: categoryData.data,//全部标签
            hotList: hotData.data,//热门文章list
            randList: randData.data,//随机文章
            noticeList: noticeData.data,//通知列表
        }       
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            //根据标签分页
            this.$api.selectArticlePageByCategory(this.pageCode, this.pageSize, this.name).then(res => {
               this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        handleSearch(data){
            this.$router.push(`/search/${data}`)
        }
    },
}  
</script>

<style lang="scss" scoped>
.index-container{
    margin: 0 auto 10px;
    overflow: hidden;
}
@media (max-width:768px) {
    .index-container{
        width: 100%;
        
    }
}
@media (min-width:1200px) {
    .index-container{
        width: 1020px;
        #left{
            padding-right: 7px;
        }
        #right{
            padding-left: 7px;
        }
    }
}
</style>


