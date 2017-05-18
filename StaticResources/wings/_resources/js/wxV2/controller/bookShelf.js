"use strict";define(["vue","service/bookShelfService","mixin/loadingMoreMixin","components/loading","components/dialog","core"],function(o,e,i,a,t,n){return function(n){var s=new t({template:"#template-del-book-dialog",data:{},events:{show:function(){},hide:function(){}},methods:{hideDialog:function(){this.hide()},comfirmDel:function(){var o=this;a.show();var i=d.delBookId;e.delBook(i).then(function(e){0==e.status&&(a.hide(),d.isDel=!0,d.delCurBookIdList.push(i),o.hide())})}}}),d=new o({el:"#app",mixins:[i],data:{isDel:!1,isLoading:!1,hasNoMore:!1,delBookId:0,delCurBookIdList:[],hasBookItems:n,isManage:!1,isAjaxLoaded:!1,ajaxBookItems:[],flag:!1,noLoading:!1},events:{scrollBottom:function(){var o=this;return this.noLoading?void(this.hasNoMore=!0):(this.isLoading=!0,void(this.flag||(this.flag=!0,e.getMoreBook(++o.pageNum).then(function(e){1==e.status?location.href=e.url:0==e.status?(o.isAjaxLoaded=!0,o.isLoading=!1,o.flag=!1,o.isManage?o.isManage=!0:o.isManage=!1,o.ajaxBookItems=o.ajaxBookItems.concat(e.result.followBooks.items)):e.status==-1&&(o.isLoading=!1,o.hasNoMore=!0,o.flag=!1),e.result.followBooks.haveNextPage||(o.noLoading=!0)}))))}},init:function(){this.manageType=!1,this.pageNum=1},attached:function(){},methods:{showDialog:function(o){s.show(),this.delBookId=o},manage:function(){this.manageType?(console.log(location.href),location.reload()):(this.isManage=!0,this.manageType=!0)}}})}});
//# sourceMappingURL=../../maps/wxV2/controller/bookShelf.js.map
