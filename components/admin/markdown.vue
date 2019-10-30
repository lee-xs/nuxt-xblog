<template>
  <div ref="editorElem"></div>
</template>

<script>
import config from "@/service/config";
export default {
  data() {
    return {
      editor: null,
      editorContent: "",
      requestImageUrl: config.baseURL,
      uploadUrl: config.baseURL + "/upload"
    };
  },
  mounted() {
    if(process.browser){
      const _this = this;
      var wangeditor = require('wangeditor')
      _this.editor = new wangeditor(this.$refs.editorElem); //创建编辑器实例
      _this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        this.catchData(this.editorContent); //把这个html通过catchData的方法传入父组件
      };

      _this.editor.customConfig.uploadImgServer = _this.uploadUrl; //上传图片的接口
      _this.editor.customConfig.uploadFileName = "file"; //自定义的文件名
      //上传图片相关的处理方法
      _this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          //return {
          // prevent: true,
          //  msg: '放弃上传'
          // }
        },
        success: function(xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          //this.imgUrl = Object.values(result.data).toString()
        },
        error: function(xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          // console.log(result.data)
        },
        timeout: function(xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        customInsert: function(insertImg, result, editor) {
          insertImg(_this.requestImageUrl + result.data.src);
        }
      };
      _this.editor.create();
    }
  }
};
</script>