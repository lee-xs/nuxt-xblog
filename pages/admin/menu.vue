<template>
    <el-row class="animated fadeInUp">
        <el-col :span="8">
            <div class="slide-box" style="margin-right:5px; background-color:#fff;">
                <h3 v-text="addOrChange?'添加分类':'修改分类'"></h3>
                <el-form class="form" :data="menu" label-position="top" label-width="80px">
                    <el-form-item label="ID">
                        <el-input v-model="menu.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="索引值">
                        <el-input v-model="menu.indexes"></el-input>
                    </el-form-item>
                    <el-form-item label="外部URL">
                        <el-input v-model="menu.url"></el-input>
                    </el-form-item>
                    <el-form-item label="导航名">
                        <el-input v-model="menu.title"></el-input>
                    </el-form-item>      
                    <el-form-item label="状态">
                        <el-select style="width:100%;" v-model="menu.status">
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

        <el-col :span="16">
            <div class="slide-box" style="margin-left:5px; background-color:#fff;">
                <h3>分类列表</h3>
                <el-table v-loading="loading" :data="list" style="width: 100%">
                    <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="indexes" label="索引值" align="center"></el-table-column>
                    <el-table-column prop="url" label="外部URL" align="center"></el-table-column>
                    <el-table-column prop="title" label="导航名" align="center"></el-table-column>
                    <el-table-column prop="sort" label="排序" align="center" width="95">
                        <template slot-scope="scope">
                            <el-button type="primary" plain circle size="mini" @click="handleSortUp(scope.row)"><i class="el-icon-arrow-up"></i></el-button>
                            <el-button type="danger" plain circle size="mini" @click="handleSortNext(scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch :active-value="'1'" :inactive-value="'0'" v-model="scope.row.status" @change="handleStatus(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180px" align="center">
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
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 菜单管理`,
        }
    },
    data(){
        return{
            loading: false,
            pageCode: 1,
            pageSize: 10,
            addOrChange: true, //默认为添加
            menu:{
                id: '',
                indexes:'',
                url: '',
                title: '',
                sort: '',
                status: '1',
            },
        }
    },
    async asyncData({ app }){
        let result = await app.$api.selectMenuPage(1, 10)
        return {
            list: result.data.records,//分类列表
            total: result.data.total,//分类总数
        }
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            this.$api.selectMenuPage(this.pageCode, this.pageSize).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
        handleAdd(){
            if(this.commonBeforeHandle()){
                this.$api.insertMenu(this.menu).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        handleChange(){
            if(this.commonBeforeHandle()){
                this.$api.updateMenu(this.menu).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        //返回至添加
        goback(){
            this.addOrChange = true
            this.menu.indexes = this.menu.url = this.menu.title = this.menu.sort = this.menu.id = ''
            this.menu.status = '1'
        },
        //修改分类
        setChangeInfo(row){
            this.menu = JSON.parse(JSON.stringify(row))
            this.addOrChange = false
        },
        //修改状态
        handleStatus(row){
            this.$api.updateMenu(row).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //删除分类
        handleRemove(id){
            let ids = []
            ids.push(id)
            this.$api.deleteMenu(ids).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //处理排序上升
        handleSortUp(data){
            this.$api.updateMenuSortUp(data.id, data.sort).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //处理排序下降
        handleSortNext(data){
            this.$api.updateMenuSortNext(data.id, data.sort).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //公共处理方法
        commonBeforeHandle(){
            if((this.menu.indexes == '' && this.menu.url == '') ||
                this.menu.title == '' ||
                this.menu.weight == ''){
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