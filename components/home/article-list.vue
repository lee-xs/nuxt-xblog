<template>
  <el-row class="list">
    <el-col :span="24" class="hidden-md-and-down animated fadeInUp">
        <el-row class="list-container">
            <el-col :span="24" v-if="list.length == 0" style="padding: 20px; background-color:#fff; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); text-align:center; font-size:14px;">
                <p>暂无相关内容...</p>
            </el-col>

            <el-col :span="24" v-for="(item,index) in list" :key="item.id + '' + index" class="list-card animated fadeInUp" style="position: relative;">
                <nuxt-link :to="'/' + item.id + '.html'">
                    <div class="list-img">
                        <!-- <img :src="item.cover"/> -->
                        <el-image class="el-image" :src="item.cover">
                            <div slot="placeholder" class="image-slot">
                                <img :src="loadingImg" class="loading-img">
                            </div>
                        </el-image>
                    </div>
                    <h4 v-if="item.title.length < 28"><span v-text="item.title"></span><el-tag type="danger" effect="dark" size="mini" class="is-top" v-if="item.isTop == 1">置顶</el-tag></h4>
                    <h4 v-else><span v-text="item.title.substring(0,28)+'...'"></span><el-tag type="danger" effect="dark" size="mini" class="is-top" v-if="item.isTop == 1">置顶</el-tag></h4>
                </nuxt-link>
                <div class="list-con" style="margin-bottom: 1px;">
                    <p class="details">
                        <span v-text="item.author"></span>&nbsp;/&nbsp;
                        <nuxt-link :to="'/category/' + item.category">
                            <span v-text="item.category"></span>
                        </nuxt-link>&nbsp;/&nbsp;
                        <span v-text="item.publishTime.substring(0,10)"></span>
                        <i class="iconfont" style="font-size: 13px;">&#xe60e;&nbsp;<span class="list-tag"  v-text="item.views">0</span></i>
                        <i class="iconfont" style="font-size: 13px;">&#xe7cd;&nbsp;<span class="list-tag" v-text="item.likes">0</span></i>
                        <i class="iconfont" style="font-size: 13px;">&#xe745;&nbsp;<span class="list-tag" v-text="item.comments">0</span></i>
                        <!-- <i class="el-icon-view">&nbsp;<span class="list-tag"  v-text="item.views">0</span></i>
                        <i class="el-icon-star-off">&nbsp;<span class="list-tag" v-text="item.likes">0</span></i>
                        <i class="el-icon-chat-square">&nbsp;<span class="list-tag" v-text="item.comments">0</span></i> -->
                    </p>
                </div>
                <nuxt-link :to="'/'+item.id + '.html'">
                    <p style="color:#606266;" v-text="item.summary+'...'"></p>
                    <div style="background-color: #c40000; position: absolute; top:140px; right:0; color: #ffffff; padding: 3px 8px;">阅读全文</div>
                </nuxt-link>
            </el-col>
        </el-row>
    </el-col>

    <el-col :span="24" class="hidden-sm-and-up animated fadeInUp">
        <el-row class="list-container">
            <el-col :span="24" v-for="(item,index) in list" :key="item.id + '' + index" class="list-card">
                <nuxt-link :to="'/' + item.id + '.html'">
                    <div class="list-img">
                        <!-- <img :src="item.cover"/> -->
                        <el-image class="el-image" :src="item.cover">
                            <div slot="placeholder" class="image-slot">
                                <img :src="loadingImg" class="loading-img">
                            </div>
                        </el-image>
                    </div>
                    <h4 v-if="item.title.length > 16"><span v-text="item.title.substring(0,16) + '...'"></span><el-tag type="danger" effect="dark" size="mini" class="is-top" v-if="item.isTop == 1">置顶</el-tag></h4>
                    <h4 v-else><span v-text="item.title"></span><el-tag type="danger" effect="dark" size="mini" class="is-top" v-if="item.isTop == 1">置顶</el-tag></h4>
                </nuxt-link>
                <div class="list-con">
                    <p class="details">
                        <span v-text="item.author"></span>&nbsp;/&nbsp;
                        <span v-text="item.category"></span>&nbsp;/&nbsp;
                        <span v-text="item.publishTime.substring(0,10)"></span>
                    </p>
                </div>
                <nuxt-link :to="'/'+item.id + '.html'">
                    <p style="color:#606266;" v-text="item.summary.substring(0,50)+'...'"></p>
                </nuxt-link>
            </el-col>
        </el-row>
    </el-col>

    <!-- 分页 -->
    <el-col :span="24" v-if="total != 0" class="animated fadeInUp" style="text-align:center; margin-top:20px;">
        <Page
        :total="total"
        :current="pageCode"
        :page-size="pageSize"
        @on-change="handleCurrentChange"></Page>
    </el-col>
</el-row>
</template>

<script>
import { stripe } from 'static/loading.json'
export default {
  data(){
      return{
          pageCode: 1,
          pageSize: 10,
          loadingImg: stripe
      }
  },
  props:['list', 'total'],
  methods: {
    handleCurrentChange(pageCode){
      this.$emit('pageCode', pageCode)
    },
  },
};
</script>

<style lang="scss" scoped>
.is-top{
    vertical-align:text-top; 
    margin-left: 5px;
}
.list-container{
    .list-card{
        font-size: 13px;
        line-height: 25px;
        //border-bottom: 1px solid #E9E9E9;
        border: 1px solid #FFF;
        border-bottom-color: #E9E9E9;
        background: #fff;
        //box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        h4{
            color:#606266;
            font-size: 15px;
        }
        .list-img{
            overflow: hidden;
            .el-image{ 
                width: 100%;
                height: 100%;
                cursor: pointer;
                transition: ease-in-out .5s;
                &:hover{
                    transform: scale(1.15);
                }
                .image-slot{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    background-color: #fefac7;
                }
                .loading-img{
                    margin: auto;
                }
            }
        }
        .list-con{
            color:#606266;
            a{
                color:#606266;
            }
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
@media (max-width:768px) {
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
@media (min-width:1200px) {
.list-container{
    .list-card{
        height: 180px;
        padding: 15px;
        transition: all .3s linear;
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
    .list-card:hover{
        transition: all .3s linear;
        border: 1px solid red;
    }
}
}
</style>