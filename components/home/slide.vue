<template>
    <div class="slide-container animated fadeInUp">
        <!-- <el-carousel trigger="click" height="315px" :interval="6000">
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
        </el-carousel> -->
        <div v-swiper:mySwiper="swiperOption" class="swiperWrap">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in slideList" :key="index">
                    <el-link v-if="item.url != ''" :href="item.url" :underline="false" style="width: 100%; display: block;">
                        <div style="width: 100%; height: 100%;">
                            <img :src="item.cover">
                            <div v-text="item.title" class="title"></div>
                        </div>
                    </el-link>
                    <nuxt-link v-else :to="'/'+item.articleId + '.html'" style="width: 100%; display: block;">
                        <div style="width: 100%; height: 100%;">
                            <img :src="item.cover">
                            <div v-text="item.title" class="title"></div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:['slideList'],
    data: () => ({
        swiperOption: {
            loop: true,
            //滚动切换的步数
            //speed: 3000, 
            //自动轮播间隔时间
            autoplay:{
                delay: 6000
            },
            effect: "coverflow",
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                //dynamicBullets: true,
                clickable :true,
            },
        }
    })
}
</script>

<style lang="scss" scoped>
.slide-container{
    box-shadow: 0 1px 3px rgba(26,26,26,.3);
    overflow: hidden;
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
    .swiper-slide{
        width: 100%;
        overflow: hidden;
    }
}
@media (min-width:1200px) {
    .slide-container{
        margin-bottom:14px;
        height: 315px;
        img{
            height: 315px;
        }
    }
}
@media (max-width:768px) {
    .slide-container{
        height: 240px;
        img{
            height: 240px;
        }
    }
}
</style>