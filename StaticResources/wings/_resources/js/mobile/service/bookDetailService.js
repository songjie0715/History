"use strict";define(["jquery","core"],function(a,t){return{isAddToShelf:function(e){return a.ajax({type:"POST",data:{favor:0},url:t.apiPath+"/ajax/book/"+e+"/favorite"})},changeBookItems:function(e,r){return a.ajax({type:"GET",url:t.apiPath+"/ajax/book/"+e+"/recommend?sorts="+r})},purchaseChapter:function(e,r,n){return a.ajax({type:"POST",url:t.apiPath+"/buy/chapter/"+r,data:{buyCount:e,autoSub:n},dataType:"JSON"})},likeService:function(t,e){return a.ajax({url:"/ajax/review/"+e+"/like",type:"POST",data:{bookId:t},dataType:"JSON"})},reward:function(e,r,n){var u;return u=n?"/ajax/reward/"+e+"/"+n:"/ajax/reward/"+e,a.ajax({type:"POST",url:t.apiPath+u,data:{type:1,quota:r,content:""},dataType:"JSON"})},getBalance:function(e,r){var n;return n=r?"/ajax/i/balances?backUrl=/book/"+e+"/"+r:"/ajax/i/balances?backUrl=/book/"+e,a.ajax({url:t.apiPath+n,dataType:"JSON"})},getRewardItem:function(e){return a.ajax({url:t.apiPath+"/ajax/book/"+e+"/reward",dataType:"JSON"})},getDiscount:function(e){return a.ajax({url:t.apiPath+"/buy/chapter/trial/"+e,dataType:"JSON"})}}});
//# sourceMappingURL=../../maps/mobile/service/bookDetailService.js.map
