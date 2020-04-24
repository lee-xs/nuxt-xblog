import { upload } from "../api/image"
import { login } from "../api/login"

export default ({ app: { $request, $axios }}, inject) => {
    inject('api', {
        
        //#################### admin相关 ####################
        //清除redis中的全部缓存
        deleteRedisAll(){
            return $request.get('/admin/redis')
        },

        //#################### 文章相关 ####################
        //发布文章
        insertArticle(article){
            return $request.post('/admin/article', article)
        },
        //移除到回收站
        deleteRecycle(id){
            return $request.delete(`/admin/article/recycle/${id}`)
        },
        //删除文章
        deleteArticle(ids){
            return $request.delete('/admin/article', ids)
        },
        //修改文章
        updateArticle(article){
            return $request.put('/admin/article', article)
        },
        //首页默认分页查询文章
        selectArticlePage(pageCode, pageSize){
            return $request.get('/article/page', {pageCode, pageSize})
        },
        //查询文章信息
        selectArticle(id){
            return $request.get(`/article/${id}`)
        },
        //根据标签查询文章列表
        selectArticlePageByTag(pageCode, pageSize, tagName){
            return $request.get('/article/tag', {pageCode, pageSize, tagName})
        },
        //根据分类查询文章列表
        selectArticlePageByCategory(pageCode, pageSize, name){
            return $request.get('/article/category', {pageCode, pageSize, name})
        },
        //查草稿箱
        selectDrafts(pageCode, pageSize){
            return $request.get('/article/drafts', {pageCode, pageSize})
        },
        //查回收站
        selectRecycle(pageCode, pageSize){
            return $request.get('/article/recycle', {pageCode, pageSize})
        },
        //最热文章列表
        selectHotList(){
            return $request.get('/article/hot')
        },
        //随机文章列表
        selectRandList(){
            return $request.get('/article/rand')
        },
        //归档
        selectArchives(){
            return $request.get('/article/archives')
        },
        

        //#################### 分类相关 ####################
        //新增分类
        insertCategory(name){
            return $request.post('/admin/category', name)
        },
        //删除分类
        deleteCategory(ids){
            return $request.delete('/admin/category', ids)
        },
        //更新分类
        updateCategry(category){
            return $request.put('/admin/category', category)
        },
        //查询所有分类信息
        selectCategoryAll(){
            return $request.get('/category/all')
        },
        //查询分类的分页
        selectCategoryPage(pageCode, pageSize){
            return $request.get('/category/page', {pageCode, pageSize})
        },

        //#################### 图片相关 ####################
        //查询图片分页
        selectImagePage(pageCode, pageSize){
            return $request.get('/image/page', {pageCode, pageSize})
        },
        //上传图片
        upload(file){
            return $request.post('/upload', file, {'Content-Type': 'multipart/form-data'})
        },

        //#################### 通知相关 ####################
        //新增通知
        insertNotice(notice){
            return $request.post('/admin/notice', notice)
        },
        //删除通知
        deleteNotice(id){
            return $request.delete(`/admin/notice/${id}`)
        },
        //更新通知
        updateNotice(notice){
            return $request.put('/admin/notice', notice)
        },
        //更新通知状态
        updateNoticeState(id, state){
            return $request.put(`/admin/notice/state/${id}/${state}`)
        },
        //查询通知
        selectNotice(){
            return $request.get('/notice')
        },
        //查询通知分页
        selectNoticePage(pageCode, pageSize){
            return $request.get('/notice/page', {pageCode, pageSize})
        },

        //#################### 友联相关 ####################
        //后台添加友链
        insertAddLinks(links){
            return $request.post('/admin/links/add', links)
        },
        //前台添加友链
        insertLinks(links){
            return $request.post('/links', links)
        },
        //删除友联
        deleteLinks(ids){
            return $request.delete('/admin/links', ids)
        },
        //修改友联
        updateLinks(links){
            return $request.put('/admin/links', links)
        },
        //修改友联状态
        updateLinksState(id, state){
            return $request.put(`/admin/links/state/${id}/${state}`)
        },
        //查询全部友联
        selectLinksAll(){
            return $request.get('/links')
        },
        //查询友联分页
        selectLinksPage(pageCode, pageSize){
            return $request.get('/links/page', {pageCode, pageSize})
        },

        //#################### 日志相关 ####################
        //查询日志分页
        selectLogPage(pageCode, pageSize){
            return $request.get('/log/page', {pageCode, pageSize})
        },

        //#################### 登陆相关 ####################
        //登陆
        login(username, password){
            return $axios({
                method: 'post',
                url: '/login',
                params: {
                    username,
                    password
                }
            })
            //return $request.post('/login', {username, password})
        },

        //#################### 菜单相关 ####################
        //新增菜单
        insertMenu(menu){
            return $request.post('/admin/menu', menu)
        },
        //删除菜单
        deleteMenu(id){
            return $request.put(`/admin/menu/${id}`)
        },
        //更新菜单信息
        updateMenu(menu){
            return $request.put('/admin/menu', menu)
        },
        //更新菜单可见状态
        updateMenuState(id, state){
            return $request.put(`/admin/menu/state/${id}/${state}`)
        },
        //查询全部菜单
        selectMenuAll(){
            return $request.get('/menu')
        },
        //查询菜单分页
        selectMenuPage(pageCode, pageSize){
            return $request.get('/menu/page', {pageCode, pageSize})
        },

        //#################### 站点相关 ####################
        //更新站点信息
        updateSite(site){
            return $request.put('/admin/site', site)
        },
        //查询站点信息
        selectSite(){
            return $request.get('/site')
        },
        //查询站点信息
        selectSiteInfo(){
            return $request.get('/site/info')
        },

        //#################### 幻灯片相关 ####################
        //新增幻灯片
        insertSlide(slide){
            return $request.post('/admin/slide', slide)
        },
        //删除幻灯片
        deleteSlide(id){
            return $request.delete(`/admin/slide/${id}`)
        },
        //修改幻灯片
        updateSlide(slide){
            return $request.put('/admin/slide', slide)
        },
        //查询全部幻灯片
        selectSlideAll(){
            return $request.get('/slide')
        },

        //#################### 标签相关 ####################
        //新增标签
        insertTag(name){
            return $request.post('/admin/tag', name)
        },
        //删除标签
        deleteTag(ids){
            return $request.delete('/admin/tag', ids)
        },
        //更新标签信息
        updateTag(tag){
            return $request.put('/admin/tag', tag)
        },
        //查询全部标签
        selectTagAll(){
            return $request.get('/tag/all')
        },
        //查询标签分页
        selectTagPage(pageCode, pageSize){
            return $request.get('/tag/page', {pageCode, pageSize})
        },
        
        //#################### 用户相关 ####################
        //查询用户信息分页
        selectUserPage(pageCode, pageSize){
            return $request.get('/user/page', {pageCode, pageSize})
        },
    })
}
