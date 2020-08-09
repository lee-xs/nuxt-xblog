<template>
    <el-row class="animated fadeInUp">
        <el-col :span="6" >
            <div class="slide-box" style="margin-right:5px; background-color:#fff;">
                <h3 v-text="addOrChange?'添加分类':'修改分类'"></h3>
                <el-form class="form" :data="links" label-position="top" label-width="80px">
                    <el-form-item label="ID">
                        <el-input v-model="links.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="友链名称">
                        <el-input v-model="links.name"></el-input>
                    </el-form-item>
                    <el-form-item label="网站URL">
                        <el-input v-model="links.url"></el-input>
                    </el-form-item>    
                    <el-form-item label="网站LOGO">
                        <el-input v-model="links.logo"></el-input>
                    </el-form-item>    
                    <el-form-item label="联系邮箱">
                        <el-input v-model="links.email"></el-input>
                    </el-form-item>   
                    <el-form-item label="状态">
                        <el-select style="width:100%;" v-model="links.state">
                            <el-option label="展示" :value="1"></el-option>
                            <el-option label="隐藏" :value="0"></el-option>
                        </el-select>
                    </el-form-item>    
                    <div style="margin-top:20px;">
                        <el-button v-if="addOrChange" type="primary" plain style="width:100%" @click="handleAdd()">添加</el-button>
                        <div v-else>
                            <el-button type="primary" @click="handleChange()" plain>修改</el-button>
                            <el-button type="primary" @click="goback()" plain>返回添加</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </el-col>

        <el-col :span="18">
            <div class="slide-box" style="margin-left:5px; background-color:#fff;">
                <h3>分类列表</h3>
                <el-table v-loading="loading" :data="list" style="width: 100%">
                    <el-table-column align="center" prop="id" label="ID" width="50"></el-table-column>
                    <el-table-column align="center" prop="name" label="友链名称" width="100"></el-table-column>
                    <el-table-column align="center" prop="url" label="网站URL"></el-table-column>
                    <el-table-column align="center" prop="" label="网站LOGO" width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.logo" style="width: 50px; height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="email" label="联系邮箱"></el-table-column>
                    <el-table-column align="center" prop="" label="状态" width="60">
                        <template slot-scope="scope">
                            <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.state" @change="changeCommentState(scope.row.id, scope.row.state)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="排序" width="95">
                        <template slot-scope="scope">
                            <el-button type="primary" plain circle size="mini" @click="handleSortUp(scope.row)"><i class="el-icon-arrow-up"></i></el-button>
                            <el-button type="danger" plain circle size="mini" @click="handleSortNext(scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="setChangeInfo(scope.row)" plain size="mini">修改</el-button>
                            <el-button type="danger" @click="handleRemove(scope.row.id)" plain size="mini" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-col :span="24" style="text-align:center; margin-top:20px;">
                    <Page
                    :total="total"
                    :current="pageCode"
                    :page-size="pageSize"
                    @on-change="handleCurrentChange"></Page>
                </el-col>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 友情链接管理`,
        }
    },
    data(){
        return{
            loading: false,
            pageCode: 1,
            pageSize: 10,
            addOrChange: true, //默认为添加
            links:{
                id: '',
                name:'',
                url: '',
                logo: '',
                email: '',
                state: 1,
            },
        }
    },
    async asyncData({ app }){
        let result = await app.$api.selectLinksPage(1, 10)
        return {
            list: result.data.records,//分类列表
            total: result.data.total,//分类总数
        }
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            this.$api.selectLinksPage(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        //发送添加请求
        handleAdd(){
            if(this.commonBeforeHandle()){
                this.$api.insertAddLinks(this.links).then(res => {
                    this.commonAfterHandle(res)
                })
            }            
        },
        //发送删除请求
        handleChange(){
            if(this.commonBeforeHandle()){
                this.$api.updateLinks(this.links).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        //返回至添加
        goback(){
            this.addOrChange = true
            this.links.name = this.links.url = this.links.logo = this.links.email = this.links.id = ''
            this.links.state = 1
        },
        //填充修改信息
        setChangeInfo(row){
            this.links = JSON.parse(JSON.stringify(row))
            this.addOrChange = false
        },
        //删除
        handleRemove(id){
            let ids = []
            ids.push(id)
            this.$api.deleteLinks(ids).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //修改状态
        changeCommentState(id, state){
            this.$api.updateLinksState(id, state).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //处理排序上升
        handleSortUp(data){
            this.$api.updateLinksSortUp(data.id, data.sort).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //处理排序下降
        handleSortNext(data){
            this.$api.updateLinksSortNext(data.id, data.sort).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //公共前置处理方法
        commonBeforeHandle(){
            if(this.links.name == '' ||
                this.links.url == '' ||
                this.links.logo == '' ||
                this.links.state == null){
                    this.$message.error('必填项不能为空')
                return false
            }
            return true
        },
        //公共后置处理方法
        commonAfterHandle(res){
            if(res.code == 20000){
                this.$message({
                    type: 'success',
                    message: res.message
                })
                this.handleCurrentChange(this.pageCode)
            }
            this.goback()
        }
    }
}
</script>

<style>

</style>