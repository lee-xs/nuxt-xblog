<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
                <Menu v-for="(item,index) in navs" :key="index" theme="dark" width="auto" :class="menuitemClasses">
                    <Submenu :name="item.name" v-if="item.child">
                        <template slot="title">
                            <Icon :type="item.type"></Icon>
                            <span v-text="item.title"></span>
                        </template>
                        <MenuItem :name="item.name" v-for="(child,index) in item.child" :key="index">
                            <nuxt-link :to="'/admin/' + child.name">
                                <Icon :type="child.type"></Icon>
                                <span v-text="child.title" style="margin-left:10px;"></span>
                            </nuxt-link>
                        </MenuItem>
                    </Submenu>
                    <MenuItem :name="item.name" v-else>
                        <nuxt-link :to="'/admin/' + item.name">
                            <Icon :type="item.type"></Icon>
                            <span v-text="item.title" style="margin-left:10px;"></span>
                        </nuxt-link>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout :style="{marginLeft: isCollapsed?'78px':'200px'}">
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <nuxt/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false,
                navs: [
                    {name: '', title: '首页', type: 'ios-navigate'},
                    {name: 'article', title: '文章管理' , type: 'ios-copy-outline', child: [
                        {name: 'issue', title: '发布文章', type: 'ios-create'},
                        {name: 'box', title: '草稿/回收', type: 'md-folder-open'},
                    ]},
                    {name: 'message', title: '留言板', type: 'ios-navigate'},
                    {name: 'links', title: '友情链接', type: 'ios-navigate'},
                    {name: 'about', title: '关于', type: 'ios-navigate'},
                ],
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
    }
</script>

<style lang="scss" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    a{
        color: rgba(255,255,255,.7);
    }
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>