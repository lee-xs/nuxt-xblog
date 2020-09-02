<template>
    <div id="comment"></div>
</template>

<script>
import emojiMap from '~/assets/js/emoji.json'
export default {
    created(){
        if(process.browser){
            const Valine = require('valine');
            this.$nextTick(() => {
                new Valine({
                    el: '#comment',
                    appId: 'OkGJkNV0NdThq8zYrwpLghgS-gzGzoHsz',
                    appKey: '5E1jEggFxdxshNMUPd9p1VGx',
                    path: window.location.href,
                    requiredFields: ['nick','mail'],
                    visitor: true, // 阅读量统计
                    placeholder: '你想说点什么呢，赶快写下来吧！',
                    avatar: 'retro',
                    recordIP: true, //保留评论者IP,
                    enableQQ: true,
                    emojiMaps: emojiMap
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#comment{
    background-color: #fff; 
    margin-top:10px; 
    padding:10px; 
    border-radius:5px;
}

//隐藏valine底部信息
/deep/ .vpower{
  display: none;
}
</style>