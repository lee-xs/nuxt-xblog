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
    <el-row class="article-container" style="z-index: 1;">
      <el-col :span="24" :md="21">
        <no-ssr>
          <mavon-editor style="backgournd:none; border-radius: 0; padding: 20px 20px 5px 20px;" v-model="article.content" :imageClick="imageClick()" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" :boxShadow="false"/>
        </no-ssr>

        <div>
          <el-row style="background: #fff; text-align: center; padding: 10px; line-height: 25px; margin-top: 20px;">
            <el-col :span="12">
              <nuxt-link v-if="previous != null" :to="'/' + previous.id + '.html'" style="color: #515A3E;">
                <p><i class="iconfont" style="margin-right: 5px; font-size: 14px;">&#xe618;</i>上一篇</p>
                <p v-text="previous.title.length > 25? previous.title.substring(0,25) + '...' : previous.title"></p>
              </nuxt-link>
              <div v-else>
                <p style="margin-top: 13px;">没有更多了</p>
              </div>
            </el-col>
            <el-col :span="12">
              <nuxt-link v-if="next != null" :to="'/' + next.id + '.html'" style="color: #515A3E;">
                <p>下一篇<i class="iconfont" style="margin-left: 5px; font-size: 14px;">&#xe605;</i></p>
                <p v-text="next.title.length > 25? next.title.substring(0,25) + '...' : next.title"></p>
              </nuxt-link>
              <div v-else>
                <p style="margin-top: 13px;">没有更多了</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      
      <el-col :span="3" style="padding-top: 25px;" class="hidden-md-and-down">
        <Affix :offset-top="200">
          <div>
            <el-row style="text-align: center;">
            <el-col :span="24" style="margin-bottom: 10px;">
              <el-badge :value="likes">
                <el-button @click="handleLikes()" circle><span class="iconfont">&#xe60c;</span></el-button>
              </el-badge>
            </el-col>
            <!-- <el-col :span="24" style="margin-bottom: 10px;">
              <el-button circle><span class="iconfont">&#xe670;</span></el-button>
            </el-col> -->
            <el-col :span="24" style="margin-bottom: 3px;">
              <el-button circle><span class="iconfont">&#xe63a;</span></el-button>
            </el-col>
            <el-col :span="24" style="margin-bottom: 3px;">
              <span class="iconfont">&#xe604;</span>
            </el-col>
            <el-col :span="24" style="margin-bottom: 10px;">
              <el-button @click="handleShare()" circle><span class="iconfont">&#xe600;</span></el-button>
            </el-col>
            <el-col :span="24" style="margin-bottom: 3px;">
              <el-button @click="createQrCode()" circle><span class="iconfont">&#xe615;</span></el-button>
            </el-col>
            <!-- <el-col :span="24">
              <el-button circle><span class="iconfont">&#xe61f;</span></el-button>
            </el-col> -->
          </el-row>
          </div>
        </Affix>

        <el-dialog style="margin-top: 100px;" title="分享" :visible.sync="qrCodeVisible" width="300px" center :append-to-body='true'>
          <div class="qrcode" ref="qrCodeUrl" />
        </el-dialog>
      </el-col>
    </el-row>

    <Back-top :bottom="100"></Back-top>
  </div>
</template>

<script>
const QRCode = process.browser? require('qrcodejs2') : null
import { getArticle } from '~/api/article'
import { getSite } from '~/api/site'
export default {
    head(){
        return{
          title: `【${this.$store.state.siteInfo.site.siteName}】${this.article.title}`,
        }
    },
    async asyncData({params, app}){
        const id = params.id.substring(0, params.id.indexOf('.'))
        let articleData = await app.$api.selectArticle(id, returnCitySN.cip)

        //获取文章点赞数
        let likesData = await app.$api.selectLikes(id)
        let likes = likesData.data
        //获取站点信息
        let siteInfoData = await app.$api.selectSite()
        let siteInfo = siteInfoData.data
        return {
          article: articleData.data.article,
          previous: articleData.data.previous,
          next: articleData.data.next,
          likes,
          siteInfo,
        }
    },
    data(){
      return{
        sketchBg: '',
        tagsColor: ["primary","success","error","warning","magenta","orange","green","cyan","blue","purple"],
        qrCodeVisible: false,
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
        this.$api.addLikes(this.article.id, returnCitySN.cip).then(res => {
          if(res.code == 20000){
            this.$message({
              type: 'success',
              message: res.message
            })
            this.likes += 1
          }
        })
      },
      //处理分享
      handleShare(){
        if(process.browser){
          //分享到qq好友
          window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + window.location.href + '&sharesource=qzone&title=' + this.article.title + '&pics=' + this.$store.state.siteInfo.site.logo +'&summary=记录知识记录美');
        }
      },
      //生成页面分享二维码
      createQrCode(){
        this.qrCodeVisible = true
        if(this.$refs.qrCodeUrl == undefined){
          this.$nextTick(() => {
            const qrcode = new QRCode(this.$refs.qrCodeUrl, {
              text: window.location.href,
              width: 250,
              height: 250,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel.H
            })
          })
        }
      }
    },
    created(){
      this.randomSketckBg()
    },
}
</script>

<style lang="scss" scoped>
.qrcode{
    display: inline-block;
    img {
        width: 132px;
        height: 132px;
        background-color: #fff; //设置白色背景色
        padding: 6px; // 利用padding的特性，挤出白边
        box-sizing: border-box;
    }
}

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