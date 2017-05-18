"use strict";define(["vue"],function(i){return new i({template:'<div class="loading hidden" :class="{hidden: !isShow}"></div>',data:{isShow:!1},created:function(){this.$mount().$appendTo("body")},methods:{show:function(){this.isShow=!0},hide:function(){this.isShow=!1}}})});
//# sourceMappingURL=../../maps/wxV2/components/loading.js.map
