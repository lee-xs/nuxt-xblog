<template>
    <el-row :gutter="10" class="animated fadeInUp">
        <el-col :span="18">
            <el-input v-model="posts.title" placeholder="请输入文章标题" style="margin-bottom:10px;"></el-input>
            <no-ssr>
                <mavon-editor style="height: 650px;" ref="md" :toolbars="toolbars" v-model="posts.content" @imgAdd="handleUploadImg"/>
            </no-ssr>
        </el-col>
        <el-col :span="6">
            <el-row>
                <!-- 发布 -->
                <el-col :span="24" class="box-card" style="background-color:#fff;">
                    <div class="clearfix">
                        <span><b>发布</b></span>
                        <el-button style="float: right; padding: 6px 0" type="text" @click="issueShow=!issueShow"><i :class="issueShow?'fa fa-minus':'fa fa-plus'"></i></el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="issueShow" class="details">
                            <div>
                                <span><b>发布作者：</b></span>
                                <el-input type="text" v-model="posts.author"  style="width:200px;" placeholder="添加作者名称"/>
                            </div>
                            <div style="margin-top:15px;">
                                <span><b>文章类型：</b></span>
                                <el-select style="width:200px;" v-model="posts.source">
                                    <el-option label="原创" :value="1"></el-option>
                                    <el-option label="转载" :value="2"></el-option>
                                    <el-option label="翻译" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:15px;">
                                <span><b>开启评论：</b></span>
                                <el-select style="width:200px;" v-model="posts.allowComment">
                                    <el-option label="是" :value="1"></el-option>
                                    <el-option label="否" :value="0"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:15px;">
                                <el-button style="width:46%;" @click="handlePosts(0)">保存草稿</el-button>
                                <el-button style="width:46%;" type="primary" @click="handlePosts(1)">发布</el-button>
                            </div>
                        </div>
                    </el-collapse-transition>
                </el-col>

                <!-- 分类/标签 -->
                <el-col :span="24" class="box-card" style="background-color:#fff;">
                    <div class="clearfix">
                        <span><b>分类/标签</b></span>
                        <el-button style="float: right; padding: 6px 0" type="text" @click="classifyTagShow=!classifyTagShow"><i :class="classifyTagShow?'fa fa-minus':'fa fa-plus'"></i></el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="classifyTagShow" class="details">
                            <div>
                                <span><b>分类：</b></span>
                                <el-select style="width:200px;" v-model="posts.classify" placeholder="请选择">
                                    <el-option v-for="(item,index) in classifyList" :key="index" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:15px;">
                                <span><b>标签：</b></span>
                                <el-input type="text" v-model="inputTag" @keyup.enter.native="handleAdd()" @blur="handleAdd()" style="width:200px;" placeholder="添加标签"/>
                                <div style="width:100%; margin:10px 0;">
                                    <el-tag :key="item" v-for="item in posts.tag" closable :disable-transitions="false" @close="handleClose(item)" style="margin:3px;">
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
                <el-col :span="24" class="box-card" style="background-color:#fff;">
                    <div class="clearfix">
                        <span><b>封面图</b></span>
                        <el-button style="float: right; padding: 6px 0" type="text" @click="coverTagShow=!coverTagShow"><i :class="classifyTagShow?'fa fa-minus':'fa fa-plus'"></i></el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="coverTagShow" class="details">
                            <img :src="cover || 'https://up.alees.cn/thumbnail.png'" @click="dialogImage = true" style="width:100%; padding: 4px; border-radius:4px; border:1px solid #ddd"/>
                        </div>
                    </el-collapse-transition>
                </el-col>

            </el-row>
        </el-col>
        
        <!-- 添加封面弹窗 -->
        <!-- 图片列表 -->
        <el-dialog style="width: 80%; height: 80%; margin: auto;" title="添加封面图" :visible.sync="dialogImage" :fullscreen="true" :append-to-body='true'>
            <v-image-dialog @handleCurrentChange="handleCurrentChange" @handleImageUrl="handleImageUrl" :imageTotal="imageTotal" :imageList="imageList" :pageCode="pageCode"></v-image-dialog>
        </el-dialog>
    </el-row>
