<template>
    <div class="header-container animated fadeInDown">
        <div class="header">
            <el-row style="height:68px;">
                <!-- logo -->
                <el-col :span="9" :xs="22">
                    <nuxt-link class="logo" to="/" @click="this.$router.push('/home')">
                        <img :src="siteInfo.site.logo" />
                    </nuxt-link>

                    <div id="weather-v2-plugin-simple"></div> 
                </el-col>

                <!-- 导航 -->
                <!-- 电脑端 menu -->
                <el-col :lg="15" class="hidden-md-and-down">
                   <nav style="line-height: 68px;">
                        <ul>
                            <li v-for="(item, index) in navs" :key="index" >
                                <nuxt-link v-if="item.indexes != ''" :to="{ name: item.indexes }">{{ item.title }}</nuxt-link>
                                <a v-else :href="item.url" target="_blank">{{ item.title }}</a>
                            </li>
                            <!-- <li>
                                <i class="el-icon-search"></i>
                            </li> -->
                        </ul> 
                    </nav>
                </el-col>
                <!-- 手机端 menu -->
                <el-col :span="2" class="hidden-sm-and-up">
                    <el-dropdown trigger="click">
                        <i class="el-icon-menu"></i>
                        <el-dropdown-menu >
                            <el-dropdown-item v-for="(item, index) in navs" :key="index">
                                <nuxt-link v-if="item.indexes != ''" style="color: #8590a6;" :to="{ name: item.indexes }">{{ item.title }}</nuxt-link>
                                <a v-else :href="item.url" target="_blank">{{ item.title }}</a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>       
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css' //element布局隐藏css
export default {
    data(){
        return{
            navs: this.$store.state.menuList,
            siteInfo: this.$store.state.siteInfo,
        }
    },
    created(){
        if(process.browser){
            window.WIDGET =  {  
                                CONFIG: {
                                    "modules": "01234",
                                    "background": 4,
                                    "backgroundColor": "FFFFFF",
                                    "tmpColor": "000000",
                                    "tmpSize": "16",
                                    "cityColor": "000000",
                                    "citySize": "16",
                                    "aqiSize": "16",
                                    "weatherIconSize": 24,
                                    "alertIconSize": 18,
                                    "padding": "22px 10px 10px 10px",
                                    "shadow": "1",
                                    "language": "auto",
                                    "borderRadius": 5,
                                    "fixed": "false",
                                    "vertical": "middle",
                                    "horizontal": "center",
                                    "key": "yT7CRRl3Hy"
                                }
                             };
            (function (d) {
                var c = d.createElement('link')
                c.rel = 'stylesheet'
                c.href = 'https://apip.weatherdt.com/simple/static/css/weather-simple.css?v=2.0'
                var s = d.createElement('script')
                s.src = 'https://apip.weatherdt.com/simple/static/js/weather-simple.js?v=2.0'
                var sn = d.getElementsByTagName('script')[0]
                sn.parentNode.insertBefore(c, sn)
                sn.parentNode.insertBefore(s, sn)
            })(document);

        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ #weather-v2-plugin-simple{
    width: 200px;
    float: right;
}
.header-container{
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    width: 100%;
    height: 68px;
    position: fixed;
    z-index: 100;
    top:0;
    .header{ 
        height: 68px;
        margin: auto;
        .logo{
            color: #8590a6;
            img{
                width: 120px;
                height: 68px;
            }
        }
        .hidden-md-and-down{
            font-size: 15px;
            nav{
                ul{
                    float: right;
                    li{
                        float: left;
                        padding-left: 20px;
                        a,i{
                            color: #8590a6;
                        }
                    }
                }
            }
        }
        .hidden-sm-and-up{
            .el-icon-menu{
                line-height: 68px;
                font-size: 30px;
            }
        }
    } 
}
@media (min-width:1200px) {
    .header-container{
        .header{
            width: 1020px;
        }
    }   
}
@media (max-width:768px) {
    .header-container{
        .header{
            width: 100%;
            .logo{
                margin-left: 5px;
            }
        }
    }
}
</style>




