<template>
    <el-row>
        <el-col :span="8" >
            <div class="slide-box" style="margin-right:5px; background-color:#fff;">
                <h3 v-text="addOrChange?'添加分类':'修改分类'"></h3>
                <el-form class="form" :data="category" label-position="top" label-width="80px">
                    <el-form-item label="ID">
                        <el-input v-model="category.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称">
                        <el-input v-model="category.name"></el-input>
                    </el-form-item>
                    <el-form-item label="文章数">
                        <el-input v-model="category.count" :disabled="true"></el-input>
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
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="分类名称" ></el-table-column>
                    <el-table-column prop="count" label="文章数"></el-table-column>
                    <el-table-column label="操作" width="180px">
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
import { save, page, remove, change } from '~/api/category'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【${this.$store.state.siteInfo.site.siteName}】分类管理`,
        }
    },
    data(){
        return{
            loading: false,
            pageCode: 1,
            pageSize: 10,
            addOrChange: true, //默认为添加
            category:{
                id: '',
                name:'',
                count: '',
            },
        }
    },
    async asyncData(){
        let result = await page(1, 10)
        return {
            list: result.data.records,//分类列表
            total: result.data.total,//分类总数
        }
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            page(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        handleAdd(){
            if(this.commonBeforeHandle()){
                save(this.category.name).then(res => {
                    this.commonAfterHanlde(res)
                })
            }
        },
        handleChange(){
            if(this.commonBeforeHandle()){
                change(this.category).then(res => {
                    this.commonAfterHanlde(res)
                })
            }
        },
        //返回至添加
        goback(){
            this.addOrChange = true
            this.category.name = this.category.count = this.category.id = ''
        },
        //修改分类
        setChangeInfo(row){
            this.category = JSON.parse(JSON.stringify(row))
            this.addOrChange = false
        },
        //删除分类
        handleRemove(id){
            let ids = []
            ids.push(id)
            remove(ids).then(res => {
                this.commonAfterHanlde(res)
            })
        },
        //公共处理方法
        commonBeforeHandle(){
            if(this.category.name == ''){
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