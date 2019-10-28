<template>
  <div>
    <div class="sketch">
      <div class="sketch-bg" :style="{backgroundImage:'url('+sketchBg+')'}"></div>
      <div class="gray-glass">
        <div class="sketch-info animated bounce">
            <div>
              <!-- 标题 -->
              <p v-text="'网站名称：' + site.siteName"></p>
              <p v-text="'网站logo：' + site.logo"></p>
              <p v-text="'网站地址：' + site.siteUrl"></p>
              <p v-text="'联系邮箱：' + site.admin.email"></p>
              <p>注意：申请友链时请将本站设为贵站的友链</p>
              <!-- 申请友情链接 -->
              <el-form>
                <el-form-item class="input_wrap">
                  <input class="input" placeholder="键入网站名称"  autocomplete="off" v-model="links.name"/>
                  <div class="after"></div>
                </el-form-item>
                <el-form-item class="input_wrap">
                  <input class="input" placeholder="键入网站logo" autocomplete="off" v-model="links.logo"/>
                  <div class="after"></div>
                </el-form-item>
                <el-form-item class="input_wrap">
                  <input class="input" placeholder="键入网站url" autocomplete="off" v-model="links.url"/>
                  <div class="after"></div>
                </el-form-item>
                <el-form-item class="input_wrap">
                  <input class="input" placeholder="键入邮箱" autocomplete="off"  v-model="links.email"/>
                  <div class="after"></div>
                </el-form-item>
                <el-form-item class="input_wrap">
                  <el-button class="input-btn" @click="handleReset()">重置</el-button>
                  <el-button class="input-btn" @click="handleSubmit()">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
      </div>
    </div>

    <!-- 友链列表 -->
    <el-row class="links-list-container">
        <v-links-box :linksList="linksList"></v-links-box>
    </el-row>
  </div>
</template>

<script>
import '~/assets/css/input.scss'
import { validateLinks } from '~/assets/js/validate'
import { getSiteInfo } from '~/api/site'
import { getAll, save } from '~/api/links'
import VLinksBox from '~/components/links-box'
export default {
  head(){
    return{
      title: '【XIN-BLOG】友情链接',
    }
  },
  async asyncData(){
    let siteData = await getSiteInfo()
    let linksListData = await getAll()
    return{
      site: siteData.data,//站点信息
      linksList: linksListData.data,//友链列表
    }
  },
  data(){
    return{
      sketchBg: '',
      links:{
        name: '',
        logo: '',
        url: '',
        email: '',
      },
    }
  },
  components:{
    VLinksBox
  },
  methods:{
    randomSketckBg(){
      const rand = Math.floor(Math.random()*5)+1
      this.sketchBg = '/sketchBg0' + rand+'.jpg'
    },
    //重置links信息
    handleReset(){
      this.links = {}
    },
    //提交友链
    handleSubmit(){
      //验证友情链接的信息格式
      if(!validateLinks(this.links)){
        return;
      }
      //发送添加友链请求
      save(this.links).then(res => {
        if(res.code == 20000){
          this.$message({
            type: 'success',
            message: res.message
          })
        }
        this.links = {}
      })
    }
  },
  created(){
    this.randomSketckBg()
  },
}
</script>

<style lang="scss" scoped>
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
            line-height: 36px;
            color: #ffffff;
        }
    }
}

.input-btn{
  width:50%; 
  border:none; 
  border-radius:0; 
  color:#fff; 
  background: rgba(255, 255, 255, 0.1); 
  float:left; 
  margin:0;
  &:hover{
    color: black;
    background-color: #ECF5FF;
  }
}
.links-list-container{
  width: 1000px;
  margin: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
}
//======================================
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

}
@media (min-width: 1200px) {
    .sketch,.sketch-bg,.gray-glass{
        height:500px;
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
                margin:60px auto;
                width: 1000px;
                font-size: 17px;
            }
        }
    
    }
}
</style>