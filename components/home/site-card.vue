<template>
    <el-row class="animated fadeInUp">
        <el-col :span="24" class="card-container-site">
          <p class="site-title">网站概况</p>
          <div class="site-img">
            <img :src="siteInfo.site.face" />
          </div>
          <table class="site-details">
           <tbody>
              <tr>
                <td>文章总数：</td>
                <td v-text="siteInfo.articleCount + ' 篇'">0</td>
              </tr>
              <tr class="gray">
                <td>留言数量：</td>
                <td>0 条</td>
              </tr>
              <tr>
                <td>友情链接：</td>
                <td v-text="siteInfo.linksCount + ' 个'">0</td>
              </tr>
              <tr class="gray">
                <td>浏览总量：</td>
                <td v-text="siteInfo.visitCount + ' 次'">0</td>
              </tr>
              <tr>
                <td>访客数量：</td>
                <td v-text="siteInfo.userCount + ' 人'">0</td>
              </tr>
           </tbody>
          </table>
        </el-col>
    </el-row>
</template>

<script>
export default {
  props:['siteInfo']
};
</script>

<style lang="scss" scoped>
.card-container-site{
    font-size: 13px;
    background: #fff;
    width: 100%;
    //box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    margin-bottom: 10px;
}
.site-title{
    font-size: 18px;
    margin: 10px;
}
.card-container-site{
    .site-img{
        width: 100%;
        height: 200px;
        img{
            width: 100%;
            height: 200px;
        }
    }
    .site-details{
        width: 100%;
        border-collapse:collapse;
        font-size: 12px;
        td{
            border:1px solid #EDEDED;
            text-align: center;
            padding: 13px 0;
            width: 50%;
        }
        .gray{
            background: #FAFAFA;
        }
    }
}
.card-container-site::before{
    content: '';
    height: 0;
    width: 0;
    display: block;
    border: 8px transparent solid;
    border-bottom-width: 0;
    border-left-width: 0;
    border-top-color: #e1244e;
    float: left;
}

</style>