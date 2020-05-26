<template>
    <div class="card-container animated fadeInUp">
        <p class="card-container-title"><b>关于本站</b></p>
        <div class="card-container-content">
            <p v-text="siteInfo.site.qq "></p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['siteInfo']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/common.scss';

</style>