</template>

<script>
import VMarkdown from '~/components/admin/markdown1'
import VImageDialog from '~/components/admin/image-dialog'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 发布文章`,
        }
    },
    async asyncData({ app }){
        let classifyData = await app.$api.selectClassifyList()
        let tagData = await app.$api.selectTagList()
        let imageData = await app.$api.selectImagePage(1,12)
        return {
            classifyList: classifyData.data,//全部分类
            tagList: tagData.data,//全部标签
            imageList: imageData.data.records,//分页图片集合
            imageTotal: imageData.data.total,//图片总数
        }
    },
    created(){
        if(this.$store.state.compilePosts.id != undefined){
            this.posts = this.$store.state.compilePosts
            this.cover = this.posts.cover
            this.$store.commit('SET_COMPILEPOSTS', {})
        }
    },
    data(){
        return{
            //markdown菜单栏配置
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                //fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                //save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            posts:{
                title: '',//文章标题
                author: '',//作者
                cover: '',//封面图片
                content: '',//内容-Markdown
                html: '', //内容-html格式
                url: '',//文章路径
                state: '',//状态 0 回收站 1 已发布 2 草稿箱
                source: 1,//文章来源 原创1 转载2 翻译3
                allowComment: 1,//是否允许评论（允许1，禁止0）
                classify: '',//文章所属分类
                tag: [],//文章所属标签
            },
            issueShow: true,
            classifyTagShow:true,
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
        /**
         * 处理文章
         */
        handlePosts(status){
            this.posts.status = status    
            if(this.posts.title == '' ||
            this.posts.content == '' ||
            this.posts.author == '' ||
            this.posts.cover == '' ||
            this.posts.classify == '' ||
            this.posts.tag == ''){
                this.$message.error('必填项不能为空')
                return
            }
            this.posts.html = this.$refs.md.d_render

            if(this.posts.id == null)
                this.handleAddPosts()
            else
                this.handleUpdatePosts()     
        },
        /**
         * 发送文章发布请求
         */
        handleAddPosts(){
            this.$api.insertPosts(this.posts).then(res => {
                this.afterHandlePosts(res)
            })
        },
        /**
         * 发送修改文章发布请求
         */
        handleUpdatePosts(){
            this.$api.updatePosts(this.posts).then(res => {
                this.afterHandlePosts(res)
            })
        },
        //处理文章后置处理方法
        afterHandlePosts(res){
            if(res.code == 20000){
                this.$message({
                    type: 'success',
                    message: res.message
                })
            }
        },

        //发送获取图片列表请求
        handleImageList(){
            this.$api.selectImagePage(this.pageCode, this.pageSize).then(res => {
                this.imageList = res.data.records
                this.imageTotal= res.data.total
            })
        },
        /**
         * markdown子组件向父组件传入文章内容
         */
        handleEditorContent(data){
            this.posts.content = data
        },

        handleUploadImg(pos, file){
          var formData = new FormData();
          formData.append('file', file)
          this.$api.upload(formData).then(res => {
            console.log(res.data.url);
            this.$refs.md.$img2Url(pos, res.data.url)
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
            this.cover = data
            this.posts.cover = data
            this.dialogImage = false
        },

        //##################################################
        /**
         * 标签添加相关
         */
        handleClose(item){
            this.posts.tag.splice(this.posts.tag.indexOf(item), 1);
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
            if(this.posts.tag == null){
                this.posts.tag = []
            }
            this.posts.tag.forEach(element => {
                if(element == tag){
                    bool = false
                    return
                }
            });
            if(bool) this.posts.tag.push(tag)
        },
        //##################################################
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