<template>
    <el-row v-loading="loading" :gutter="20">
        <el-col  :span="4" v-for="(img,index) in list" :key="index">
            <img :src="img.url" style="width:100%; height:200px; margin-bottom:15px; padding: 4px; border-radius:4px; border:1px solid #ddd"/>
        </el-col>
        <el-col :span="24" style="text-align:center; margin-top:20px;">
            <Page
            :total="total"
            :current="pageCode"
            :page-size="pageSize"
            @on-change="handleCurrentChange"></Page>
        </el-col>
    </el-row>
</template>

<script>
import { getImagePage } from '~/api/image'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【XIN-BLOG】图片管理`,
        }
    },
    data: () => ({
        loading: false,
        pageCode: 1,
        pageSize: 18,
    }),
    async asyncData(){
        let result = await getImagePage(1, 18)
        return{
            list: result.data.records,
            total: result.data.total,
        }
    },
    methods: {
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            getImagePage(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>