"use strict";define(["components/dialog","service/bookDetailService","components/loading","components/overlay","components/resultTipDialog"],function(e,t,a,i,r){var s=new e({template:"#template-reward-dialog",data:{quota:0,balancePrice:"",addReward:!1,rewardItem:[],rewardVoid:!1,rewardText:"确认打赏",changeTextBg:"#ffdc2e"},events:{show:function(){var e=this;switch(this.quota){case 100:this.changeTextBg="#ffdc2e";break;case 588:this.changeTextBg="#ffb92e";break;case 1888:this.changeTextBg="#ff962e";break;case 5888:this.changeTextBg="#ff742e";break;case 1e4:this.changeTextBg="#ff4c2f"}this.$emit("changeRewardStatus"),void 0!==this.balancePrice&&""!==this.balancePrice||t.getBalance(bookId).then(function(t){0==t.status&&(e.balancePrice=t.result.balances,e.$emit("changeRewardStatus"))})},changeRewardStatus:function(){this.quota>this.balancePrice?(this.rewardVoid=!0,this.rewardText="余额不足"):(this.rewardVoid=!1,this.rewardText="确认打赏")}},methods:{hideDialog:function(){this.hide()},reward:function(){var e=this;a.show(),i.isZindex=!0,t.reward(e.bookId,e.quota,e.chapterId).then(function(t){switch(a.hide(),e.hideDialog(),i.isZindex=!1,t.status){case 0:r.show(),r.setContent("恭喜,打赏成功!",!0),setTimeout(function(){r.hide(),e.$emit("test",t.result.reward)},500);break;case 1:location.href=t.url;break;case-1:alert(t.valid.msg);break;default:alert("啊哦,出错了")}})}}});return function(e,t,a){return s.bookId=e,s.quota=t,s.chapterId=a,s}});
//# sourceMappingURL=../../maps/wxV2/components/rewardDialog.js.map
