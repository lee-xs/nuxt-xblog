<template>
  <div>
    <el-table :data="list" border stripe style="width: 100%">
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

    <!-- 分页 -->
    <el-col :span="24" style="text-align:center; margin-top:20px;">
        <Page
        :total="total"
        :current="pageCode"
        :page-size="pageSize"
        @on-change="handleCurrentChange"></Page>
    </el-col>
  </div>
</template>

<script>
export default {
    props: ['list', 'total'],
    data(){
        return{
            loading: false,
            pageCode: 1,
            pageSize: 10,
        }
    },
    methods: {
        handleCurrentChange(pageCode){
            this.$emit('pageCode', pageCode)
        },
    },
}
</script>

<style>

</style>