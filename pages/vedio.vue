<template>
    <el-row id="container">
        <el-col :span="24" style="height: 600px; padding: 20px; margin-bottom:30px; background: white; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); border-radius: 2px;">
            <iframe id="iframe" allowfullscreen="true" :src="iframeUrl"></iframe>
        </el-col>
        <el-col>
            <el-form label-width="80px">
                <el-form-item label="播放接口">
                    <el-select v-model="prefixUrl"  style="width:100%;">
                        <el-option v-for="item in analysis" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="播放地址">
                     <el-input type="text" v-model="vedioUrl"></el-input>
                </el-form-item>
                <el-button  style="width:100%;" type="primary" @click="handleParseUrl()">点接开始解析</el-button>
            </el-form>      
        </el-col>
    </el-row>
</template>

<script>
export default {
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 免费看剧`,
        }
    },
    data: () => ({
        prefixUrl: 'https://8090.ylybz.cn/jiexi2019/?url=',
        vedioUrl: '',
        iframeUrl: '',
        analysis: [
            {
                label: '【1】通用vip引擎系统【全网解析】',
                value: 'https://8090.ylybz.cn/jiexi2019/?url=',
            },
            {
                label: '【2】通用vip引擎系统【全网解析】',
                value: 'http://jx.du2.cc/?url=',
            },
            {
                label: '【3】通用vip引擎系统【全网解析】',
                value: 'http://jx.598110.com/?url=',
            },
            {
                label: '【4】通用vip引擎系统【全网解析】',
                value: 'http://jx.618ge.com/?url=',
            },
            {
                label: '【5】通用vip引擎系统【全网解析】',
                value: 'http://vip.jlsprh.com/?url=',
            },
            {
                label: '【6】通用vip引擎系统【全网解析】',
                value: 'http://jx.drgxj.com/?url=',
            },
            {
                label: '【7】通用vip引擎系统【全网解析】',
                value: 'http://jx.598110.com/?url=',
            },
        ]
    }),
    methods: {
        handleParseUrl(){
           if(this.vedioUrl == "" || this.vedioUrl == null){
               this.$message.error('播放地址不能为空')
               return
           }
            this.iframeUrl = this.prefixUrl + this.vedioUrl
        },

    }
}
</script>

<style lang="scss" scoped>
#container{
    width: 1000px;
    margin: 0 auto;
    padding: 10px 0;
    #iframe{
        width: 100%;
        height: 100%;
        background: black;
    }
}
</style>