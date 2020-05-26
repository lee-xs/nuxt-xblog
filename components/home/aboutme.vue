<template>
    <div class="card-container animated fadeInUp">
        <p class="card-container-title"><b>关于本站</b></p>
        <div>
            <img :src="siteInfo.admin.avatar" style="width: 100%; height: 200px;"/>
            <el-row style="text-align: center; padding-bottom: 5px;">
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
export default {
    props: ['siteInfo']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/common.scss';
</style>