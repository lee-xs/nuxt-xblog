<template>
    <div style="box-shadow: 0 0px 3px rgba(26, 26, 26, 0.3); padding:15px; background-color:#fff;" class="animated fadeInUp">
        <el-form class="form" :model="site" label-position="top" label-width="80px" style="margin:0 auto;">
            <el-divider><h3>基础信息</h3></el-divider>
            <el-form-item label="站点名：">
                <el-input v-model="site.siteName"></el-input>
            </el-form-item>
            <el-form-item label="站点地址：">
                <el-input v-model="site.siteUrl"></el-input>
            </el-form-item>
            <el-form-item label="博主：">
                <el-input v-model="site.owner"></el-input>
            </el-form-item>
            <el-form-item label="访客：">
                <el-input v-model="site.visit" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Logo：">
                <el-input v-model="site.logo" style="width:80%;"></el-input>
                <el-button type="primary" plain @click="handleLogoImage()" style="width:18%;">选择</el-button>
                <img :src="site.logo" style="width:100%; margin-top:20px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
            </el-form-item>
            <el-form-item label="脸面：">
                <el-input v-model="site.face" style="width:80%;"></el-input>
                <el-button type="primary" plain @click="handleFaceImage()" style="width:18%;">选择</el-button>
                <img :src="site.face" style="width:100%; margin-top:20px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
            </el-form-item>   
            <el-form-item label="关于站点：">
                <el-input v-model="site.about"></el-input>
            </el-form-item>  
            <el-form-item label="ICP备案号：">
                <el-input v-model="site.icp"></el-input>
            </el-form-item>  
            <el-form-item label="运行时间：">
                <el-input v-model="site.run"></el-input>
            </el-form-item>  
            <el-form-item label="文章总数：">
                <el-input v-model="site.articles" :disabled="true"></el-input>
            </el-form-item>  
            <el-form-item label="留言总数：">
                <el-input v-model="site.leaveWords" :disabled="true"></el-input>
            </el-form-item>  
            <el-form-item label="github：">
                <el-input v-model="site.github"></el-input>
            </el-form-item>
            <el-form-item label="gitee：">
                <el-input v-model="site.gitee"></el-input>
            </el-form-item>
            <el-form-item label="qq：">
                <el-input v-model="site.qq"></el-input>
            </el-form-item> 
            <el-form-item label="qqCode：">
                <el-input v-model="site.qqCode" style="width:80%;"></el-input>
                <el-button type="primary" plain @click="handleQqCodeImage()" style="width:18%;">选择</el-button>
                <img :src="site.qqCode" style="width:100%; margin-top:20px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
            </el-form-item>
            <el-form-item label="wechatCode：">
                <el-input v-model="site.wechatCode" style="width:80%;"></el-input>
                <el-button type="primary" plain @click="handleWechatCodeImage()" style="width:18%;">选择</el-button>
                <img :src="site.wechatCode" style="width:100%; margin-top:20px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
            </el-form-item> 

            <div style="margin-top:30px; width: 500px; margin: auto;">
                <el-button type="primary" plain style="width:100%" @click="handleChangeSiteInfo()">保存站点信息</el-button>
            </div>
        </el-form>
        
        <el-form class="form" :model="admin" label-position="top" label-width="80px" style="margin:0 auto;">
            <!-- 站长信息 -->
            <el-divider><h3>站长信息</h3></el-divider>
            <el-form-item label="用户名：">
                <el-input v-model="admin.username"></el-input>
            </el-form-item>
            <el-form-item label="昵称：">
                <el-input v-model="admin.nickname"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
                <el-input v-model="admin.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
                <el-input v-model="admin.email"></el-input>
            </el-form-item>
            <el-form-item label="头像：">
                <el-input v-model="admin.avatar" style="width:80%;"></el-input>
                <el-button type="primary" plain @click="handleWechatCodeImage()" style="width:18%;">选择</el-button>
                <img :src="admin.avatar" style="width:100%; margin-top:20px; padding: 4px; background-color:#ddd; border-radius:4px; border:1px solid #ddd"/>
            </el-form-item> 

            <div style="margin-top:30px; width: 500px; margin: auto;">
                <el-button type="primary" plain style="width:100%" @click="handleChangeAdmin()">保存管理员信息</el-button>
            </div>
        </el-form>

        <!-- 图片列表 -->
        <el-dialog style="width: 80%; height: 80%; margin: auto;" title="图集" :visible.sync="dialogImage" :fullscreen="true" :append-to-body='true'>
            <v-image-dialog @handleCurrentChange="handleCurrentChange" @handleImageUrl="handleImageUrl" :imageTotal="imageTotal" :imageList="imageList" :pageCode="pageCode"></v-image-dialog>
        </el-dialog>
    </div>
</template>

<script>
import VImageDialog from '~/components/admin/image-dialog'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `${this.$store.state.siteInfo.site.siteName} ♥ 站点信息管理`,
        }
    },
    async asyncData({ app }){
        let siteData = await app.$api.selectSiteInfo()
        let imageData = await app.$api.selectImagePage(1,12)
        return{
            site: siteData.data.site,
            admin: siteData.data.admin,
            imageList: imageData.data.records,//分页图片集合
            imageTotal: imageData.data.total,//图片总数
        }
    },
    data(){
        return{
            dialogImage: false,
            pageCode: 1,
            pageSize: 12,
            changeImageType: '',
        }
    },
    methods:{
        //发送获取图片列表请求
        handleImageList(){
            this.$api.selectImagePage(this.pageCode, this.pageSize).then(res => {
                this.imageList = res.data.records
                this.imageTotal= res.data.total
            })
        },
        //发送保存站点信息请求
        handleChangeSiteInfo(){
            this.$api.updateSite(this.site).then(res => {
                this.commonAfterHandle(res)
            })
        },
        //发送保存管理员信息
        handleChangeAdmin(){
            this.$api.updateAdmin(this.admin).then(res => {
                this.commonAfterHandle(res)
            })
        },
        handleLogoImage(){
            this.dialogImage = true
            this.changeImageType = 'logo'
        },
        handleFaceImage(){
            this.dialogImage = true
            this.changeImageType = 'face'
        },
        handleQqCodeImage(){
            this.dialogImage = true
            this.changeImageType = 'qqCode'
        },
        handleWechatCodeImage(){
            this.dialogImage = true
            this.changeImageType = 'wechatCode'
        },
        //接收子组件传来的更改的页码
        handleCurrentChange(data){
            this.pageCode = data
            this.handleImageList()
        },
        //接收子组件传来的imageUrl
        handleImageUrl(data){
            switch(this.changeImageType){
                case 'logo':
                    this.site.logo = data
                    break;
                case 'face':
                    this.site.face = data
                    break;
                case 'qqCode':
                    this.site.qqCode = data
                    break;
                case 'wechatCode':
                    this.site.wechatCode = data
                    break;
            }
            this.changeImageType = ''
            this.dialogImage = false
        },
        //公共后置处理方法
        commonAfterHandle(res){
            if(res.code == 20000){
                this.$message({
                    type: 'success',
                    message: res.message
                })
            }
        }
    },
    components:{
        VImageDialog,
    }
}
</script>

<style lang="scss" scoped>
//修改element form默认样式
.el-form-item{
    width: 500px;
    margin: auto !important;
}
</style>