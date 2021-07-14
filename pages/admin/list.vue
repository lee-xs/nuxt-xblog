<template>
  <el-tabs v-model="status" class="animated fadeInUp">
    <el-tab-pane v-loading="loading" label="已发布" name="1">
      <v-list-tab
        key="first"
        @moveRecycle="moveRecycle"
        :tabType="'first'"
        :list="postsList"
        :total="postsListTotal"
        @pageCode="handleCurrentChange"
      ></v-list-tab>
    </el-tab-pane>
    <el-tab-pane v-loading="loading" label="草稿箱" name="0">
      <v-list-tab
        key="second"
        @moveRecycle="moveRecycle"
        :tabType="'second'"
        :list="draftsList"
        :total="draftsListTotal"
        @pageCode="handleCurrentChange"
      ></v-list-tab>
    </el-tab-pane>
    <el-tab-pane v-loading="loading" label="回收站" name="2">
      <v-list-tab
        key="third"
        @removePosts="removePosts"
        :tabType="'third'"
        :list="recycleList"
        :total="recycleListTotal"
        @pageCode="handleCurrentChange"
      ></v-list-tab>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import VListTab from "~/components/admin/list-tab";
export default {
  layout: "admin_template",
  data() {
    return {
      loading: false,
      status: "1",
      value: 0,
      pageCode: 1,
      pageSize: 10,
    };
  },
  head() {
    return {
      title: `${this.$store.state.siteInfo.site.siteName} ♥ 文章列表`,
    };
  },
  components: {
    VListTab,
  },
  async asyncData({ app }) {
    try {
      let postsListData = await app.$api.selectPostsPage(1, 10, 1);
      let draftsListData = await app.$api.selectPostsPage(1, 10, 0);
      let recycleListData = await app.$api.selectPostsPage(1, 10, 2);
      return {
        //已发布的
        postsList: postsListData.data.records,
        postsListTotal: postsListData.data.total,
        //草稿箱内
        draftsList: draftsListData.data.records,
        draftsListTotal: draftsListData.data.total,
        //回收站内
        recycleList: recycleListData.data.records,
        recycleListTotal: recycleListData.data.total,
      };
    } catch (error) {
      return app.context.error({ statusCode: 500 });
    }
  },
  methods: {
    handleCurrentChange(data) {
      this.loading = true;
      this.pageCode = data;
      this.handlePostsPage(this.pageCode, this.status);
    },
    handlePostsPage(pageCode, status) {
      this.$api.selectPostsPage(pageCode, this.pageSize, status).then((res) => {
        switch (status) {
          case "0":
            this.draftsList = res.data.records;
            this.draftsListTotal = res.data.totall;
            break;
          case "1":
            this.postsList = res.data.records;
            this.postsListTotal = res.data.total;
            break;
          case "2":
            this.recycleList = res.data.records;
            this.recycleListTotal = res.data.total;
            break;
        }
        this.loading = false;
      });
    },
    //移除文章
    moveRecycle(id) {
      this.$api.movePosts(id).then((res) => {
        if (res.code == 20000) {
          this.$message({
            type: "success",
            message: res.message,
          });
        }

        //重载分页数据
        this.handlePostsPage(1, "0");
        this.handlePostsPage(1, "1");
        this.handlePostsPage(1, "2");
      });
    },
    //回收站彻底删除文章
    removePosts(id) {
      let ids = [];
      ids.push(id);
      this.$api.deletePosts(ids).then((res) => {
        if (res.code == 20000) {
          this.$message({
            type: "success",
            message: res.message,
          });
        }

        //重载草稿箱和回收站的分页数据
        this.handleCurrentChange(1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>