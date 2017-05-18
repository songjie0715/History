/**
 * Created by janey on 16/6/7.
 */


define([
'vue',
'service/bookShelfService',
'mixin/loadingMoreMixin'
],function(Vue,bookShelfService, loadingMoreMixin){

    return new Vue({
        el: '#app',
        mixins: [loadingMoreMixin],
        data : {
            isLoading: false,
            hasNoMore: false,
            isAjaxLogs: false,
            ajaxLogItems: [],
            noLoading: false,
            flag: false
        },
        events: {
            scrollBottom : function(){
                var self = this;
                if(this.noLoading){
                    this.hasNoMore = true;
                    return;
                }
                this.isLoading = true;
                if(this.flag) return;
                this.flag = true;

                bookShelfService.getBuyLogs(++self.pageNum).then(function(data){

                    switch (data.status){
                        case 0:
                            self.isAjaxLogs = true;
                            self.isLoading = false;
                            self.flag = false;
                            self.ajaxLogItems = self.ajaxLogItems.concat(data.result.moneys.items);
                        break;
                        case 1:
                            location.href = data.url;
                            return;
                        break;
                        case -1:
                            self.isLoading = false;
                            self.hasNoMore = true;
                            self.flag = false;
                        break;
                        default:
                            alert('啊哦,出错了哦');
                    }

                    if( !data.result.moneys.haveNextPage ){
                        self.noLoading = true;
                    }
                });
            }
        },
        init: function(){
            this.pageNum = 1;
        },
        attached:function(){

        },
        methods: {

        }
    });
});

