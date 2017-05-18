/**
 * Created by janey on 16/6/20.
 */

define([
'components/dialog',
'service/bookDetailService',
'components/loading',
'components/overlay',
'components/resultTipDialog'
], function(Dialog, BookDetailService, loading, overlay, resultTipDialog){

    var rewardDialog = new Dialog({
        template: '#template-reward-dialog',
        data: {
            quota: 0,
            balancePrice: '',
            addReward: false,
            rewardItem: [],
            rewardVoid: false,
            rewardText: '确认打赏'
        },
        events: {
            show: function(){
                var self = this;
                this.$emit('changeRewardStatus');
                if( this.balancePrice !== undefined && this.balancePrice !== '' ) return;
                BookDetailService.getBalance(bookId).then(function(data){
                    if(data.status == 0){
                        self.balancePrice = data.result.balances;
                        self.$emit('changeRewardStatus');
                    }
                });
            },
            changeRewardStatus: function(){
                if( this.quota > this.balancePrice ){
                    this.rewardVoid = true;
                    this.rewardText = '余额不足';
                } else{
                    this.rewardVoid = false;
                    this.rewardText = '确认打赏';
                }
            }
        },
        methods: {
            hideDialog: function(){
                this.hide();
            },
            reward: function(){
                var self = this;

                loading.show();
                overlay.isZindex = true;
                BookDetailService.reward(self.bookId, self.quota, self.chapterId).then(function(data){
                    loading.hide();
                    self.hideDialog();
                    overlay.isZindex = false;
                    switch (data.status){
                        case 0:
                            resultTipDialog.show();
                            resultTipDialog.setContent("恭喜,打赏成功!", true);
                            setTimeout(function(){
                                resultTipDialog.hide();
                                self.$emit('test',data.result.reward);
                            },500);
                            break;
                        case 1:
                            location.href = data.url;
                            break;
                        case -1:
                            alert(data.valid.msg);
                            break;
                        default:
                            alert('啊哦,出错了');
                    }
                });
            }
        }
    });
    return function(bookId, rewardNum, chapterId){
        rewardDialog.bookId = bookId;
        rewardDialog.quota = rewardNum;
        rewardDialog.chapterId = chapterId;

        return rewardDialog;
    };
});