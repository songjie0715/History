"use strict";define(function(){return{created:function(){},attached:function(){var n=this;$(window).on("scroll",function(){window.innerHeight+window.scrollY==$(document).height()&&n.$emit("scrollBottom")})}}});
//# sourceMappingURL=../../maps/mobile/mixin/loadingMoreMixin.js.map
