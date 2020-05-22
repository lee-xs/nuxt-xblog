<template>
  <div style="overflow: hidden;">
    <!-- 文章信息详情 -->
    <div class="sketch">
      <div class="sketch-bg" :style="{backgroundImage:'url('+sketchBg+')'}"></div>
      <div class="gray-glass">
        <div class="sketch-info animated fadeInUp">
            <div>
              <!-- 标题 -->
              <el-row class="notice">
                <el-col class="hidden-md-and-down">
                  <p class="title" v-text="article.title">标题</p>
                </el-col>
                <el-col class="hidden-lg-only">
                  <p class="title" v-text="article.title.substring(0,15) + '...'">标题</p>
                </el-col>
              </el-row>
              <P>
                <span>Author&nbsp;</span><span v-text="article.author"></span>&nbsp;
                <span>In&nbsp;</span><span v-text="article.category"></span>&nbsp;
                <span>Publish&nbsp;</span><span v-text="article.publishTime.substring(0,10)"></span>
              </P>
              <P>
                <span v-text="article.views"></span><span>&nbsp;Views</span>
                <span v-text="article.likes"></span><span>&nbsp;Like</span>
                <span v-text="article.comments"></span><span>&nbsp;Comment</span>
              </P>
              <Tag v-for="(item,index) in article.tag" :key="index" :color="tagsColor[index%10]">
                <nuxt-link :to="`/tag/${item}`" :style="{'color': tagsColor[index%10]}"><span v-text="item"></span></nuxt-link>
              </Tag>
            </div>
        </div>
      </div>
    </div>


    <!-- 文章内容 -->
    <el-row class="article-container">
        <el-col :span="24" :md="21" class="animated fadeInUp">
          <no-ssr>
            <mavon-editor style="background: none;" v-model="article.content" :imageClick="imageClick()" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" :boxShadow="false"/>
          </no-ssr>
        </el-col>
        
        <el-col :span="3" style="padding-top: 25px;" class="hidden-md-and-down">
          <Affix :offset-top="200">
            <div  class="animated fadeInUp">
              <el-row style="text-align: center;">
              <el-col :span="24" style="margin-bottom: 10px;">
                <el-button @click="handleLikes()" circle><span class="iconfont">&#xe60c;</span></el-button>
              </el-col>
              <el-col :span="24" style="margin-bottom: 10px;">
                <el-button circle><span class="iconfont">&#xe670;</span></el-button>
              </el-col>
              <el-col :span="24" style="margin-bottom: 10px;">
                <el-button circle><span class="iconfont">&#xe63a;</span></el-button>
              </el-col>
              <el-col :span="24" style="margin-bottom: 10px;">
                <span class="iconfont">&#xe604;</span>
              </el-col>
              <el-col :span="24" style="margin-bottom: 10px;">
                <el-button circle @click="handleShare()"><span class="iconfont">&#xe600;</span></el-button>
              </el-col>
              <el-col :span="24" style="margin-bottom: 10px;">
                <el-button circle><span class="iconfont">&#xe615;</span></el-button>
              </el-col>
              <el-col :span="24">
                <el-button circle><span class="iconfont">&#xe61f;</span></el-button>
              </el-col>
            </el-row>
           </div>
          </Affix>
        </el-col>
    </el-row>

  </div>
</template>

<script>
import { getArticle } from '~/api/article'
import { getSite } from '~/api/site'
export default {
    head(){
        return{
          title: `【${this.$store.state.siteInfo.site.siteName}】${this.article.title}`,
        }
    },
    async asyncData({params, app}){
        let { data } = await app.$api.selectArticle(params.id.substring(0, params.id.indexOf('.')))

        //获取站点信息
        let siteInfoData = await app.$api.selectSite()
        let siteInfo = siteInfoData.data
        return {
          article: data,
          siteInfo,
        }
    },
    data(){
      return{
        sketchBg: '',
        tagsColor: ["primary","success","error","warning","magenta","orange","green","cyan","blue","purple"],
      }
    },
    methods: {
      randomSketckBg(){
        const rand = Math.floor(Math.random()*5)+1
        this.sketchBg = 'http://qiniu.aleestar.cn/sketchBg0' + rand+'.jpg'
      },
      imageClick(){
        
      },
      //点赞
      handleLikes(){
        
      },
      //处理分享
      handleShare(){
        if(process.browser){
          //分享到qq好友
          window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + window.location.href + '&sharesource=qzone&title=' + this.article.title + '&pics=' + this.$store.state.siteInfo.site.logo +'&summary=记录知识记录美');
        }
      }
    },
    created(){
        this.randomSketckBg()
    },
}
</script>

<style lang="scss" scoped>
*{
  border: none !important;
}
/deep/ .scroll-style{
  background: none !important;
  padding: 0 !important;
}
//=================================
.sketch,.sketch-bg,.gray-glass{
    width: 100%;
}
.sketch{
    overflow:hidden;
    position: relative;
    .sketch-bg{
        box-shadow: 0 1px 5px rgba(0,0,0,.3);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        -webkit-filter: blur(4px);
        -moz-filter: blur(4px);
        -o-filter: blur(4px);
        -ms-filter: blur(4px);
        filter: blur(4px);
    }
    .gray-glass{
        background-color: rgba(0,0,0,.5);
        position: absolute;
        top: 0;
        left: 0;
        .sketch-info{
            line-height: 30px;
            color: #ffffff;
            .title{
                font-size:25px;
                font-weight:bold;
            }
        }
    }
}
//=================================

.article-container{ 
    margin:0 auto;
}
@media (max-width:768px) {
    .sketch,.sketch-bg,.gray-glass{
        height:200px;
    }
    .sketch{
        .sketch-bg{
            -webkit-filter: blur(2px);
            -moz-filter: blur(2px);
            -o-filter: blur(2px);
            -ms-filter: blur(2px);
            filter: blur(2px);
        }
        .gray-glass{
            .sketch-info{
                margin:30px auto;
                width: 100%;
                padding: 10px;
            }
        }
    }
    .article-container{
        width: 100%;
        .content {
            height: 100%;
            padding:5px;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(26,26,26,.3);
            /deep/{
                h1,h2,h3,h4,h5,h6{
                    margin:5px 0;
                    color:#FF3030;
                }
            }
        }
    }
}
@media (min-width: 1200px) {
    .sketch,.sketch-bg,.gray-glass{
        height:230px;
    }
    .sketch{
      .sketch-bg{
          -webkit-filter: blur(4px);
          -moz-filter: blur(4px);
          -o-filter: blur(4px);
          -ms-filter: blur(4px);
          filter: blur(4px);
      }
        .gray-glass{
            .sketch-info{
                margin:80px auto;
                width: 850px;
            }
        }
    }
    .article-container{
        width: 850px;
       
        font-size: 15px;
        background: none;
        .content{
            height: 100%;
            padding:20px 10px;
            /* background: #ffffff;
            box-shadow: 0 1px 3px rgba(26,26,26,.3); */
            margin-right: 5px;
            /deep/ {
                h1,h2,h3,h4,h5,h6{
                    margin:10px 0;
                    color:#FF3030;
                }
            }
        }
    }
}
</style>