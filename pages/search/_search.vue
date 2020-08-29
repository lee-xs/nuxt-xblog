<template>
    <el-row class="index-container">
        <el-col :span="24" class="hidden-md-and-down">
            <v-notice :noticeList="noticeList"/>
        </el-col>

        <!-- list -->
        <el-col :span="17" :xs="24" id="left">
            <v-article-list :list="list" :total="total" @pageCode="handleCurrentChange"></v-article-list>
        </el-col>

       
        <el-col :span="7" :xs="24" class="hidden-md-and-down" id="right">
            <!-- 搜索 -->
            <v-search-input @search="handleSearch"></v-search-input>
            <!-- 随机文章卡片 -->
            <v-rand-card :randList="randList"></v-rand-card>
            <!-- 标签卡片 -->
            <Affix :offset-top="15">
                <v-tag-card :tagList="tagList"></v-tag-card>
            </Affix>
        </el-col>
    </el-row>
</template>

<script>
import VArticleList from '~/components/home/article-list'
import VNotice from '~/components/home/notice'
import VSearchInput from "~/components/home/search-input"
import VRandCard from "~/components/home/rand-card"
import VTagCard from "~/components/home/tag-card"
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
        VRandCard,
        VTagCard,
    },
    async asyncData({params, app}) {
        //搜索
        let { data } = await app.$api.selectSearch(1, 10, params.search);
        //获取全部标签
        let tagData = await app.$api.selectTagAll()
        //随机文章
        let randData = await app.$api.selectRandList();
        //获取通知
        let noticeData = await app.$api.selectNotice()
        return {
            title: '搜索：' + params.search,
            list: data.records,//文章list
            total: data.total,//文章总数
            randList: randData.data,//随机文章
            noticeList: noticeData.data,//通知列表
            tagList: tagData.data,//全部标签
        }       
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            //根据标签分页
            this.$api.selectSearch(this.pageCode, this.pageSize, this.search).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        handleSearch(data){
            this.$router.push(`/search/${data}`)
        }
    },
    created(){
        this.$store.state.header.style.top = '0px';
    }
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


