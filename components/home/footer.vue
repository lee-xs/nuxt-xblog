<template>
    <div id="footer-container" class="animated fadeInUp">
        <div id="footer-content">
            <p>Copyright ©  <span v-text="siteInfo.site.siteName + '博客'">XIN博客</span> 版权所有 <span class="hidden-md-and-down">网站已运行 <span v-text="time"></span></span></p>
            <a target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" id="upyun">本网站由 <img src="https://upyun.aleestar.cn/upyun_logo.png"/> 提供CDN加速/云存储服务</a>
            <p><a target="_blank" href="https://beian.miit.gov.cn" v-text="siteInfo.site.icp"></a></p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            siteInfo: this.$store.state.siteInfo,
            time: '',
        }
    },
    methods:{
        runTime(){
            if(process.browser){
                window.setTimeout(this.runTime, 1000);
                let seconds = 1000;
                let minutes = seconds * 60;
                let hours = minutes * 60;
                let days = hours * 24;
                let years = days * 365;
                let today = new Date();
                let todayYear = today.getFullYear();
                let todayMonth = today.getMonth() + 1;
                let todayDate = today.getDate();
                let todayHour = today.getHours();
                let todayMinute = today.getMinutes();
                let todaySecond = today.getSeconds();
                
                let start = new Date(this.siteInfo.site.run)
                let t1 = Date.UTC(start.getFullYear(), start.getMonth()+1, start.getDate())
                let t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond)
                let diff = t2-t1
                
                let diffYears = Math.floor(diff/years)
                let diffDays = Math.floor((diff/days)-diffYears*365)
                let diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours)
                let diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes)
                let diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds)
                let dhms = diffDays+"天"+diffHours+"时"+diffMinutes+"分"+diffSeconds+"秒"
                this.time = diffYears==0?dhms:diffYears+"年"+dhms
            }
        }
    },
    created(){
        this.runTime()
    }
}
</script>

<style lang="scss">
#footer-container{
    width: 100%;
    text-align: center;
    line-height: 25px;
    padding: 20px;
    //background: #555555;
    background: #FFFFFF;
    #footer-content{
        font-size: 13px;
        color: #999999;
        #upyun{
            color: #999999;
            img{
                filter:brightness(55%); 
                width: 50px; 
                height: 100%; 
                display: inline-block; 
                vertical-align: middle;
            }
        }
        a{
            color: #999999;
        }
    }
}

</style>
