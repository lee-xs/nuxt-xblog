<template>
    <div class="slide-container animated fadeInUp">
        <el-carousel trigger="click" height="315px" :interval="6000">
            <el-carousel-item v-for="(item,index) in slideList" :key="index">
                <el-link v-if="item.url != ''" :href="item.url" :underline="false" style="width: 100%; display: block;">
                    <div style="width: 100%; height: 315px;">
                        <img :src="item.cover">
                        <div v-text="item.title" class="title"></div>
                    </div>
                </el-link>
                <nuxt-link v-else :to="'/'+item.articleId + '.html'" style="width: 100%; display: block;">
                    <div style="width: 100%; height: 315px;">
                        <img :src="item.cover">
                        <div v-text="item.title" class="title"></div>
                    </div>
                </nuxt-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props:['slideList']
}
</script>

<style lang="scss" scoped>
.slide-container{
    box-shadow: 0 1px 3px rgba(26,26,26,.3);
    img{
        width: 100%;
        height: 100%;
    }
    .title{
        background-color: #c40000; 
        position: absolute; 
        top:0; 
        left:0; 
        font-size:14px; 
        color: #ffffff; 
        padding: 5px 10px;
    }
}
@media (min-width:1200px) {
    .slide-container{
        margin-bottom:14px; 
    }
}
</style>