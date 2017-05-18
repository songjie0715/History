"use strict";define(["vue","service/bookShelfAddService","mixin/loadingMoreMixin"],function(e,o,a){return function(t,i,s){new e({el:"#app",mixins:[a],data:{isRecordAjaxLoaded:!1,ajaxRecordBookItems:[],isShelfAjaxLoaded:!1,ajaxShelfBookItems:[],actionType:"readRecord",hasReadRecordItem:t,hasBookShelfItem:i,isRecordLoading:!1,recordFlag:!1,isShelfLoading:!1,shelfFlag:!1,noRecordLoading:!1,noShelfLoading:!1,hasRecordNoMore:!1,hasShelfNoMore:!1},events:{scrollBottom:function(){var e=this;if("readRecord"==this.actionType){if(!s)return void(this.hasRecordNoMore=!0);if(this.noRecordLoading)return void(this.hasRecordNoMore=!0);if(this.isRecordLoading=!0,this.recordFlag)return;e.recordFlag=!0,o.getMoreRecordBook(++e.recordPageNum).then(function(o){o.result.recentlyBooks.haveNextPage||(e.noRecordLoading=!0),1==o.status?location.href=o.url:0==o.status&&(e.isRecordAjaxLoaded=!0,e.isRecordLoading=!1,e.recordFlag=!1,e.ajaxRecordBookItems=e.ajaxRecordBookItems.concat(o.result.recentlyBooks.items))})}else if("followItems"==this.actionType){if(this.noShelfLoading)return void(this.hasShelfNoMore=!0);if(this.isShelfLoading=!0,this.shelfFlag)return;this.shelfFlag=!0,o.getMoreShelfBook(++e.shelfPageNum).then(function(o){o.result.followBooks.haveNextPage||(e.noShelfLoading=!0),1==o.status?location.href=o.url:0==o.status&&(e.isShelfAjaxLoaded=!0,e.isShelfLoading=!1,e.shelfFlag=!1,e.ajaxShelfBookItems=e.ajaxShelfBookItems.concat(o.result.followBooks.items))})}}},init:function(){this.recordPageNum=1,this.shelfPageNum=1},attached:function(){},methods:{changeTab:function(e){this.actionType=e}}})}});
//# sourceMappingURL=../../maps/mobile/controller/bookShelfAdd.js.map
