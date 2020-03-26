<template>
    <div class="header-container animated bounceInDown">
        <div class="header">
            <el-row style="height:68px;">
                <!-- logo -->
                <nuxt-link to="/" @click="this.$router.push('/home')">
                    <el-col :span="2" :xs="5" class="logo">
                        <img :src="siteInfo.site.logo" />
                    </el-col>
                </nuxt-link>

                <!-- 导航 -->
                <!-- 电脑端 menu -->
                <el-col :lg="10" class="hidden-md-and-down">
                    <nav>
                        <ul>
                            <li v-for="(item, index) in navs" :key="index" >
                                <nuxt-link :to="{ name: item.name }">{{ item.title }}</nuxt-link>
                            </li>
                            <li>
                                <i class="el-icon-search"></i>
                            </li>
                        </ul> 
                    </nav>
                </el-col>
                <!-- 手机端 menu -->
                <el-col :span="2" class="hidden-lg-only">
                    <el-dropdown trigger="click">
                        <i class="el-icon-menu"></i>
                        <el-dropdown-menu >
                            <el-dropdown-item v-for="(item, index) in navs" :key="index">
                                <nuxt-link style="color: #8590a6;" :to="{ name: item.name }">{{ item.title }}</nuxt-link>
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
            // navs: [
            //     {name: 'index', title: '首页' },
            //     {name: 'archives', title: '归档' },
            //     {name: 'message', title: '留言板' },
            //     {name: 'links', title: '友情链接' },
            //     {name: 'about', title: '关于' },
            // ],
            navs: this.$store.state.menuList,
            siteInfo: this.$store.state.siteInfo,
        }
    },
}
</script>

<style lang="scss" scoped>
.header-container{
    background: #fff;
    box-shadow: 0 1px 3px rgba(26,26,26,.2);
    width: 100%;
    height: 68px;
    position: fixed;
    z-index: 100;
    top:0;
    .header{ 
        height: 68px;
        line-height: 68px;
        margin: auto;
        .logo{
            color: #8590a6;
            img{
                width: 120px;
                height: 58px;
            }
        }
        .hidden-md-and-down{
            float: right;
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
        .hidden-lg-only{
            float: right;
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
            width: 1000px;
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

