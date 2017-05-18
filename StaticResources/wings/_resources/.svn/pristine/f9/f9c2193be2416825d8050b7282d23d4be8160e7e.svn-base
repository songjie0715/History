/**
 * Created by janey on 16/6/7.
 */


define([
    'vue',
    'service/accountService',
    'components/feedbackDialog',
    'mixin/loadingMoreMixin',
    'core'
],function(Vue,feedBackService, feedbackDialog, loadingMoreMixin, core){

    return new Vue({
        el: '#app',
        mixins: [loadingMoreMixin],
        data : {
            page: 1,
            user: {},
            loadingMore: true,
            noMore: false
        },
        created(){
            this.$emit('scrollBottom');
        },
        events: {
            scrollBottom (){
                let self = this;
                self.loadingMore = true;
                if( this.noMore){
                    this.loadingMore = false;
                    return;
                }
                feedBackService.getMoreFeedback(self.page++).then((data)=>{
                    self.loadingMore = false;

                    let { status, result: { messageList: { totalCount, items,  }, user } } = data;
                    self.user = user;

                    data.status == 0 ? self.feedbackList ?  self.feedbackList.length >= totalCount ? self.noMore = true : self.feedbackList = self.feedbackList.concat(items) : self.$set('feedbackList', items) : alert('啊哦，服务器可能出现了点问题');

                })
            }
        },
        methods: {
            feedback(){
                feedbackDialog.show();
            }
        }
    });
});

