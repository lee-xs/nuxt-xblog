<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="已发布" name="first">

        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="second">
            
        </el-tab-pane>
        <el-tab-pane label="回收站" name="third">
            
        </el-tab-pane>
    </el-tabs>
</template>

<script>
//import {} from '~/api/article'
export default {
    layout: 'admin_template',
    data(){
        return{
            activeName: 'second'
        }
    },
    async asycnData(){
        //let publishArticleData = await getArticle()
        return {

        }
    },
}
</script>

<style lang="scss" scoped>

</style>