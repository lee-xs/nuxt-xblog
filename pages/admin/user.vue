<template>
  <div class="animated fadeInUp">
    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column
        prop="visitTime"
        label="首次访问"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="lastVisitTime"
        label="上次访问"
        width="180"
      ></el-table-column>
      <el-table-column prop="avatar" label="头像"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <Page
      style="margin: 10px; text-align: center"
      :total="total"
      :current="pageCode"
      :page-size="pageSize"
      @on-change="handleCurrentChange"
    ></Page>
  </div>
</template>

<script>
export default {
  layout: "admin_template",
  head() {
    return {
      title: `${this.$store.state.siteInfo.site.siteName} ♥ 用户管理`,
    };
  },
  data: () => ({
    loading: false,
    pageCode: 1,
    pageSize: 10,
  }),
  async asyncData({ app }) {
    try {
      let result = await app.$api.selectUserPage(1, 10);
      return {
        list: result.data.records,
        total: result.data.total,
      };
    } catch (error) {
      return app.context.error({ statusCode: 500 });
    }
  },
  methods: {
    handleCurrentChange(data) {
      this.loading = true;
      this.pageCode = data;
      this.$api.selectUserPage(this.pageCode, this.pageSize).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>