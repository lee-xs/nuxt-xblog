<template>
  <el-row>
    <el-col :span="24">
        <el-table :data="list" border stripe style="width: 100%">
            <el-table-column align="center" prop="id" label="Id" width="50"></el-table-column>
            <el-table-column align="center" prop="title" label="标题"></el-table-column>
            <el-table-column align="center" prop="author" label="作者" width="65"></el-table-column>
            <el-table-column align="center" label="访问量" width="65">
                <template slot-scope="scope">
                    <el-tag type="success" v-text="scope.row.views"></el-tag>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="点赞量" width="65">
                <template slot-scope="scope">
                    <el-tag type="warning" v-text="scope.row.likes"></el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="评论量" width="65">
                <template slot-scope="scope">
                    <el-tag type="danger" v-text="scope.row.comments"></el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开启评论" width="80">
                <template slot-scope="scope">
                    <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.allowComment" @change="changeCommentState()" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="tabType == 'first'" prop="publishTime" label="发布时间" width="200"></el-table-column>
            <el-table-column align="center" v-if="tabType == 'second'" prop="createTime" label="创建时间" width="200"></el-table-column>
            <el-table-column align="center" v-if="tabType == 'third'" prop="editTime" label="修改时间" width="200"></el-table-column>
            <!-- tab 已发布 操作 -->
            <el-table-column align="center" width="200" v-if="tabType == 'first'" label="操作">
                <template slot-scope="scope">
                    <el-button size="medium" type="primary" @click="changePosts(scope.row)">编辑</el-button>
                    <el-button size="medium" type="danger" @click="moveRecycle(scope.row.id)">回收站</el-button>
                </template>
            </el-table-column>
            <!-- tab 草稿箱 操作 -->
            <el-table-column align="center" width="200" v-if="tabType == 'second'" label="操作">
                <template slot-scope="scope">
                    <el-button size="medium" type="primary" @click="changePosts(scope.row)">编辑</el-button>
                    <el-button size="medium" type="danger" @click="moveRecycle(scope.row.id)">回收站</el-button>
                </template>
            </el-table-column>
            <!-- tab 回收站 操作 -->
            <el-table-column align="center" width="200" v-if="tabType == 'third'" label="操作">
                <template slot-scope="scope">
                    <el-button size="medium" type="primary" @click="changePosts(scope.row)">编辑</el-button>
                    <el-button size="medium" type="danger" @click="removePosts(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-col>

    <!-- 分页 -->
    <el-col :span="24" style="text-align:center; margin-top:20px;">
        <Page
        :total="total"
        :current="pageCode"
        :page-size="pageSize"
        @on-change="handleCurrentChange"></Page>
    </el-col>
  </el-row>
</template>

<script>
export default {
    props: ['tabType', 'list', 'total'],
    data(){
        return{
            pageCode: 1,
            pageSize: 10,
        }
    },
    methods: {
        handleCurrentChange(pageCode){
            this.$emit('pageCode', pageCode)
        },
        //修改文章
        changePosts(row){
            this.$store.commit('SET_COMPILEPOSTS', row);
            this.$router.push('/admin/issue');
        },
        //移送文章至回收站
        moveRecycle(id){
            this.$emit('moveRecycle', id)
        },
        //删除文章
        removePosts(id){
            this.$emit('removePosts', id)
        },
        //修改评论状态
        changeCommentState(){

        },
    },
}
</script>

<style>

</style>