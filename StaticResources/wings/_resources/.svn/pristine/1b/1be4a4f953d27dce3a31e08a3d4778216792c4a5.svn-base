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

    return function(){

        var reviewDetailVue = new legionConfigVue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                isTipShow: false
            },
            events: {
                scrollBottom : function(){
                    var self = this;

                }
            },
            init: function(){
                this.pageNum = 1;
            },
            attached:function(){
                var self = this;
                $(window).on('scroll', function(){
                    // 如果 scrollY == 100, 评论浮窗显示
                    if( window.scrollY >= 100){
                        self.isTipShow = true;
                    } else {
                        self.isTipShow = false;
                    }
                })
            },
            methods: {
                showDialog: function(){
                    commentDialog.show();
                }
            }
        });

    };

});