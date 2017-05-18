/**
 * Created by janey on 16/6/7.
 */


define([
    'vue',
    'service/bookShelfService',
    'mixin/loadingMoreMixin',
    'components/loading',
    'components/dialog',
    'core'
],function(Vue,bookShelfService, loadingMoreMixin, loading, Dialog, core){

    return function(hasBookItems){

        var delDialog = new Dialog({
            template: '#template-del-book-dialog',
            data: {
            },
            events:{
                show: function(){

                },
                hide: function(){
                }
            },
            methods: {
                hideDialog: function(){
                    this.hide();
                },
                comfirmDel: function(){
                    var self = this;
                    loading.show();
                    var bookId = bookShelfVue.delBookId;
                    bookShelfService.delBook(bookId).then(function(data){

                        if( data.status == 0 ){
                            loading.hide();
                            bookShelfVue.isDel = true;
                            bookShelfVue.delCurBookIdList.push(bookId);
                            self.hide();
                        }
                    });
                }
            }
        });



        var bookShelfVue = new Vue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                isDel: false,
                isLoading: false,
                hasNoMore: false,
                delBookId: 0,
                delCurBookIdList: [],
                hasBookItems: hasBookItems,
                isManage: false,
                isAjaxLoaded: false,
                ajaxBookItems: [],
                flag: false,
                noLoading: false
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

                    bookShelfService.getMoreBook(++self.pageNum).then(function(data){

                        if( data.status == 1 ){
                            location.href = data.url;
                        } else if( data.status == 0 ){
                            self.isAjaxLoaded = true;
                            self.isLoading = false;
                            self.flag = false;
                            self.ajaxBookItems = self.ajaxBookItems.concat(data.result.followBooks.items);
                        } else if( data.status == -1 ){
                            self.isLoading = false;
                            self.hasNoMore = true;
                            self.flag = false;
                        }

                        if( !data.result.followBooks.haveNextPage ){
                            self.noLoading = true;
                        }
                    });
                }
            },
            init: function(){
                this.manageType = false;
                this.pageNum = 1;
            },
            attached:function(){

            },
            methods: {
                showDialog: function (bookId) {
                    delDialog.show();
                    this.delBookId = bookId;
                },
                manage: function(){
                    if( !this.manageType ){
                        this.isManage = true;
                        this.manageType = true;
                    } else{
                        console.log(location.href);
                        location.reload();
                    }
                }
            }
        });
    }
});

