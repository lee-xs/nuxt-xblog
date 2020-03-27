<template>
    <el-row class="animated bounceInRight">
        <el-col :span="24" class="card-container-site">
          <p class="site-title"><b>网站概况</b></p>
          <div class="site-img">
            <img :src="siteInfo.site.face" />
          </div>
          <table class="site-details">
           <tbody>
              <tr>
                <td>文章总数：</td>
                <td v-text="siteInfo.articleCount">0</td>
              </tr>
              <tr class="gray">
                <td>留言数量：</td>
                <td>0</td>
              </tr>
              <tr>
                <td>友情链接：</td>
                <td>0</td>
              </tr>
              <tr class="gray">
                <td>浏览总量：</td>
                <td v-text="siteInfo.visitCount">0</td>
              </tr>
              <tr>
                <td>访客数量：</td>
                <td v-text="siteInfo.userCount">0</td>
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
    box-shadow: 0 1px 3px rgba(26,26,26,.3);
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