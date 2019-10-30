<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
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
            
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '10px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem v-text="$route.path"></BreadcrumbItem>
                        <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
                    </Breadcrumb>
                    <Card>
                        <nuxt/>
                    </Card>
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
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.layout{
    a{
        color: rgba(255,255,255,.7);
    }
}
.layout-con{
    height: 100%;
    width: 100%;
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