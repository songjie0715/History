   /**
     * 客户端接口：书籍详情页
     */
    function callNativeBook(censusType, bookId) {
        // console.log("window.android.callBook(censusType, bookId) params:: censusType=" + censusType + " bookId=" + bookId);
        window.android.callBook(censusType, bookId);
    }

    /**
     * 客户端接口：专题、作品列表。flag定义是否显示列表序号。
     */
    function callNativeBookList(censusType, title, url, flag) {
        // console.log("window.android.callBookList(censusType, title, url, flag) params:: censusType=" + censusType + " title=" + title + " url=" + url + " flag=" + flag);
        window.android.callBookList(censusType, title, url, flag);
    }

    /**
     * 客户端接口：关键字/标签搜索
     */
    function callNativeSearch(censusType, keyword) {
        // console.log("window.android.callSearch(censusType, keyword) params:: censusType=" + censusType + " keyword=" + keyword);
        window.android.callSearch(censusType, keyword);
    }

    /**
     * 客户端接口：排行榜首页
     */
    function callNativeRank(censusType) {
        // console.log("window.android.callRank(censusType) params:: censusType=" + censusType);
        window.android.callRank(censusType);
    }

    /**
     * 客户端接口：分类首页
     */
    function callNativeCategory(censusType) {
        // console.log("window.android.callCategory(censusType) params:: censusType=" + censusType);
        window.android.callCategory(censusType);
    }

    /**
     * 客户端接口：分类列表（精选书籍分类）
     * group 一级分类(频道)：1-男生、2-女生、3-出版
     * sort 二级分类
     * category 三级分类
     */
    function callNativeCategoryList(censusType, title, _group, _sort, _category) {
        // console.log("window.android.callCategoryList(censusType, title, group, sort, category) params:: censusType=" + censusType + " title=" + title + " _group=" + _group + " _sort=" + _sort + " _category=" + _category);
        window.android.callCategoryList(censusType, title, _group, _sort, _category);
    }

    /**
     * 客户端接口：HTML。flag定义是否显示标题搜索按钮。
     */
    function callNativeHtml(censusType, title, url, flag) {
        // console.log("window.android.callHtml(censusType, title, url, flag) params:: censusType=" + censusType + " title=" + title + " url=" + url + " flag=" + flag);
        window.android.callHtml(censusType, title, url, flag);
    }

    /**
     * 客户端接口：看点文章阅读页
     */
    function callNativeArticle(censusType, articleId) {
        // console.log("window.android.callArticle(censusType, articleId) params:: censusType=" + censusType + " articleId=" + articleId);
        window.android.callArticle(censusType, articleId);
    }

    /**
     * 客户端接口：活动页
     */
    function callNativeActivity(censusType, title, url) {
        // console.log("window.android.callActivity(censusType, title, url) params:: censusType=" + censusType + " title=" + title + " url=" + url);
        window.android.callActivity(censusType, title, url);
    }

    /**
     * 客户端接口：链接分类首页
     */
    function linkCategoryIndex(version, censusType) {
        if (version) {
            callNativeCategory(censusType);
        } else {
            var api_url = "http://api.motie.com/android/3/category/index";
            callNativeHtml(censusType, '分类', api_url, false);
        }
    }

    /**
     * 客户端接口：[分类]链接二级分类列表页
     */
    function linkCategory(version, censusType, title, _group, _sort, _category) {
        if (version) {
            callNativeCategoryList(censusType, title, _group, _sort, _category);
        } else {
            var api_url = "http://api.motie.com/android/3/category/detail?group=" + _group + "&sort=" + _sort + "&category=" + _category;
            callNativeHtml(censusType, title, api_url, false);
        }
    }

    /**
     * 客户端接口：专题、作品列表
     */
    function linkTopic(censusType, title, url, flag) {
        var api_url = "http://api.motie.com/" + url;
        callNativeBookList(censusType, title, api_url, flag);
    }

   /**
    * 客户端接口：打开包月首页
    */
   function linkBookPack(censusType, booId, packageId) {
       window.android.callPackage(censusType, booId, packageId);
   }

   /**
     * 客户端接口：章节阅读页
     */
    function callNativeReader(censusType, bookId, bookName, chapterId){
        window.android.callBookReader(censusType, bookId, bookName, chapterId);
    }
    
    /**
     * 客户端接口：直播频道首页
     */
    function callNativeLive(censusType){
        window.android.callInfoFlow(censusType);
    }