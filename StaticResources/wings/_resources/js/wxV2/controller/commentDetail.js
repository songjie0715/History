"use strict";define(["vue","service/commentService","components/dialog","mixin/loadingMoreMixin","components/legionConfig","components/resultTipDialog","components/loading"],function(t,e,i,o,n,s,r){return function(t,a,h,c,m){var l=new i({template:"#template-comment-dialog",data:{commentDet:"",commentLen:0,errorTip:"评论内容最少5个字",hasContent:!1,isErrorTip:!1,isReply:!0,contentPLH:"输入回复详情",commentSelf:"回复"},events:{show:function(){},hide:function(){}},computed:{commentLen:function(){return this.commentDet.length}},methods:{hideDialog:function(){this.hide(),this.errorTip="评论内容最少5个字"},setComment:function(){0!=this.commentDet.length&&(this.isErrorTip=!1),this.commentDet.length>4?this.isErrorTip=!0:""==$.trim(this.commentDet)&&(this.isErrorTip=!1),this.hasContent=!0},review:function(i){var o=this;return 0==this.commentDet.length?(this.isErrorTip=!1,void(this.errorTip="请输入回复详情")):this.commentDet.length<5?(this.isErrorTip=!1,void(this.errorTip="回复内容最少5个字")):""==$.trim(this.commentDet)?(this.isErrorTip=!1,this.errorTip="回复内容不能是空格",void(this.commentDet="")):(this.isErrorTip=!0,r.show(),void e.reply(t,o.commentDet,i).then(function(t){switch(t.status){case 0:o.commentDet="",o.hideDialog(),r.hide(),s.show(),s.setContent("回复成功",!0),p.hasReply=!0,setTimeout(function(){s.hide(),p.isPrivateReply=!0},2e3),p.privateReplyList.unshift(t.result.reply),o.isErrorTip=!1;break;case 1:location.href=t.url;break;case-1:break;default:alert("啊哦,出错咯")}}))},blurComment:function(){0==this.commentDet.length&&(this.hasContent=!1)},reset:function(){this.commentDet=""}}}),p=new n({el:"#app",mixins:[o],data:{isTipShow:!1,isLoading:!1,hasNoMore:!1,flag:!1,noLoading:m||!1,isAjaxLoaded:!1,ajaxReplyItems:[],isPrivateReply:!1,hasReply:!a,privateReplyList:[]},events:{scrollBottom:function(){var i=this;return this.noLoading?void(this.hasNoMore=!0):(this.isLoading=!0,void(this.flag||(this.flag=!0,e.getReplyList(t,++i.pageNum).then(function(t){1==t.status?location.href=t.url:0==t.status?(i.isAjaxLoaded=!0,i.isLoading=!1,i.flag=!1,i.ajaxReplyItems=i.ajaxReplyItems.concat(t.result.replys.items)):t.status==-1&&(i.isLoading=!1,i.hasNoMore=!0,i.flag=!1),t.result.replys.haveNextPage||(i.noLoading=!0)}))))}},init:function(){this.pageNum=1},attached:function(){var t=this;$(window).on("scroll",function(){window.scrollY>=300?t.isTipShow=!0:t.isTipShow=!1})},methods:{showDialog:function(){return h?void l.show():void(location.href="/wx/accounts/login?backUrl=/wx/review/"+t+"/detail?bookId="+c)}}})}});
//# sourceMappingURL=../../maps/wxV2/controller/commentDetail.js.map
