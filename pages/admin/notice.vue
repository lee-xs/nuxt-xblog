<template>
    <el-row class="animated fadeInUp">
        <el-col :span="8" >
            <div class="slide-box" style="margin-right:5px; background-color:#fff;">
                <h3 v-text="addOrChange?'添加分类':'修改分类'"></h3>
                <el-form class="form" :data="notice" label-position="top" label-width="80px">
                    <el-form-item label="ID">
                        <el-input v-model="notice.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="notice.content"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-switch :active-value="1" :inactive-value="0" v-model="notice.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="notice.created" :disabled="true"></el-input>
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

        <el-col :span="16">
            <div class="slide-box" style="margin-left:5px; background-color:#fff;">
                <h3>分类列表</h3>
                <el-table v-loading="loading" :data="list" style="width: 100%">
                    <el-table-column align="center" prop="id" label="ID" width="60"></el-table-column>
                    <el-table-column align="center" prop="content" label="内容" ></el-table-column>
                    <el-table-column align="center" prop="" label="状态" width="60">
                        <template slot-scope="scope">
                            <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.state" @change="handleChangeState(scope.row.id, scope.row.state)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="created" label="创建时间"></el-table-column>
                    <el-table-column align="center" label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="setChangeInfo(scope.row)" plain size="mini">修改</el-button>
                            <el-button :disabled="scope.row.count > 0" @click="handleRemove(scope.row.id)" type="danger" plain size="mini" >删除</el-button>
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
            title: `【${this.$store.state.siteInfo.site.siteName}】公告管理`,
        }
    },
    data(){
        return{
            loading: false,
            pageCode: 1,
            pageSize: 10,
            addOrChange: true, //默认为添加
            notice: {
                id: '',
                content: '',
                state: 1,
                created: '',
            }
        }
    },
    async asyncData({ app }){
        let result = await app.$api.selectNoticePage(1, 10)
        return {
            list: result.data.records,//分类列表
            total: result.data.total,//分类总数
        }
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            this.$api.selectNoticePage(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        //添加
        handleAdd(){
            if(this.commonBeforeHandle()){
                this.$api.insertNotice(this.notice).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        //修改
        handleChange(){
            if(this.commonBeforeHandle()){
                this.$api.updateNotice(this.notice).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        //修改状态
        handleChangeState(id, state){
           this.$api.updateNoticeState(id, state).then(res => {
               this.commonAfterHandle(res)
           })
        },
        //删除
        handleRemove(id){
            this.$api.deleteNotice(id).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //返回至添加
        goback(){
            this.addOrChange = true
            this.notice.id = this.notice.content = this.notice.created = ''
            this.notice.state = 1
        },
        //修改分类
        setChangeInfo(row){
            this.notice = JSON.parse(JSON.stringify(row))
            this.addOrChange = false
        },
        //公共处理方法
        commonBeforeHandle(){
            if(this.notice.content == ''){
                this.$message.error('必填项不能为空')
                return false
            }
            return true
        },
        commonAfterHandle(res){
            if(res.code == 20000){
                this.$message({
                    type: 'success',
                    message: res.message
                })
                this.handleCurrentChange(1)
            }
            this.goback()
        }
    }
}
</script>

<style>

</style>