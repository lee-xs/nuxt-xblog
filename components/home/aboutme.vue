<template>
    <div class="card-container animated fadeInUp">
        <p class="card-container-title">关于本站</p>
        <div>
            <!-- <img :src="siteInfo.admin.avatar" style="width: 100%; height: 200px;"/> -->
            <el-image class="el-image" :src="siteInfo.admin.avatar">
                <div slot="placeholder" class="image-slot">
                    <img :src="loadingImg" class="loading-img">
                </div>
            </el-image>
            <el-row style="text-align: center; padding:8px 0 13px 0;">
                <el-col :span="6">
                    <el-popover
                        placement="top-start"
                        ref="popover"
                        width="160"
                        trigger="hover">
                        <img :src="siteInfo.site.wechatCode" style="width: 100%; height: 100%;"/>
                    </el-popover>
                    <el-button circle v-popover:popover><span class="iconfont">&#xe615;</span></el-button>
                </el-col>
                <el-col :span="6">
                    <a target="_blank" :href="'http://wpa.qq.com/msgrd?V=3&uin=' + siteInfo.site.qq + '&Site=QQ&Menu=yes'">
                        <el-button circle><span class="iconfont">&#xe600;</span></el-button>
                    </a>
                </el-col>
                <el-col :span="6">
                    <a :href="siteInfo.site.github" target="_blank">
                        <el-button circle><span class="iconfont">&#xe601;</span></el-button>
                    </a>
                </el-col>
                <el-col :span="6">
                    <a :href="siteInfo.site.gitee" target="_blank">
                        <el-button circle><span class="iconfont">&#xe686;</span></el-button>
                    </a>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { stripe } from 'static/loading.json'
export default {
    props: ['siteInfo'],
    data(){
        return{
            loadingImg: stripe
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/common.scss';
</style>