<template>
    <el-tabs v-model="activeName">
        <el-tab-pane v-loading="loading" label="已发布" name="first" style="text-align:center;">
            <v-list-tab key="first" :list="articleList" :total="articleListTotal" @pageCode="handleCurrentChange"></v-list-tab>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="second">
            <v-list-tab key="second" :list="draftsList" :total="draftsListTotal" @pageCode="handleCurrentChange"></v-list-tab>
        </el-tab-pane>
        <el-tab-pane label="回收站" name="third">
            <v-list-tab key="third" :list="recycleList" :total="recycleListTotal" @pageCode="handleCurrentChange"></v-list-tab>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import VListTab from '~/components/admin/list-tab'
import { getPageArticle, getDrafts, getRecycle } from '~/api/article'
export default {
    layout: 'admin_template',
    data(){
        return{
            loading: false,
            activeName: 'first',
            value: 0,
            pageCode: 1,
            pageSize: 10,
        }
    },
    head(){
        return{
            title: `【XIN-BLOG】文章列表`,
        }
    },
    components:{
        VListTab
    },
    async asyncData(){
        let articleListData = await getPageArticle(1,10)
        let draftsListData = await getDrafts(1, 10)
        let recycleListData = await getRecycle(1, 10)
        return {
            //已发布的
            articleList: articleListData.data.records,
            articleListTotal: articleListData.data.total,
            //草稿箱内
            draftsList: draftsListData.data.records,
            draftsListTotal: draftsListData.data.total,
            //回收站内
            recycleList: recycleListData.data.records,
            recycleListTotal: recycleListData.data.total,
        }
    },
    methods: {
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            switch(this.activeName){
                case 'first':
                    //默认分页
                    getPageArticle(this.pageCode, this.pageSize).then(res => {
                        this.articleList = res.data.records
                        this.articleListTotal = res.data.total
                        this.loading = false
                    })
                break;
                case 'second':
                    //草稿箱分页
                    getDrafts(this.pageCode, this.pageSize).then(res => {
                        this.draftsList = res.data.records
                        this.draftsListTotal = res.data.total
                        this.loading = false
                    })
                break;
                case 'third':
                    //回收站分页
                    getDrafts(this.pageCode, this.pageSize).then(res => {
                        this.recycleList = res.data.records
                        this.recycleListTotal = res.data.total
                        this.loading = false
                    })
                break;
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>