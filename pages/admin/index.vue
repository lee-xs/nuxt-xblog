<template>
  <div style="border:1px solid red; width:500px; height:500px;">
    ddd
  </div>
</template>

<script>
import { save, page, remove, change, changeState } from '~/api/menu'
export default {
    layout: 'admin_template',
    head(){
        return{
            title: `【XIN-BLOG】后台管理首页`,
        }
    },
    async asyncData(){
        let result = await page(1, 10)
        return {
            list: result.data.records,//分类列表
            total: result.data.total,//分类总数
        }
    },
}
</script>

<style>

</style>