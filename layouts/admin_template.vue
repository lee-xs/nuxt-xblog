<template>
    <div>
        <div class="sidebar" :style="{width:isCollapse?'64px':'200px'}">
            <el-menu class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b" 
                :collapse="isCollapse"
                v-for="(item,index) in navs" :key="index">
                <el-submenu index="1" v-if="item.child">
                    <template slot="title">
                        <i :class="item.type"></i>
                        <span slot="title" v-text="item.title"></span>
                    </template>
                    <el-menu-item index="2" v-for="(child,index) in item.child" :key="index">
                        <nuxt-link :to="'/admin/' + child.name">
                            <div>
                                <i :class="child.type"></i>
                                <span slot="title" v-text="child.title"></span>
                            </div>
                        </nuxt-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else>
                    <nuxt-link :to="'/admin/' + item.name">
                        <div>
                            <i :class="item.type"></i>
                            <span slot="title" v-text="item.title"></span>
                        </div>
                    </nuxt-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main" :style="{marginLeft:isCollapse?'64px':'200px'}">
            <div class="abovebar">
                <div>
                    <i :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse = !isCollapse"></i>
                </div>
            </div>
            <div class="content" :style="{left: isCollapse? '64px':'200px'}">
                <nuxt/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            menuSpan:'',
            navs: [
                {name: '', title: '首页', type: 'el-icon-menu'},
                {name: 'posts', title: '文章管理' , type: 'el-icon-tickets', child: [
                    {name: 'list', title: '全部文章', type: 'el-icon-takeaway-box'},
                    {name: 'issue', title: '发布文章', type: 'el-icon-edit-outline'},
                    {name: 'classify', title: '分类', type: 'el-icon-bank-card'},
                    {name: 'tag', title: '标签', type: 'el-icon-discount'},
                ]},
                {name: 'menu', title: '菜单管理', type: 'el-icon-menu'},
                {name: 'links', title: '友链管理', type: 'el-icon-connection'},
                {name: 'notice', title: '公告管理', type: 'el-icon-bell'},
                {name: 'picture', title: '图片管理', type: 'el-icon-picture-outline'},
                {name: 'slide', title: '幻灯片管理', type: 'el-icon-s-flag'},
                {name: 'user', title: '用户管理', type: 'el-icon-user'},
                {name: 'site', title: '站点管理', type: 'el-icon-s-tools'},
            ],
        };
    },
    middleware: 'interceptor',
    methods: {
    
    }
}
</script>

<style lang="scss" scoped>
.sidebar{
    position: fixed;
    height: 100vh;
    float: left;
    left: 0;
    overflow: auto;
    background-color: #545c64;
}
.main{
    overflow: hidden;
    width: 100%;
    .abovebar{
        height:50px; 
        width:100%; 
        font-size:30px;
        padding: 0 20px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.2);
        position: fixed;
    }
    .content{
        margin-top: 50px;
        padding: 15px;
        left: 200px;
        right: 0;
        position: absolute;
        z-index: -1;
    }
}

//修改element-ui默认样式
.el-menu {
    border-right: none;
    overflow: hidden;
}
.el-menu-vertical-demo, a{
    color: #E8E8E8;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>