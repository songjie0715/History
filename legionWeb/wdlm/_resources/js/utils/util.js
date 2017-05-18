"use strict";define([],function(){return{getQrcode:function(n){var e=5,t=!1,r=new Promise(function(r,i){var c=setInterval(function(){e<=1?(clearInterval(c),e=60,t=!0,r(t)):(e--,$(n).find("b").html(e+"s"))},1e3)});return r}}});
//# sourceMappingURL=../maps/utils/util.js.map
