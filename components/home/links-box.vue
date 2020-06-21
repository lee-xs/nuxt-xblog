<template>
    <el-row>
        <el-col :span="4" v-for="(links, index) in linksList" :key="index" class="animated fadeInUp"  style="margin:0 17px;" >
            <a :href="links.url" target="_blank">
                <div class="our-team hvr-glow">
                    <div class="pic">
                        <img :src="links.logo">
                    </div>
                    <div class="team-content">
                    <h3 class="title" v-text="links.name"></h3>
                    </div>
                </div>
            </a>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props:['linksList']
}
</script>

<style lang="scss" scoped>

.our-team {
    width: 100%;
    height: 180px;
    margin: 20px auto;
    padding-top: 20px;
    text-align: center;
    overflow: hidden;
    position: relative;
    border: 1px solid #dee1e6;
    background-color:#FFFFFF;
    border-radius: 10%;
}

#box span a {
    text-decoration: none;
}

#box span a:hover .title {
    color: #EE2C2C;
}

.our-team .pic {
    display: inline-block;
    width: 100px;
    height: 100px;
    z-index: 1;
    position: relative;
}

.our-team .pic:before {
    content: "";
    width: 100%;
    height: 0;
    border-radius: 50%;
    background: #ee4266;
    position: absolute;
    bottom: 135%;
    right: 0;
    left: 0;
    opacity: 0.2;
    transform: scale(3);
    transition: all 0.3s linear 0s;
}

.our-team:hover .pic:before {
    height: 100%;
}

.our-team .pic:after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ee4266;
    top: 0;
    left: 0;
    z-index: -1;
}

.our-team .pic img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    transform: scale(1);
    transition: all 0.9s ease 0s;
}

.our-team:hover .pic img {
    box-shadow: 0 0 0 14px #f7f5ec;
    transform: scale(0.7);
}

.our-team .title {
    font-size: 15px;
    color: #000000;
    letter-spacing: 1px;
}
</style>