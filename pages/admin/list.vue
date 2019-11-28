<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="已发布" name="first" style="text-align:center;">
            <el-table :data="articleList" border stripe style="width: 100%">
                <el-table-column prop="id" label="Id" width="50"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="author" label="作者" width="65"></el-table-column>
                <el-table-column label="访问量" width="65">
                    <template slot-scope="scope">
                        <el-tag type="success" v-text="scope.row.views"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="点赞量" width="65">
                    <template slot-scope="scope">
                        <el-tag type="warning" v-text="scope.row.likes"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="评论量" width="65">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-text="scope.row.comments"></el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="state" label="状态" width="60">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column> -->
                <el-table-column label="开启评论" width="80">
                    <template slot-scope="scope">
                        <Switch v-model="scope.row.allowComment" />
                        <!-- <el-switch v-model="value" disabled active-color="#13ce66" inactive-color="#ff4949"></el-switch> -->
                    </template>
                </el-table-column>
                <el-table-column prop="publishTime" label="发布时间" width="200"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="second">
            
        </el-tab-pane>
        <el-tab-pane label="回收站" name="third">
            
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { getPageArticle } from '~/api/article'
export default {
    layout: 'admin_template',
    data(){
        return{
            activeName: 'first',
            value: 0,
        }
    },
    head(){
        return{
            title: `【XIN-BLOG】文章列表`,
        }
    },
    async asyncData(){
        let articleListData = await getPageArticle(1,15)
        return {
            articleList: articleListData.data.records,
            articleListTotal: articleListData.data.total,
        }
    },
}
</script>

<style lang="scss" scoped>

</style>