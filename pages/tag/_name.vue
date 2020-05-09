<template>
    <el-row class="index-container">
        <el-col :span="24" class="hidden-md-and-down">
            <v-notice :noticeList="noticeList"/>
        </el-col>

        <!-- list -->
        <el-col :span="17" :xs="24">
            <v-article-list :list="list" :total="total" @pageCode="handleCurrentChange"></v-article-list>
        </el-col>

        <!-- crad -->
        <el-col :span="7" :xs="24" class="hidden-md-and-down" style="padding-left:5px;">
            <!-- 随机文章 -->
            <v-rand-card :randList="randList"></v-rand-card>
            <!-- 标签列表 -->
            <v-tag-card :tagList="tagList"></v-tag-card>
            <Affix :offset-top="80">
                <!-- 热门文章 -->
                <v-hot-card :hotList="hotList"></v-hot-card>
            </Affix>
        </el-col>
    </el-row>
</template>

<script>
import VArticleList from '~/components/home/article-list'
import VNotice from '~/components/home/notice'
import VTagCard from '~/components/home/tag-card'
import VHotCard from '~/components/home/hot-card'
import VRandCard from '~/components/home/rand-card'
import { getNotice } from '~/api/index'
import { getPageArticleByTag, getHotList, getRandList } from '~/api/article'
import { getAll } from '~/api/tag'
export default {
    data(){
        return{
            pageCode: 1,
            pageSize: 10,
            loading: false,
            title: '',
        }
    },
    head(){
        return{
            title: `【${this.$store.state.siteInfo.site.siteName}】${this.title}`,
        }
    },
    components:{
        VNotice,
        VArticleList,
        VTagCard,
        VHotCard,
        VRandCard,
    },
    async asyncData({params, app}) {
        //获取文章列表
        let { data } = await app.$api.selectArticlePageByTag(1, 10, params.name) 
        //获取全部标签
        let tagData = await app.$api.selectTagAll()
        //获取热门文章
        let hotData = await app.$api.selectHotList()
        //随机文章
        let randData = await app.$api.selectRandList()
        //获取通知
        let noticeData = await app.$api.selectNotice()
        return {
            title: '标签->' + params.name,
            tagName: params.name,//标签名
            list: data.records,//文章list
            total: data.total,//文章总数
            tagList: tagData.data,//全部标签
            hotList: hotData.data,//热门文章list
            randList: randData.data,//随机文章
            noticeList: noticeData.data,//通知列表
        }       
    },
    methods:{
        handleCurrentChange(data){
            this.loading = true
            this.pageCode = data
            //根据标签分页
            this.$api.selectArticlePageByTag(this.pageCode, this.pageSize, this.tagName).then(res => {
               this.list = res.data.records
                this.total = res.data.total
                this.loading = false
            })
        },
    },
}  
</script>

<style lang="scss" scoped>
.index-container{
    margin: 0 auto;
    overflow: hidden;
    .list-container{
        background: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.3);
        .list-card{
            font-size: 13px;
            line-height: 25px;
            border-bottom: 1px solid #dcdee6;
            h4{
                color:#606266;
                font-size: 15px;
            }
            .list-img{
                overflow: hidden;
                img{ 
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    transition: ease-in-out .5s;
                    &:hover{
                        transform: scale(1.15);
                    }
                }
            }
            .list-con{
                 color:#606266;
                .details>i{
                    
                    float: right;
                }
                .list-tag{
                    margin-right:10px;
                    font-size: 13px;
                }
            }
        }
    }
}
@media (max-width:768px) {
    .index-container{
        width: 100%;
        .list-container{
            .list-card{
                height: 138px;
                padding: 8px;
                .list-img{
                    width: 120px;
                    height: 120px;
                    float: left;
                    margin-right: 15px;
                }  
                .list-con{
                    width: 100%;
                } 
            }
        }
    }
}
@media (min-width:1200px) {
    .index-container{
        width: 1010px;
        padding: 0 5px;
        .list{
            padding-right:5px;
        }
        .list-container{
            .list-card{
                height: 180px;
                padding: 15px;
                .list-img{
                    width: 200px;
                    height: 150px;
                    float: left;
                    margin-right: 15px;
                }
                .list-con{
                    .details>i{
                        line-height: 25px;
                    }
                }
            }
        }
    }
}
</style>


