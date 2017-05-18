/**
 * Created by janey on 16/6/7.
 */


define([
'vue',
'service/bookShelfAddService',
'mixin/loadingMoreMixin'
],function(Vue,bookShelfAddService, loadingMoreMixin){

    return function(readRecordItem, bookShelfItem, haveRecordNextPage){
        new Vue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                isRecordAjaxLoaded: false,
                ajaxRecordBookItems: [],
                isShelfAjaxLoaded: false,
                ajaxShelfBookItems: [],
                actionType: 'readRecord',
                hasReadRecordItem: readRecordItem,
                hasBookShelfItem: bookShelfItem,
                isRecordLoading: false,
                recordFlag: false,
                isShelfLoading: false,
                shelfFlag: false,
                noRecordLoading:  false,
                noShelfLoading: false,
                hasRecordNoMore: false,
                hasShelfNoMore: false
            },
            events: {
                scrollBottom : function(){
                    var self = this;

                    if( this.actionType == 'readRecord' ){

                        if( !haveRecordNextPage ){
                            this.hasRecordNoMore = true;
                            return;
                        }

                        if(this.noRecordLoading){
                            this.hasRecordNoMore = true;
                            return;
                        }
                        this.isRecordLoading = true;
                        if( this.recordFlag ) return;
                        self.recordFlag = true;
                        bookShelfAddService.getMoreRecordBook(++self.recordPageNum).then(function(data){
                            if( !data.result.recentlyBooks.haveNextPage ){
                                self.noRecordLoading = true;
                            }
                            if( data.status == 1 ){
                                location.href = data.url;
                            } else if( data.status == 0 ){
                                self.isRecordAjaxLoaded = true;
                                self.isRecordLoading = false;
                                self.recordFlag = false;
                                self.ajaxRecordBookItems = self.ajaxRecordBookItems.concat(data.result.recentlyBooks.items);
                            }
                        });
                    } else if(this.actionType == 'followItems'){
                        if( this.noShelfLoading ){
                            this.hasShelfNoMore = true;
                            return;
                        }
                        this.isShelfLoading = true;
                        if( this.shelfFlag ) return;
                        this.shelfFlag = true;
                        bookShelfAddService.getMoreShelfBook(++self.shelfPageNum).then(function(data){
                            if( !data.result.followBooks.haveNextPage ){
                                self.noShelfLoading = true;
                            }
                            if( data.status == 1 ){
                                location.href = data.url;
                            } else if( data.status == 0 ){
                                self.isShelfAjaxLoaded = true;
                                self.isShelfLoading = false;
                                self.shelfFlag = false;
                                self.ajaxShelfBookItems = self.ajaxShelfBookItems.concat(data.result.followBooks.items);
                            }
                        });
                    }

                }
            },
            init: function(){
                this.recordPageNum = 1;
                this.shelfPageNum = 1;
            },
            attached:function(){

            },
            methods: {
                changeTab: function(type){
                    this.actionType = type;
                }
            }
        });
    }
});

