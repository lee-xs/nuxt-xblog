<template>
    <div id="comment"></div>
</template>

<script>
import emojiMap from '~/assets/js/emoji.json'
export default {
    props: ['allowComment'],
    created(){
        if(process.browser){
            const Valine = require('valine');
            const that = this
            this.$nextTick(() => {
                new Valine({
                    el: '#comment',
                    appId: 'OkGJkNV0NdThq8zYrwpLghgS-gzGzoHsz',
                    appKey: '5E1jEggFxdxshNMUPd9p1VGx',
                    path: window.location.href,
                    requiredFields: ['nick','mail'],
                    visitor: true, // 阅读量统计
                    placeholder: this.allowComment == '0'? '该文章暂未开启评论！':'你想说点什么呢，赶快写下来吧！',
                    avatar: 'retro',
                    recordIP: true, //保留评论者IP,
                    enableQQ: true,
                    emojiMaps: emojiMap
                })

                if(this.allowComment == '0'){
                    const vrow = document.getElementsByClassName("vrow");
                    vrow[0].style.display = 'none'
                    vrow[1].style.display = 'none'
                }

                document.getElementsByClassName("vbtn")[0].addEventListener("click", function(){
                    if(!document.getElementById("veditor").value || !document.querySelector('input[type=email]').value || !document.querySelector('input[name=nick]').value || document.getElementsByClassName("status-bar")[0].innerText == "操作频繁，请稍候再试..."){
                        return;
                    }
                    that.$emit('handleComments')
                })
            })
        }
    },
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