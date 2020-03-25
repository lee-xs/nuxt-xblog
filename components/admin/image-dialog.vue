<template>
    <el-row :gutter="10">
        <el-col :span="4" v-for="(img,index) in imageList" :key="index">
            <img :src="img.url" @click="handleImage(img.url)" style="width:100%; height:200px; padding: 4px; border-radius:4px; border:1px solid #ddd"/>
        </el-col>
        <el-col :span="24" style="text-align:center; margin-top:20px;">
            <Page
            :total="imageTotal"
            :current="pageCode"
            :page-size="pageSize"
            @on-change="handleCurrentChange"></Page>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['imageList', 'imageTotal', 'pageCode'],
    data(){
        return{
            pageSize: 12
        }
    },
    methods:{
        //向父组件发送更改页码请求
        handleCurrentChange(data){
            this.$emit('handleCurrentChange', data)
        },
        //向父组件发送更改图片url请求
        handleImage(url){
            this.$emit('handleImageUrl', url)
        }
    }
}
</script>

<style>

</style>