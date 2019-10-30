<template>
    <el-row>
        <el-col :span="18">
            <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>

            <v-markdown></v-markdown>
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
                                <el-button style="width:46%;">保存草稿</el-button>
                                <el-button style="width:46%;" type="primary">发布</el-button>
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
                                <el-input type="text" style="width:200px;" placeholder="添加标签"/>
                                <div style="width:100%; margin:10px 0;">
                                    <el-tag :key="item" v-for="item in article.tag" closable :disable-transitions="false" @close="handleClose(item)" style="margin:3px;">
                                        <span v-text="item"></span>
                                    </el-tag>
                                </div>
                                <el-select style="width:250px;" v-model="tag" placeholder="选择添加"  @change="handleChange()">
                                    <el-option v-for="(item,index) in tagList" :key="index" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                                
                            </div>
                        </div>
                    </el-collapse-transition>


                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import VMarkdown from '~/components/admin/markdown'
import { getAll as getCategoryAll } from '~/api/category'
import { getAll as getTagAll } from '~/api/tag'
export default {
    layout: 'admin_template',
    async asyncData(){
        let categoryData = await getCategoryAll()
        let tagData = await getTagAll()
        return {
            categoryList: categoryData.data,//全部分类
            tagList: tagData.data,//全部标签
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
            dynamicTags: [],
            tag: '',
            num: 1,
        }
    },
    components:{
        VMarkdown,
    },
    methods: {
        //标签添加相关
        handleClose(item){
            this.article.tag.splice(this.article.indexOf(item), 1);
        },
        handleChange(){
            let bool = true
            this.article.tag.forEach(element => {
                if(element == this.tag){
                    bool = false
                    return
                }
            });
            if(bool) this.article.tag.push(this.tag)
        }
    },
}
</script>

<style lang="scss" scoped>
.box-card{
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.2);
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