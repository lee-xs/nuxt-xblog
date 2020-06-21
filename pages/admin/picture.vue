<template>
    <el-row v-loading="loading" :gutter="20">
        <el-col :span="4" v-for="(img,index) in list" :key="index" class="animated fadeInUp">
            <img @click="setImageInfo(img)" :src="img.url" style="width:100%; height:200px; margin-bottom:15px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
        </el-col>
        <el-col :span="24" style="text-align:center; margin-top:20px;">
            <Page
            :total="total"
            :current="pageCode"
            :page-size="pageSize"
            @on-change="handleCurrentChange"></Page>
        </el-col>

        <el-dialog title="图片详情" :visible.sync="visible" width="80%" center :append-to-body="true">
            <el-row :gutter="20">
                <el-col :span="12">
                    <img :src="image.url" style="width: 100%; height: 400px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
                </el-col>
                <el-col :span="12">
                    <el-form class="form" :data="image" label-position="left" label-width="80px">
                        <el-form-item label="ID">
                            <el-input v-model="image.id" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="URL">
                            <el-input v-model="image.url" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="PATH">
                            <el-input v-model="image.path" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="存储方式">
                            <el-input v-model="image.sign" :disabled="true"></el-input>
                        </el-form-item>    
                        <el-form-item label="上传时间">
                            <el-input v-model="image.uploadTime" :disabled="true"></el-input>
                        </el-form-item>
                        <div style="margin-top:20px; float: right;">
                            <el-button @click="handleRemove()" type="danger">删除</el-button>
                            <!-- <el-button type="primary">修改</el-button> -->
                        </div> 
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 图片管理`,
        }
    },
    data: () => ({
        loading: false,
        visible: false,
        pageCode: 1,
        pageSize: 18,
        image: {
            id: '',
            url: '',
            path: '',
            sign: '',
            uploadTime: '',
        }
    }),
    async asyncData({ app }){
        let result = await app.$api.selectImagePage(1, 18)
        return{
            list: result.data.records,
            total: result.data.total,
        }
    },
    methods: {
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            this.$api.selectImagePage(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        setImageInfo(data){
            this.image = data
            this.visible = true
        },
        //删除图片
        handleRemove(){
            this.$api.deleteImage(this.image.id).then(res => {
                if(res.code == 20000){
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
                this.visible = false
                this.image.id = this.image.url = this.image.path = this.image.sign = this.image.uploadTime = ''
                this.handleCurrentChange(this.pageCode)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__content{
    margin-bottom: 20px;
}
</style>