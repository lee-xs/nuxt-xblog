<template>
    <el-row class="animated fadeInUp">
        <el-col :span="6" >
            <div class="slide-box" style="margin-right:5px; background-color:#fff;">
                <h3 v-text="addOrChange?'添加幻灯片':'修改幻灯片'"></h3>
                <el-form class="form" :data="slide" label-position="top" label-width="80px">
                    <el-form-item label="ID">
                        <el-input v-model="slide.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="slide.title"></el-input>
                    </el-form-item>
                    <el-form-item label="外部链接">
                        <el-input v-model="slide.url"></el-input>
                    </el-form-item>
                    <el-form-item label="文章ID">
                        <el-input v-model="slide.articleId"></el-input>
                    </el-form-item>
                    <el-form-item label="图片链接">
                        <el-input v-model="slide.cover" style="width:78%;"></el-input>
                        <el-button type="primary" plain @click="dialogImage = true" style="width:20%;"><i class="el-icon-picture"></i></el-button>
                    </el-form-item>
                    <div style="margin-top:20px;">
                        <el-button v-if="addOrChange" type="primary" plain style="width:100%" @click="handleAddSlide()">添加</el-button>
                        <div v-else>
                            <el-button type="primary" @click="handleChangeSlide()" plain>修改</el-button>
                            <el-button type="primary" @click="goback()" plain>返回添加</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </el-col>
        <el-col :span="18">
            <div class="slide-box" style="margin-left:5px; background-color:#fff;">
                <h3>首页幻灯片</h3>
                <el-table :data="slideList" style="width: 100%">
                    <el-table-column align="center" prop="id" label="ID" width="50"></el-table-column>
                    <el-table-column align="center" prop="title" label="标题"></el-table-column>
                    <el-table-column align="center" prop="" label="背景" width="80">
                        <template slot-scope="scope">
                            <img style="width:60px; height:50px;" :src="scope.row.cover" />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="url" label="外部链接"></el-table-column>
                    <el-table-column align="center" prop="articleId" label="文章ID" width="65"></el-table-column>
                    <el-table-column align="center" label="排序" width="95">
                        <template slot-scope="scope">
                            <el-button type="primary" plain circle size="mini" @click="handleSortUp(scope.row)"><i class="el-icon-arrow-up"></i></el-button>
                            <el-button type="danger" plain circle size="mini" @click="handleSortNext(scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" @click="setSlideInfo(scope.row)">修改</el-button>
                            <el-button type="danger" plain size="mini" @click="handleDelSlide(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>


        <!-- 图片列表 -->
        <el-dialog style="width: 80%; height: 80%; margin: auto;" title="添加封面图" :visible.sync="dialogImage" :fullscreen="true" :append-to-body='true' width="80%">
            <v-image-dialog @handleCurrentChange="handleCurrentChange" @handleImageUrl="handleImageUrl" :imageTotal="imageTotal" :imageList="imageList" :pageCode="pageCode"></v-image-dialog>
        </el-dialog>
    </el-row>
</template>

<script>
import VImageDialog from '~/components/admin/image-dialog'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 幻灯片管理`,
        }
    },
    async asyncData({ app }){
        let imageData = await app.$api.selectImagePage(1,12)
        let slideData = await app.$api.selectSlideAll()
        return {
            imageList: imageData.data.records,//分页图片集合
            imageTotal: imageData.data.total,//图片总数
            slideList: slideData.data
        }
    },
    data(){
        return{
            dialogImage: false,
            pageCode: 1,
            pageSize: 12,
            addOrChange: true, //默认为添加幻灯片
            slide:{
                id: '',
                title: '',
                url: '',
                articleId: '',
                cover: '',
            },
        }
    },
    methods:{
        //发送获取幻灯片列表请求
        handleSlideList(){
            this.$api.selectSlideAll().then(res => {
                this.slideList = res.data
            })
        },
        //发送获取图片列表请求
        handleImageList(){
            this.$api.selectImagePage(this.pageCode, this.pageSize).then(res => {
                this.imageList = res.data.records
                this.imageTotal= res.data.total
            })
        },
        /**
         * 处理图片相关
         */
        //接收子组件传来的更改的页码
        handleCurrentChange(data){
            this.pageCode = data
            this.handleImageList()
        },
        //接收子组件传来的imageUrl 修改图片路径
        handleImageUrl(data){
            this.slide.cover = data
            this.dialogImage = false
        },
        /**
         * 处理修改幻灯片
         * 将选中的幻灯片信息添加至修改框内
         */
        setSlideInfo(row){
            this.slide = JSON.parse(JSON.stringify(row))
            this.addOrChange = false
        },
        /**
         * 向后台发送修改幻灯片请求
         */
        handleChangeSlide(){
            if(this.commonBeforeHandle()){
                this.$api.updateSlide(this.slide).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        /**
         * 向后台发送添加幻灯片请求
         */
        handleAddSlide(){
            if(this.commonBeforeHandle()){
                this.$api.insertSlide(this.slide).then(res => {
                    this.commonAfterHandle(res)
                })
            }        
        },
        /**
         * 处理删除幻灯片 向后台发送删除请求
         */
        handleDelSlide(row){
            this.$api.deleteSlide(row.id).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //返回至添加幻灯片
        goback(){
            this.addOrChange = true
            this.slide.id = this.slide.title = this.slide.url = this.slide.articleId = this.slide.cover = ''
        },
        //处理排序上升
        handleSortUp(data){
            this.$api.updateSlideSortUp(data.id, data.sort).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //处理排序下降
        handleSortNext(data){
            this.$api.updateSlideSortNext(data.id, data.sort).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //公共前置处理方法
        commonBeforeHandle(){
            if((this.slide.url == '' && this.slide.articleId == '') || 
                this.slide.title == '' ||
                this.slide.cover == ''){
                    this.$message.error("参数不能留空")
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
                this.handleSlideList()
            }
            this.goback()
        }
    },
    components:{
        VImageDialog
    }
}
</script>

<style lang="scss">
.slide-box{
    box-shadow: 0 0px 3px rgba(26, 26, 26, 0.3);
    >h3{
        border-bottom: 1px solid #cccccc;
        padding: 15px;
    }
    form{
        padding: 15px;
    }
}

//修改elementUI-Form高度
.el-form-item{
    margin: 0  !important;
}
</style>