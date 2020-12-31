export default ({ app: { $request, $axios }}, inject) => {
    inject('api', {
        
        //#################### admin相关 ####################
        //清除redis中的全部缓存
        deleteRedisAll(){
            return $request.get('/admin/redis')
        },
        //推送链接至百度收录
        baiduInclude(url){
            return $axios({
                url: '/admin/baidu',
                method: 'post',
                params: {
                    url
                }
            })
        },
        visit(ip){
            return $axios({
                url: `/user/i/visit/${ip}`,
                method: 'post',
            })
        },
 
        //#################### 文章相关 ####################
        //发布文章
        insertPosts(posts){
            return $request.post('/admin/posts/i', posts)
        },
        //点赞
        addLikes(postsId, ip){
            return $axios({
                url: `/posts/i/likes/${postsId}/${ip}`,
                method: 'put'
            })
        },
        //查看
        addViews(postsId, title, ip){
            return $axios({
                url: `/posts/i/views/${postsId}/${title}/${ip}`,
                method: 'post',
            })
        },
        updateComments(id){
            return $request.put(`/article/comments/${id}`)
        },
        //移除到回收站
        movePosts(id){
            return $request.put(`/admin/posts/move/${id}`)
        },
        //删除文章
        deletePosts(ids){
            return $request.delete('/admin/posts/d', ids)
        },
        //修改文章
        updatePosts(posts){
            return $request.put('/admin/posts/u', posts)
        },
        //首页默认分页查询文章
        selectPostsPage(pageCode, pageSize, status){
            return $request.get('/posts/s/page', {pageCode, pageSize, status})
        },
        //查询文章信息
        selectPosts(id){
            return $request.get(`/posts/s/${id}`)
        },
        //根据标签查询文章列表
        selectPostsPageByTag(pageCode, pageSize, name){
            return $request.get('/posts/s/tag', {pageCode, pageSize, name})
        },
        //根据分类查询文章列表
        selectPostsPageByClassify(pageCode, pageSize, name){
            return $request.get('/posts/s/classify', {pageCode, pageSize, name})
        },
        //最热文章列表
        selectHotList(){
            return $request.get('/posts/s/hot')
        },
        //随机文章列表
        selectRandList(){
            return $request.get('/posts/s/rand')
        },
        //归档
        selectArchives(){
            return $request.get('/posts/s/archives')
        },
        //查看文章点赞数
        selectLikes(articleId){
            return $request.get(`/posts/s/likes/${articleId}`)
        },
        //文章搜索
        selectSearch(pageCode, pageSize, search){
            return $request.get('/posts/s/search', {pageCode, pageSize, search})
        },
                

        //#################### 分类相关 ####################
        //新增分类
        insertClassify(name){
            return $request.post(`/admin/classify/i/${name}`)
        },
        //删除分类
        deleteClassify(ids){
            return $request.delete('/admin/classify/d', ids)
        },
        //更新分类
        updateClassify(category){
            return $request.put('/admin/classify/u', category)
        },
        //查询所有分类信息
        selectClassifyList(){
            return $request.get('/classify/s/list')
        },
        //查询分类的分页
        selectClassifyPage(pageCode, pageSize){
            return $request.get('/classify/s/page', {pageCode, pageSize})
        },

        //#################### 图片相关 ####################
        //查询图片分页
        selectImagePage(pageCode, pageSize){
            return $request.get('/image/s/page', {pageCode, pageSize})
        },
        //上传图片
        upload(file){
            return $axios({
                url: '/admin/upload',
                method: 'post',
                data: file,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        deleteImage(id){
            return $request.delete(`/admin/image/d/${id}`)
        },

        //#################### 通知相关 ####################
        //新增通知
        insertNotice(notice){
            return $request.post('/admin/notice/i', notice)
        },
        //删除通知
        deleteNotice(id){
            return $request.delete(`/admin/notice/d/${id}`)
        },
        //更新通知
        updateNotice(notice){
            return $request.put('/admin/notice/u', notice)
        },
        //查询通知
        selectNotice(){
            return $request.get('/notice/s/list')
        },
        //查询通知分页
        selectNoticePage(pageCode, pageSize){
            return $request.get('/notice/s/page', {pageCode, pageSize})
        },

        //#################### 友联相关 ####################
        //后台添加友链
        insertLinks(links){
            return $request.post('/admin/links/i', links)
        },
        //前台添加友链
        applyLinks(links){
            return $request.post('/links/i/apply', links)
        },
        //删除友联
        deleteLinks(ids){
            return $request.delete('/admin/links/d', ids)
        },
        //修改友联
        updateLinks(links){
            return $request.put('/admin/links/u', links)
        },
    
        //修改友链排序上升
        updateLinksSortUp(links){
            return $request.put('/admin/links/u/sort/up', links)
        },
        //修改友链排序下降
        updateLinksSortNext(links){
            return $request.put('/admin/links/u/sort/next', links)
        },
        //查询全部友联
        selectLinksAll(){
            return $request.get('/links/s/list')
        },
        //查询友联分页
        selectLinksPage(pageCode, pageSize){
            return $request.get('/links/s/page', {pageCode, pageSize})
        },

        //#################### 日志相关 ####################
        //查询日志分页
        selectLogPage(pageCode, pageSize){
            return $request.get('/log/s/page', {pageCode, pageSize})
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
            return $request.post('/admin/menu/i', menu)
        },
        //删除菜单
        deleteMenu(id){
            return $request.delete(`/admin/menu/d/${id}`)
        },
        //更新菜单信息
        updateMenu(menu){
            return $request.put('/admin/menu/u', menu)
        },
        //修改目录排序上升
        updateMenuSortUp(menu){
            return $request.put('/admin/menu/u/sort/up', menu)
        },
        //修改目录排序下降
        updateMenuSortNext(menu){
            return $request.put('/admin/menu/u/sort/next', menu)
        },
        //查询全部菜单
        selectMenuAll(){
            return $request.get('/menu/s/list')
        },
        //查询菜单分页
        selectMenuPage(pageCode, pageSize){
            return $request.get('/menu/s/page', {pageCode, pageSize})
        },

        //#################### 站点相关 ####################
        //更新站点信息
        updateSite(site){
            return $request.put('/admin/site/u', site)
        },
        //查询站点信息
        selectSite(){
            return $request.get('/site/s/info')
        },
        //查询站点信息
        selectSiteInfo(){
            return $request.get('/site/s/siteInfo')
        },

        //#################### 幻灯片相关 ####################
        //新增幻灯片
        insertSlide(slide){
            return $request.post('/admin/slide/i', slide)
        },
        //删除幻灯片
        deleteSlide(id){
            return $request.delete(`/admin/slide/d/${id}`)
        },
        //修改幻灯片
        updateSlide(slide){
            return $request.put('/admin/slide/u', slide)
        },
        //修改幻灯片排序上升
        updateSlideSortUp(slide){
            return $request.put('/admin/slide/u/sort/up', slide)
        },
        //修改幻灯片排序下降
        updateSlideSortNext(slide){
            return $request.put('/admin/slide/u/sort/next', slide)
        },
        //查询全部幻灯片
        selectSlideList(){
            return $request.get('/slide/s/list')
        },

        //#################### 标签相关 ####################
        //新增标签
        insertTag(name){
            return $request.post(`/admin/tag/i/${name}`)
        },
        //删除标签
        deleteTag(ids){
            return $request.delete('/admin/tag/d', ids)
        },
        //更新标签信息
        updateTag(tag){
            return $request.put('/admin/tag/u', tag)
        },
        //查询全部标签
        selectTagList(){
            return $request.get('/tag/s/list')
        },
        //查询标签分页
        selectTagPage(pageCode, pageSize){
            return $request.get('/tag/s/page', {pageCode, pageSize})
        },
        
        //#################### 用户相关 ####################
        //查询用户信息分页
        selectUserPage(pageCode, pageSize){
            return $request.get('/user/s/page', {pageCode, pageSize})
        },
        updateUser(user){
            return $request.put('/admin/user/u/info', user)
        },
        //订阅网站
        subscribe(ipAddress, email){
            return $request.put(`/user/subscribe/${ipAddress}/email/${email}`)
        }
    })
}
