<template>
    <el-row>
        <el-col :span="8" >
            <div class="slide-box" style="margin-right:5px; background-color:#fff;">
                <h3 v-text="addOrChange?'添加幻灯片':'修改幻灯片'"></h3>
                <el-form class="form" :data="slide" label-position="top" label-width="80px">
                    <el-form-item label="ID">
                        <el-input v-model="slide.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="slide.title"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址">
                        <el-input v-model="slide.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片链接">
                        <el-input v-model="slide.cover" style="width:80%;"></el-input>
                        <el-button type="primary" plain @click="dialogImage = true" style="width:18%;">选择</el-button>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="slide.sort"></el-input>
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
        <el-col :span="16">
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
                    <el-table-column align="center" prop="sort" label="排序" width="80px"></el-table-column>
                    <el-table-column align="center" label="操作" width="180px">
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
import { getImagePage } from '~/api/image'
import { getSlideAll, delSlide, updateSlide, save } from '~/api/slide'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【${this.$store.state.siteInfo.site.siteName}】幻灯片管理`,
        }
    },
    async asyncData(){
        let imageData = await getImagePage(1,12)
        let slideData = await getSlideAll()
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
                title:'',
                url: '',
                cover: '',
                sort: '',
            },
        }
    },
    methods:{
        //发送获取幻灯片列表请求
        handleSlideList(){
            getSlideAll().then(res => {
                this.slideList = res.data
            })
        },
        //发送获取图片列表请求
        handleImageList(){
            getImagePage(this.pageCode, this.pageSize).then(res => {
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
                updateSlide(this.slide).then(res => {
                    this.commonAfterHandle(res)
                })
            }
        },
        /**
         * 向后台发送添加幻灯片请求
         */
        handleAddSlide(){
            if(this.commonBeforeHandle()){
                save(this.slide).then(res => {
                    this.commonAfterHandle(res)
                })
            }        
        },
        /**
         * 处理删除幻灯片 向后台发送删除请求
         */
        handleDelSlide(row){
            delSlide(row.id).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //返回至添加幻灯片
        goback(){
            this.addOrChange = true
            this.slide.title = this.slide.url = this.slide.cover = this.slide.sort = this.slide.id = ''
        },
        //公共处理方法
        commonBeforeHandle(){
            if(this.slide.title == '' ||
                this.slide.url == '' ||
                this.slide.cover == '' ||
                this.slide.sort == ''){
                    this.$message.error("参数不能留空")
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