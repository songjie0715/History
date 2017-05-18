/**
 * Created by janey on 16/6/7.
 */


define([
'vue',
'service/commentService',
'components/dialog',
'mixin/loadingMoreMixin',
'components/legionConfig',
'components/resultTipDialog',
'components/loading'
], function(Vue, commentService,Dialog, loadingMoreMixin, legionConfigVue, resultTipDialog, loading){

    return function(reviewId, haveReplyItem, isLogIn, bookId, haveNextPage){

        var replyDialog = new Dialog({
            template: '#template-comment-dialog',
            data: {
                commentDet: '',
                commentLen: 0,
                errorTip: '评论内容最少5个字',
                hasContent: false,
                isErrorTip: false,
                isReply: true,
                contentPLH: '输入回复详情',
                commentSelf: '回复'
            },
            events:{
                show: function(){

                },
                hide: function(){
                }
            },
            computed: {
                commentLen: function(){
                    return this.commentDet.length;
                }
            },
            methods: {
                hideDialog: function(){
                    this.hide();
                    this.errorTip = '评论内容最少5个字';
                },
                setComment: function(){
                    if( this.commentDet.length != 0 ){
                        this.isErrorTip = false;
                    }
                    if(this.commentDet.length > 4){
                        this.isErrorTip = true;
                    }else if($.trim(this.commentDet) == ''){
                        this.isErrorTip = false;
                    }
                    this.hasContent = true;
                },
                review: function(bookId){
                    var self = this;

                    // if( this.commentDet.length == 0 ){
                    //     this.isErrorTip = true;
                    //     this.errorTip = '请输入回复详情';
                    //     return;
                    // }
                    if( this.commentDet.length == 0){
                        this.isErrorTip = false;
                        this.errorTip = '请输入回复详情';
                        return;
                    }else if(this.commentDet.length < 5){
                        this.isErrorTip = false;
                        this.errorTip = '回复内容最少5个字';
                        return;
                    }else if($.trim(this.commentDet) == ''){
                        this.isErrorTip = false;
                        this.errorTip = '回复内容不能是空格';
                        this.commentDet = '';
                        return;
                    }else{
                        this.isErrorTip = true;
                    }

                    // this.isErrorTip = false;
                    loading.show();
                    commentService.reply(reviewId, self.commentDet, bookId).then(function(data){
                        switch (data.status){
                            case 0:
                                self.commentDet = '';
                                self.hideDialog();
                                loading.hide();
                                resultTipDialog.show();
                                resultTipDialog.setContent('回复成功', true);
                                reviewDetailVue.hasReply = true;
                                setTimeout(function(){
                                    resultTipDialog.hide();
                                    reviewDetailVue.isPrivateReply = true;
                                },2000);
                                reviewDetailVue.privateReplyList.unshift(data.result.reply);
                                self.isErrorTip = false;
                                break;
                            case 1:
                                location.href = data.url;
                                break;
                            case -1:
                                break;
                            default:
                                alert('啊哦,出错咯');
                        }
                    });
                },
                blurComment: function(){
                    if( this.commentDet.length == 0 ){
                        this.hasContent = false;
                    }
                },
                reset: function(){
                    this.commentDet = '';
                }
            }
        });

        var reviewDetailVue = new legionConfigVue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                isTipShow: false,
                isLoading: false,
                hasNoMore: false,
                flag: false,
                noLoading: haveNextPage || false,
                isAjaxLoaded: false,
                ajaxReplyItems: [],
                isPrivateReply: false,
                hasReply: !haveReplyItem,
                privateReplyList: []
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
                    commentService.getReplyList(reviewId, ++self.pageNum).then(function(data){

                        if( data.status == 1 ){
                            location.href = data.url;
                        } else if( data.status == 0 ){
                            self.isAjaxLoaded = true;
                            self.isLoading = false;
                            self.flag = false;
                            self.ajaxReplyItems = self.ajaxReplyItems.concat(data.result.replys.items);
                        } else if( data.status == -1 ){
                            self.isLoading = false;
                            self.hasNoMore = true;
                            self.flag = false;
                        }

                        if( !data.result.replys.haveNextPage ){
                            self.noLoading = true;
                        }
                    });
                }
            },
            init: function(){
                this.pageNum = 1;
            },
            attached:function(){
                var self = this;
                $(window).on('scroll', function(){
                    // 如果 scrollY == 100, 评论浮窗显示
                    if( window.scrollY >= 300){
                        self.isTipShow = true;
                    } else {
                        self.isTipShow = false;
                    }
                })
            },
            methods: {
                showDialog: function(){
                    if( !isLogIn ){
                        location.href = '/wx/accounts/login?backUrl=/wx/review/'+ reviewId +'/detail?bookId='+bookId;
                        return;
                    }
                    replyDialog.show();
                }
            }
        });

    };

});