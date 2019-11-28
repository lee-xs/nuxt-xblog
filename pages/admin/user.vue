<template>
  <div>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="visitTime" label="首次访问" width="180"></el-table-column>
        <el-table-column prop="lastVisitTime" label="上次访问" width="180"></el-table-column>
        <el-table-column prop="avatar" label="头像"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
  </div>
</template>

<script>
import { getUserPage } from '~/api/user'
 export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【XIN-BLOG】用户管理`,
        }
    },
    data: () => ({
      
    }),
    async asyncData(){
      let userData = await getUserPage(1, 15)
      return {
        userList: userData.data.records,
        userListSize: userData.data.total,
      }
    },
  }
</script>

<style>

</style>