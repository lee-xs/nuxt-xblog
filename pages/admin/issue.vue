<template>
    <el-row :gutter="10">
        <el-col :span="18">
            <el-input v-model="article.title" placeholder="请输入文章标题" style="margin-bottom:10px;"></el-input>

            <Affix :offset-top="60">
                <v-markdown style="width:100%;" @editorContent="handleEditorContent"></v-markdown>
            </Affix>
        </el-col>
        <el-col :span="6">
            <el-row>
                <!-- 发布 -->
                <el-col :span="24" class="box-card">
                    <div class="clearfix">
                        <span><b>发布</b></span>
                        <el-button style="float: right; padding: 6px 0" type="text" @click="issueShow=!issueShow"><i :class="issueShow?'fa fa-minus':'fa fa-plus'"></i></el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="issueShow" class="details">
                            <div>
                                <span><b>发布作者：</b></span>
                                <el-input type="text" v-model="article.author"  style="width:200px;" placeholder="添加作者名称"/>
                            </div>
                            <div style="margin-top:15px;">
                                <span><b>文章类型：</b></span>
                                <el-select style="width:200px;" v-model="article.source">
                                    <el-option label="原创" value="1"></el-option>
                                    <el-option label="转载" value="2"></el-option>
                                    <el-option label="翻译" value="3"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:15px;">
                                <span><b>开启评论：</b></span>
                                <el-select style="width:200px;" v-model="article.allowComment">
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="0"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:15px;">
                                <el-button style="width:46%;" @click="handleAddArticle(0)">保存草稿</el-button>
                                <el-button style="width:46%;" type="primary" @click="handleAddArticle(1)">发布</el-button>
                            </div>
                        </div>
                    </el-collapse-transition>
                </el-col>

                <!-- 分类/标签 -->
                <el-col :span="24" class="box-card">
                    <div class="clearfix">
                        <span><b>分类/标签</b></span>
                        <el-button style="float: right; padding: 6px 0" type="text" @click="categoryTagShow=!categoryTagShow"><i :class="categoryTagShow?'fa fa-minus':'fa fa-plus'"></i></el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="categoryTagShow" class="details">
                            <div>
                                <span><b>分类：</b></span>
                                <el-select style="width:200px;" v-model="article.category" placeholder="请选择">
                                    <el-option v-for="(item,index) in categoryList" :key="index" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:15px;">
                                <span><b>标签：</b></span>
                                <el-input type="text" v-model="inputTag" @keyup.enter.native="handleAdd()" @blur="handleAdd()" style="width:200px;" placeholder="添加标签"/>
                                <div style="width:100%; margin:10px 0;">
                                    <el-tag :key="item" v-for="item in article.tag" closable :disable-transitions="false" @close="handleClose(item)" style="margin:3px;">
                                        <span v-text="item"></span>
                                    </el-tag>
                                </div>
                                <el-select style="width:250px;" v-model="selectTag" placeholder="选择添加"  @change="handleChange()">
                                    <el-option v-for="(item,index) in tagList" :key="index" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                                
                            </div>
                        </div>
                    </el-collapse-transition>
                </el-col>

                <!-- 封面图 -->
                <el-col :span="24" class="box-card">
                    <div class="clearfix">
                        <span><b>封面图</b></span>
                        <el-button style="float: right; padding: 6px 0" type="text" @click="coverTagShow=!coverTagShow"><i :class="categoryTagShow?'fa fa-minus':'fa fa-plus'"></i></el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="coverTagShow" class="details">
                            <img :src="cover || 'http://aleestar.test.upcdn.net/thumbnail.png'" @click="dialogImage = true" style="width:100%; padding: 4px; border-radius:4px; border:1px solid #ddd"/>
                        </div>
                    </el-collapse-transition>
                </el-col>

            </el-row>
        </el-col>
        
        <!-- 添加封面弹窗 -->
        <!-- 图片列表 -->
        <el-dialog title="添加封面图" :visible.sync="dialogImage" :fullscreen="true" :append-to-body='true' width="80%">
            <v-image-dialog @handleCurrentChange="handleCurrentChange" @handleImageUrl="handleImageUrl" :imageTotal="imageTotal" :imageList="imageList" :pageCode="pageCode"></v-image-dialog>
        </el-dialog>
    </el-row>
</template>

<script>
import VMarkdown from '~/components/admin/markdown'
import VImageDialog from '~/components/admin/image-dialog'
import { save, createAnchor } from '~/api/article'
import { getAll as getCategoryAll } from '~/api/category'
import { getAll as getTagAll } from '~/api/tag'
import { getImagePage } from '~/api/image'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【XIN-BLOG】发布文章`,
        }
    },
    async asyncData(){
        let categoryData = await getCategoryAll()
        let tagData = await getTagAll()
        let imageData = await getImagePage(1,12)
        return {
            categoryList: categoryData.data,//全部分类
            tagList: tagData.data,//全部标签
            imageList: imageData.data.records,//分页图片集合
            imageTotal: imageData.data.total,//图片总数
        }
    },
    data(){
        return{
            article:{
                title: '',//文章标题
                author: '',//作者
                cover: '',//封面图片
                content: '',//内容-Markdown  html格式
                url: '',//文章路径
                state: '',//状态 0 回收站 1 已发布 2 草稿箱
                source: '1',//文章来源 原创1 转载2 翻译3
                allowComment: '1',//是否允许评论（允许1，禁止0）
                category: '',//文章所属分类
                tag: [],//文章所属标签
            },
            issueShow: true,
            categoryTagShow:true,
            coverTagShow: true,
            dynamicTags: [],
            selectTag: '',
            inputTag: '',
            cover: '',
            dialogImage: false,//image列表对话框
            activeName: 'first',//卡片tags
            pageCode: 1,
            pageSize: 12,
        }
    },
    components:{
        VMarkdown,
        VImageDialog,
    },
    methods: {
        //发送文章发布请求
        handleAddArticle(state){
            this.article.state = state    
            if(this.article.title == '' ||
            this.article.content == '' ||
            this.article.author == '' ||
            this.article.cover == '' ||
            this.article.category == '' ||
            this.article.tag == ''){
                this.$message.error('必填项不能为空')
                return
            }
            //给内容添加锚点
            this.article.content = createAnchor(this.article.content)
            save(this.article).then(res => {
                if(res.code == 20000){
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
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
         * markdown子组件向父组件传入文章内容
         */
        handleEditorContent(data){
            this.article.content = data
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
            this.cover = data
            this.article.cover = data
            this.dialogImage = false
        },
        /**
         * 标签添加相关
         */
        handleClose(item){
            this.article.tag.splice(this.article.tag.indexOf(item), 1);
        },
        handleAdd(){
            if(this.inputTag != ''){
                this.commonHandle(this.inputTag)
            }
            this.inputTag = ''
        },
        handleChange(){
            if(this.selectTag != ''){
                this.commonHandle(this.selectTag)
            }
        },
        commonHandle(tag){
            let bool = true
            this.article.tag.forEach(element => {
                if(element == tag){
                    bool = false
                    return
                }
            });
            if(bool) this.article.tag.push(tag)
        }
    },
}
</script>

<style lang="scss" scoped>
.box-card{
    box-shadow: 0 0px 3px rgba(26, 26, 26, 0.3);
    margin-bottom:15px;
    .clearfix{
        padding: 10px 15px;
        font-size: 18px;
        border-bottom: 1px solid #cccccc;
    }
    .details{
        padding: 15px;
        font-size: 16px;
        text-align: center;
    }
}
</style>