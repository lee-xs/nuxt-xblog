<template>
    <div class="footer-container">
        <div class="footer-content">
            <p>Copyright ©  XIN博客 版权所有 网站已运行 <span v-text="time"></span></p>
            <p>赣公网安备36042102000137</p>
            <p>赣ICP备17002430号</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
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
                
                let t1 = Date.UTC(2019,4,8,16)
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
.footer-container{
    position: relative;
    width: 100%;
    top: 85px;
    text-align: center;
    line-height: 20px;
    padding: 20px;
    background: #555555;
    .footer-content{
        color: #F0F8FF;
    }
}
</style>
