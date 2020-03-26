<template>
  <div style="width: 250px; height: 100px; margin:260px auto; text-align:center;" v-loading="loading">
      <el-input style="margin-bottom: 15px;" placeholder="用户名" v-model="username" clearable></el-input>
      <el-input style="margin-bottom: 15px;" placeholder="密码" v-model="password" show-password clearable></el-input>
      <el-button @click="handleLogin()" type="primary" icon="el-icon-arrow-right" circle></el-button>
  </div>
</template>

<script>
import { login } from '~/api/login'
import { setToken } from '~/service/auth'
export default {
    layout: 'login_template',
    head(){
        return{
            title: `【XIN-BLOG】后台登录`,
        }
    },
    data: () => ({
        loading: false,
        username: '',
        password: '',
    }),
    methods: {
        handleLogin(){
            this.loading = true
            if(this.username == '' || this.password == ''){
                this.loading = false
                this.$message.error("用户名或密码不能为空")
                return;
            }

            login(this.username, this.password).then(res => {
                this.loading = false
                if(res.code == 20000){
                    setToken(res.data.token)
                    this.$store.commit('SET_TOKEN', res.data.token)
                    this.$router.push('/admin')
                }
            })
        }
    }
}
</script>

<style>

</style>