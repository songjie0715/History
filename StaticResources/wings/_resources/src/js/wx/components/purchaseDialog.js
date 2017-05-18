/**
 * Created by janey on 16/6/20.
 */

define([
'jquery',
'components/dialog',
'service/bookDetailService',
'components/loading',
'components/overlay',
'components/resultTipDialog',
'core'
], function($,Dialog, BookDetailService, loading, overlay, resultTipDialog,core){

    var purchaseDialog = new Dialog({
        template: '#template-buy-dialog',
        data: {
            selectedIndex: 0,
            selectedChapters: 20,
            btnList: [{
                text: '后20章',
                discount: '九折',
                active: false,
                costPrice: 0,
                discountPrice: 0
            },{
                text: '后50章',
                discount: '八折',
                active: false,
                costPrice: 0,
                discountPrice: 0
            },{
                text: '后100章',
                discount: '七折',
                active: false,
                costPrice: 0,
                discountPrice: 0
            },{
                text: '后200章',
                discount: '六折',
                active: false,
                costPrice: 0,
                discountPrice: 0
            }],
            isActive: false,
            balancePrice: '',
            costPrice: 0,
            discountPrice: 0,
            buyVoid: true,
            isGetPrice: false,
            unBuyCount: 0,
            buyText: '确认购买',
            buyFlag: false
        },
        computed: {
            buyVoid: function(){
                if( this.balancePrice &&  this.balancePrice != 0 && this.balancePrice >= this.discountPrice && this.unBuyCount >= this.selectedChapters ){
                    return false;
                } else {
                    return true;
                }
            }
        },
        events: {
            show: function(){
                var self = this;
                if ( this.buyFlag ) return;
                this.buyFlag = true;
                if( this.balancePrice != undefined && this.balancePrice !== '' ) return;
                BookDetailService.getDiscount(self.currentChapter).then(function(data){
                    switch ( data.status ){
                        case 0:
                            var obj = data.result.discount;
                            self.isGetPrice = true;
                            self.balancePrice = data.result.balances;
                            $.each(obj, function(i,v){
                                self.btnList[i].costPrice = v[0];
                                self.btnList[i].discountPrice = v[1];
                            });

                            var j = self.selectedIndex;

                            self.costPrice = self.btnList[j].costPrice;
                            self.discountPrice = self.btnList[j].discountPrice;
                            self.unBuyCount = data.result.unBuyCount;


                            self.$emit('changeBuyText');
                            self.buyFlag = false;
                            break;
                        case 1:
                            location.href = data.url;
                            break;
                        case -1:
                            alert('啊哦,出错了');
                            break;
                        default:
                            alert('啊哦,出错了');
                    }
                });
            },
            changeBuyText: function(){
                if( this.balancePrice < this.discountPrice ){
                    this.buyText = '余额不足';
                    return;
                }

                if( this.unBuyCount < this.selectedChapters ){
                    this.buyText = '剩余章节不足';
                } else {
                    this.buyText = '确认购买'
                }
            }
        },
        methods: {
            hideDialog: function(){
                this.hide();
            },
            purchase: function(num){
                var self = this;
                var chapterId = this.currentChapter;
                loading.show();
                overlay.isZindex = true;

                BookDetailService.purchaseChapter(num, chapterId, self.isAutoSub).then(function(data){
                    loading.hide();
                    self.hideDialog();
                    overlay.isZindex = false;
                    // resultTipDialog.show();

                    switch (data.status){
                        case 1:
                            location.href = core.wap_DOMAIN + data.url;
                        break;
                        case -1:
                            resultTipDialog.show();
                            resultTipDialog.setContent("抱歉,购买失败,请重新购买!", false);
                            setTimeout(function(){
                                location.reload();
                            }, 1000);
                        break;
                        default:
                            alert('啊哦,出错了');
                    }


                });
            },
            select: function(index){
                this.selectedIndex = index;

                switch (index){
                    case 0:
                        this.selectedChapters = 20;
                        break;
                    case 1:
                        this.selectedChapters = 50;
                        break;
                    case 2:
                        this.selectedChapters = 100;
                        break;
                    case 3:
                        this.selectedChapters = 200;
                        break;
                    default:
                        this.selectedChapters = 20;
                }

                this.costPrice = this.btnList[index].costPrice;
                this.discountPrice = this.btnList[index].discountPrice;


                this.$emit('changeBuyText');

            },
            isCheck: function(index){
                return index == this.selectedIndex;
            },
            isVoid: function(index){

            }
        }
    });
    return function(chapterId, autoSub){
        purchaseDialog.currentChapter = chapterId;
        purchaseDialog.autoSub = autoSub || false;
        return purchaseDialog;
    };
});