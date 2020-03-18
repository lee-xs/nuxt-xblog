<template>
  <div style="overflow: hidden;">
    <!-- 文章信息详情 -->
    <div class="sketch">
      <div class="sketch-bg" :style="{backgroundImage:'url('+sketchBg+')'}"></div>
      <div class="gray-glass">
        <div class="sketch-info animated bounce">
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
                <span v-text="item"></span>
              </Tag>
            </div>
        </div>
      </div>
    </div>

    <!-- 文章内容 -->
    <el-row class="article-container">
        <el-col :lg="17" :xs="24" class="animated bounceInLeft">
          <div v-html="article.content" class="content"></div>
        </el-col>

        <el-col class="hidden-md-and-down" :lg="7" :xs="24" key="catalogue" style="padding-left:5px;">
          <el-row>
            <!-- 卡片 -->
            <el-col :span="24">
              <v-site-card :siteInfo="siteInfo"></v-site-card>
            </el-col>
            <el-col :span="24" >
              <!-- 目录 -->
              <Affix :offset-top="80">
                <div class="card-container animated bounceInRight">
                  <p class="card-container-title">目录</p>
                  <div class="card-container-content anchor">
                    <ul>
                      <li v-for="(item,index) in catalogue" :key="index">
                          <a @click.prevent="handleJump(item.href)" :href="item.href">
                            <span v-if="item.title.length > 20" v-text="item.title.substring(0,20) + '...'"></span>
                            <span v-else v-text="item.title"></span>
                          </a>
                          <ul v-if="item.child != null">
                              <li v-for="(child,index) in item.child" :key="index">
                                  <a @click.prevent="handleJump(child.href)" :href="child.href">
                                    <span v-if="child.title.length > 20" v-text="child.title.substring(0,20) + '...'"></span>
                                    <span v-else v-text="child.title"></span>
                                  </a>
                              </li>
                          </ul>
                      </li>
                    </ul>
                  </div> 
                </div>
              </Affix>
            </el-col>
          </el-row>
        </el-col>
    </el-row>

  </div>
</template>

<script>
import { jump } from '~/api/jump'
import '~/assets/css/article.css'//文章样式
import { getArticle } from '~/api/article'
import { getSite } from '~/api/site'
import VSiteCard from '~/components/site-card'
export default {
    head(){
        return{
          title: `【XIN-BLOG】${this.article.title}`,
        }
    },
    components:{
      VSiteCard,
    },
    async asyncData({params}){
        let { data } = await getArticle(params.id)

        //获取站点信息
        let siteInfoData = await getSite()
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
        catalogue: [],
      }
    },
    methods: {
      randomSketckBg(){
        const rand = Math.floor(Math.random()*5)+1
        this.sketchBg = 'http://aleestar.test.upcdn.net/sketchBg0' + rand+'.jpg'
      },
      handleArticle(){
        //匹配标签里面的所有内容
        const regex = /<(h[1-6])[\s\S]*?>[\s\S]*?<\/(h[1-6])>/g
        
        let anchor = this.article.content.match(regex)
        let data = []
        let index = 0
        let current = 0
        let childIndex = 0
        let child = []
        for (let i = 0; i < anchor.length; i++) {
            data[index] = new Array()
            let num = parseInt(anchor[i].charAt(2))
            let href = '#' + anchor[i].substring(8,19)
            let title = anchor[i].substring(21,anchor[i].length-5)
            if(num <= 2){
                child = []
                current = index
                data[current] = {'href':href,'title':(current+1)+' '+title}
                index++
                childIndex = 0
            }else if(num <= 5){
                child.push({'href':href,'title':(current+1)+'.'+(child.length+1)+' '+title})
                data[current]['child'] = child
            } 
        }
        for(let i = 0; i < data.length; i++){
            if(data[i].length ==  0){
                data.splice(i,1)
            }
        }          
        this.catalogue = data
      },
      handleJump(anchor){
        jump(this.$el,anchor)
      },
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.scrollTop           
        if(scrollTop > 230){
            this.anchorIsFixed = true
        }else{
            this.anchorIsFixed = false
        }
      }
    },
    created(){
        this.randomSketckBg()
        this.handleArticle()
    },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/common.scss';
.v-enter,
.v-leave-to{
    opacity: 0;
    transform: translateY(20px);
}
.v-enter-active{
    transition: all 0.6s ease;
}
.v-leave-active{
    opacity: 0;
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
.article-container{ 
    margin:0 auto 2px;
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
                width: 1000px;
            }
        }
    }
    .article-container{
        width: 1010px;
        padding: 0 5px;
        font-size: 15px;
        .content{
            height: 100%;
            padding:20px 10px;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(26,26,26,.3);
            margin-right: 5px;
            /deep/ {
                h1,h2,h3,h4,h5,h6{
                    margin:10px 0;
                    color:#FF3030;
                }
            }
        }
        .anchor{
            padding-bottom: 10px;
            ul{
                list-style-type: none;
                margin:0;
                padding: 0;
                line-height: 28px;
                margin-left:10px;
                li a{
                    padding-left: 5px;
                    color: #515a6e;
                    font-size: 14px;
                    &:hover{
                        color: #eb5055;
                    }
                }
            }
            ul>li>ul>li{
                padding-left: 10px;
            }
            >ul{
                border-left: 1.5px solid #ddd;
            }
            >ul>li:before{
                position: relative;
                top: -3px;
                left: -4px;
                display: inline-block;
                width: 7px;
                height: 7px;
                content: '';
                border-radius: 50%;
                background-color: #eb5055;
            }
        }
    }
}
</style>