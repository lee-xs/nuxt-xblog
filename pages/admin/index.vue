<template>
    <el-row class="animated fadeInUp">
        <el-col :span="24">
            
        </el-col>

        <el-col :span="24">
            <el-table v-loading="loading" :data="logList" border stripe style="width: 100%">
                <el-table-column align="center" prop="id" label="ID" width="100"></el-table-column>
                <el-table-column align="center" prop="userId" label="用户ID" width="100"></el-table-column>
                <el-table-column align="center" prop="title" label="类别" width="150"></el-table-column>
                <el-table-column align="center" prop="content" label="详情"></el-table-column>
                <el-table-column align="center" prop="time" label="时间"></el-table-column>
            </el-table>
        </el-col>

        <!-- 分页 -->
        <el-col :span="24" style="text-align:center; margin-top:20px;">
            <Page
            :total="logListTotal"
            :current="pageCode"
            :page-size="pageSize"
            @on-change="handleCurrentChange"></Page>
        </el-col>
    </el-row>
</template>

<script>
import { page } from '~/api/log'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【${this.$store.state.siteInfo.site.siteName}】后台管理首页`,
        }
    },
    data: () => ({
        loading: false,
        pageCode: 1,
        pageSize: 10,
    }),
    async asyncData(){
        let logData = await page(1, 10)
        return {
            logList: logData.data.records,//分类列表
            logListTotal: logData.data.total,//分类总数
        }
    },
    methods: {
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            page(this.pageCode, this.pageSize).then(res => {
                this.logList = res.data.records
                this.logListTotal = res.data.total
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>