<template>
    <div class="slide-container animated fadeInUp">
        <!-- <el-carousel trigger="click" height="315px" :interval="6000">
            <el-carousel-item v-for="(item,index) in slideList" :key="index">
                <el-link v-if="item.url != ''" :href="item.url" :underline="false" style="width: 100%; display: block;">
                    <div style="width: 100%; height: 315px;">
                        <el-image class="el-image" :src="item.cover">
                            <div slot="placeholder" class="image-slot">
                                <img :src="loadingImg" class="loading-img">
                            </div>
                        </el-image>
                        <div v-text="item.title" class="title"></div>
                    </div>
                </el-link>
                <nuxt-link v-else :to="'/'+item.postsId + '.html'" style="width: 100%; display: block;">
                    <div style="width: 100%; height: 315px;">
                        <el-image class="el-image" :src="item.cover">
                            <div slot="placeholder" class="image-slot">
                                <img :src="loadingImg" class="loading-img">
                            </div>
                        </el-image>
                        <div v-text="item.title" class="title"></div>
                    </div>
                </nuxt-link>
            </el-carousel-item>
        </el-carousel> -->

        <!-- <Carousel  loop :autoplay="true" autoplay-speed="1000">
            <CarouselItem v-for="(item, index) in slideList" :key="index">
                <div style="width: 100%; height: 315px;">
                    <el-image class="el-image" :src="item.cover">
                        <div slot="placeholder" class="image-slot">
                            <img :src="loadingImg" class="loading-img">
                        </div>
                    </el-image>
                    <div v-text="item.title" class="title"></div>
                </div>
            </CarouselItem>
        </Carousel> -->

        <div v-swiper:mySwiper="swiperOption" class="swiperWrap">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in slideList" :key="index">
                    <el-link v-if="item.url != ''" :href="item.url" :underline="false" style="width: 100%; display: block;">
                        <div style="width: 100%; height: 100%;">
                            <el-image class="el-image" :src="item.cover" @load="handleLoadingImgVisible()">
                                <div slot="placeholder" class="image-slot" v-if="loadingImgVisible">
                                    <img :src="loadingImg" class="loading-img">
                                </div>
                            </el-image>
                            <div v-text="item.title" class="title"></div>
                        </div>
                    </el-link>
                    <nuxt-link v-else :to="'/'+item.postsId + '.html'" style="width: 100%; display: block;">
                        <div style="width: 100%; height: 100%;">
                            <el-image class="el-image" :src="item.cover" @load="handleLoadingImgVisible()">
                                <div slot="placeholder" class="image-slot" v-if="loadingImgVisible">
                                    <img :src="loadingImg" class="loading-img">
                                </div>
                            </el-image>
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
import { stripe } from 'static/loading.json'
export default {
    props:['slideList'],
    data: () => ({
        loadingImg: stripe,
        loadingImgVisible: true,
        swiperOption: {
            loop: true,
            loopedSlides: 1,
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
            }
        }
    }),
    methods: {
        handleLoadingImgVisible(){
            this.loadingImgVisible = false
            this.loadingImg = null
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-container{
    box-shadow: 0 1px 3px rgba(26,26,26,.3);
    overflow: hidden;
    .el-image{
        width: 100%;
        height: 100%;
        .image-slot{
            width: 100%;
            height: 100%;
            background-color: #fefac7;
            display: flex;
            align-items: center;
            .loading-img{
                margin: auto;
            }
        }
    }
    // img{
    //     width: 100%;
    //     height: 100%;
        
    // }
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
        .el-image{
            height: 315px;
        }
        // img{
        //     height: 315px;
        // }
    }
}
@media (max-width:768px) {
    .slide-container{
        height: 240px;
        .el-image{
            height: 240px;
        }
        // img{
        //     height: 240px;
        // }
    }
}
</style>